const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { name, phone, business, message } = JSON.parse(event.body);

        // Resend API Configuration
        const resendApiKey = 're_Lw3yeg6E_EiUDeRodA7EdorEY7mREo8hp';
        const toEmail = 'orenshamir5@gmail.com';

        // Prepare email data
        const emailData = {
            from: 'Oren Shamir Lead <onboarding@resend.dev>',
            to: [toEmail],
            subject: `ליד חדש מהאתר: ${name || 'Unknown'}`,
            html: `
        <div dir='rtl' style='font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;'>
          <h2 style='color: #22C55E;'>ליד חדש התקבל! 🚀</h2>
          <div style='background-color: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb;'>
            <p><strong>שם:</strong> ${name || 'Unknown'}</p>
            <p><strong>טלפון:</strong> <a href='tel:${phone}'>${phone || 'No phone'}</a></p>
            <p><strong>סוג העסק:</strong> ${business || 'Not specified'}</p>
            <p><strong>הודעה:</strong></p>
            <p style='white-space: pre-wrap;'>${message || 'לא צורפה הודעה.'}</p>
          </div>
          <p style='font-size: 12px; color: #888; margin-top: 20px;'>נשלח מאתר orenshamirweb (via Netlify Functions)</p>
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
                body: JSON.stringify({ success: true, data })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to send email', details: data })
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server error', message: error.message })
        };
    }
};
