import React from 'react';
import { notFound } from 'next/navigation';

interface Props {
	params: { id: number };
}

const UserDetailsPage = ({ params: { id } }: Props) => {
	if (id > 10) {
		notFound();
	}
	return <div>UserDetailsPage {id}</div>;
};

export default UserDetailsPage;
