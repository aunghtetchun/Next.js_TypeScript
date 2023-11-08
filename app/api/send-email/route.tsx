import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeTemplate from '@/emails/WelcomeTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	const body = await request.json();

	await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: body.email as string,
		subject: 'Test Email Subject',
		react: <WelcomeTemplate name={body.name} />,
	});

	return NextResponse.json({});
}
