'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Loading from './loading';

const Navbar = () => {
	const { status, data: session } = useSession();

	return (
		<nav className='flex bg-slate-200 py-3 px-5 justify-between'>
			<Link href='/' className='mr-5 '>
				Next.Js
			</Link>
			<div className='flex space-x-5'>
				<Link href='/users'>Users</Link>
				{status === 'loading' && <Loading />}
				{status === 'unauthenticated' && (
					<Link href='/api/auth/signin'>Sign In</Link>
				)}
				{status === 'authenticated' && (
					<>
						<span>{session.user?.name}</span>
						<Link href='/api/auth/signout'>Signout</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
