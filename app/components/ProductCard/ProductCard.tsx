'use client';
import React, { useState } from 'react';
import AddToCart from '../AddToCart';
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../HeavyComponent'), {
	loading: () => <Loading />,
	ssr: false,
});

const ProductCard = () => {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div>
			<AddToCart />
			<button onClick={() => setIsVisible((val) => !val)} className='btn'>
				Toggle Heavy Component
			</button>
			{isVisible && <HeavyComponent />}
		</div>
	);
};

export default ProductCard;
