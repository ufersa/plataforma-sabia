import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function UserProvider() {
	const router = useRouter();

	useEffect(() => {
		const logedIn = !!localStorage.getItem('token');
		if (!logedIn) {
			router.push('/login');
		}
	}, [router]);

	return <div />;
}

export default UserProvider;
