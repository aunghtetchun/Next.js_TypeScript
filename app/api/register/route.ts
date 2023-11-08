import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import schema from './schema';
import prisma from '@/prisma/client';

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.errors, {
			status: 400,
		});
	}

	const user = await prisma.user.findUnique({
		where: { email: body.email },
	});
	if (user) {
		return NextResponse.json({ error: 'User already exists' }, { status: 400 });
	}
	const hashedPassword = await bcrypt.hash(body.password, 10);
	const newUser = await prisma.user.create({
		data: {
			email: body.email,
			hashedPassword,
		},
	});

	return NextResponse.json({ email: newUser.email });
}
