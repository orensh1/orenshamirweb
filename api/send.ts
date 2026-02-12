import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend('re_Lw3yeg6E_EiUDeRodA7EdorEY7mREo8hp');

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, phone, business, message } = request.body;

    const { data, error } = await resend.emails.send({
      from: 'Oren Shamir Lead <onboarding@resend.dev>',
      to: ['orenshamir5@gmail.com'],
      subject: `ליד חדש מהאתר: ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
          <h2 style="color: #22C55E;">ליד חדש התקבל! 🚀</h2>
          <div style="background-color: white; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb;">
            <p><strong>שם:</strong> ${name}</p>
            <p><strong>טלפון:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>סוג העסק:</strong> ${business}</p>
            <p><strong>הודעה:</strong></p>
            <p style="white-space: pre-wrap;">${message || 'לא צורפה הודעה.'}</p>
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">נשלח מאתר orenshamirweb</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return response.status(500).json({ error: error.message });
    }

    return response.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
