import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/client';

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Email' },
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials.password) return null;
				// Check user
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!user || !user.hashedPassword) return null;

				// Password Check
				const passwordsMatch = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);
				if (passwordsMatch) return user;

				return null;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
