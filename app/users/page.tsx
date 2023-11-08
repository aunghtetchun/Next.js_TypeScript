import React, { Suspense } from 'react';
import Link from 'next/link';
import UserTable from './UserTable';

interface Props {
	searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
	return (
		<>
			<h1>Users</h1>
			<Link href='/users/new' className='btn'>
				New User
			</Link>
			<Suspense fallback={<p>Loading..</p>}>
				<UserTable sortBy={sortOrder} />
			</Suspense>
		</>
	);
};

export default UsersPage;
