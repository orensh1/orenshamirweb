const fetch = require('node-fetch');

// Simple in-memory rate limiter (per Netlify function instance)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimit.get(ip);
    if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, { firstRequest: now, count: 1 });
        return false;
    }
    entry.count++;
    if (entry.count > MAX_REQUESTS_PER_WINDOW) {
        return true;
    }
    return false;
}

// Sanitize user input to prevent XSS in email HTML
function sanitize(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

// Validate phone number format (Israeli format)
function isValidPhone(phone) {
    if (!phone) return false;
    const cleaned = phone.replace(/[\s\-()]/g, '');
    return /^(\+972|972|0)\d{8,9}$/.test(cleaned);
}

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    // Rate limiting
    const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (isRateLimited(clientIp)) {
        return {
            statusCode: 429,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Too many requests. Please try again later.' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, phone, message } = body;

        // Server-side validation
        if (!name || !name.trim()) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Name is required' })
            };
        }

        if (!phone || !phone.trim()) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Phone is required' })
            };
        }

        // Sanitize all inputs
        const safeName = sanitize(name.trim());
        const safePhone = sanitize(phone.trim());
        const safeMessage = sanitize((message || '').trim());

        // Use environment variable for API key (set in Netlify dashboard)
        const resendApiKey = process.env.RESEND_API_KEY;
        const toEmail = process.env.CONTACT_EMAIL || 'orenshamir5@gmail.com';

        if (!resendApiKey) {
            console.error('RESEND_API_KEY environment variable is not set');
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Server configuration error' })
            };
        }

        // Prepare email data with sanitized inputs
        const emailData = {
            from: 'onboarding@resend.dev',
            to: [toEmail],
            subject: `ליד חדש מהאתר: ${safeName}`,
            html: `
        <div dir='rtl' style='font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;'>
          <h2 style='color: #22C55E;'>ליד חדש התקבל! 🚀</h2>
          <div style='background-color: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb;'>
            <p><strong>שם:</strong> ${safeName}</p>
            <p><strong>טלפון:</strong> <a href='tel:${safePhone}'>${safePhone}</a></p>
            <p><strong>הודעה:</strong></p>
            <p style='white-space: pre-wrap;'>${safeMessage || 'לא צורפה הודעה.'}</p>
          </div>
          <p style='font-size: 12px; color: #888; margin-top: 20px;'>נשלח מאתר orenshamir.com (via Netlify Functions)</p>
        </div>
      `
        };

        // Send email via Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        const data = await response.json();

        if (response.ok) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true })
            };
        } else {
            console.error('Resend API error:', data);
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Failed to send email' })
            };
        }

    } catch (error) {
        console.error('Server error:', error.message);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Server error' })
        };
    }
};
