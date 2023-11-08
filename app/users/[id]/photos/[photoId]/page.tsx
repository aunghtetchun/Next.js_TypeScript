import React from 'react';

interface Props {
	params: {
		id: number;
		photoId: number;
	};
}

const PhotoDetailsPage = ({ params: { id, photoId } }: Props) => {
	return (
		<div>
			PhotoDetailsPage
			<h1>User Id: {id}</h1>
			<p>Photo Id: {photoId}</p>
		</div>
	);
};

export default PhotoDetailsPage;
