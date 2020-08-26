import React from 'react';
import { ToastContainer as ToastifyContainer, toast } from 'react-toastify';

const ToastContainer = () => (
	<ToastifyContainer
		style={{ width: '100%', maxWidth: '400px' }}
		position="bottom-center"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		rtl={false}
		closeOnClick
		pauseOnFocusLoss
		draggable
		pauseOnHover
	/>
);

export { toast, ToastContainer };
