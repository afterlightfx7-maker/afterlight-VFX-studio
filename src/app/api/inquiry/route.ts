import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "contact@afterlightfx.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // If API key is missing, log the details and return success for local development simulation
    if (!resendApiKey) {
      console.warn("WARNING: RESEND_API_KEY is not defined in environment variables.");
      console.log("Simulating email send for inquiry:", {
        to: recipientEmail,
        from: fromEmail,
        inquiry: { name, email, message },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Simulated inquiry submission successful (No RESEND_API_KEY set).",
          simulated: true
        },
        { status: 200 }
      );
    }

    // Call Resend REST API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: recipientEmail,
        subject: `New Studio Inquiry from ${name}`,
        html: `
          <div style="font-family: sans-serif; background-color: #0c0c0e; color: #f3f4f6; padding: 40px; border-radius: 12px; border: 1px solid #1f2937; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d2ff; font-size: 24px; border-bottom: 1px solid #1f2937; padding-bottom: 15px; margin-top: 0; font-weight: bold;">New Studio Inquiry</h2>
            
            <div style="margin-top: 20px;">
              <p style="margin: 10px 0;"><strong style="color: #9ca3af;">Name:</strong> <span style="font-size: 16px; color: #ffffff;">${name}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #9ca3af;">Email:</strong> <a href="mailto:${email}" style="color: #00d2ff; text-decoration: none; font-size: 16px;">${email}</a></p>
            </div>
            
            <div style="margin-top: 30px; background-color: #111827; padding: 20px; border-radius: 8px; border: 1px solid #1f2937;">
              <h3 style="margin-top: 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold;">Project Details / Message</h3>
              <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #e5e7eb;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; font-size: 12px; color: #4b5563; text-align: center; border-top: 1px solid #1f2937; padding-top: 15px;">
              Received from Afterlight VFX Studio contact page.
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error response:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email via Resend API." },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Inquiry API Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
