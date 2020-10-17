import React from 'react';
import { ToastContainer as ToastifyContainer, toast } from 'react-toastify';
import styled from 'styled-components';

const ToastContainer = () => (
	<StyledToastify
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

const StyledToastify = styled(ToastifyContainer)`
	@media only screen and (max-width: 480px) {
		left: 50%;
		transform: translateX(-50%);
	}
`;

export { toast, ToastContainer };
