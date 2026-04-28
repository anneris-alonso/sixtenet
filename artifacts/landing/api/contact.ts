import { Resend } from 'resend';
import * as z from 'zod';

// Reuse the same schema for server-side validation
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(20).max(2000),
  website: z.string().optional(), // Honeypot
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;
    
    // 1. Honeypot check
    if (body.website) {
      return res.status(200).json({ success: true, message: 'Bot detected (silent)' });
    }

    // 2. Validation
    const validatedData = contactSchema.parse(body);

    // 3. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'SixTenet Website <onboarding@resend.dev>', // Update with verified domain in production
      to: ['anneris.alonso@gmail.com'],
      subject: `New Contact Request from ${validatedData.name}`,
      replyTo: validatedData.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${validatedData.message}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation Failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
