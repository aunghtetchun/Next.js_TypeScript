import React from 'react';
import { sort } from 'fast-sort';
import Link from 'next/link';

interface IUser {
	id: number;
	name: string;
	email: string;
}

const UserTable = async ({ sortBy }: { sortBy: string }) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users', {
		cache: 'no-store',
	});
	let data: IUser[] = await res.json();

	if (sortBy == 'name') {
		data = sort(data).asc((u) => u.name);
	} else if (sortBy == 'email') {
		data = sort(data).asc((u) => u.email);
	}

	return (
		<table className='table table-bordered'>
			<thead>
				<tr>
					<th>
						<Link href='/users?sortOrder=name'>Name</Link>
					</th>
					<th>
						<Link href='/users?sortOrder=email'>Email</Link>
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((user) => (
					<tr key={user.id}>
						<td>{user.name}</td>
						<td>{user.email}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserTable;
