import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import AuthProvider from './auth/Provider';
import Navbar from './Navbar';
import './globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500'] });
// Custom Font
const poppins = localFont({
	src: '../public/fonts/poppins-regular-webfont.woff2',
	variable: '--font-poppins',
});

export const metadata: Metadata = {
	title: 'Mastering Next.js Course',
	description: 'Next js Fundamentals Course - Code With Mosh',
	openGraph: {
		title: 'Mastering Next.js Course',
		description: 'Home Page for Mastering Next.js Course',
		authors: 'Krupesh Anadkat',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' data-theme='winter'>
			<body className={poppins.variable}>
				<AuthProvider>
					<Navbar />
					<main className='p-5'>{children}</main>
				</AuthProvider>
			</body>
		</html>
	);
}
