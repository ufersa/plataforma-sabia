import styled from 'styled-components';

export const Image = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero.jpg');
	height: 65%;

	/* Position and center the image to scale nicely on all screens */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
`;

export const Content = styled.div`
	width: 1280px;
	max-width: 100%;
	padding: 0 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: left;

	h1 {
		font-size: 4rem;
		color: white;
		margin-bottom: 15px;
	}

	p {
		color: white;
		line-height: 1.6;
		font-size: 1.8rem;
		margin-bottom: 40px;
	}
`;

export const SearchBox = styled.div`
	box-shadow: 0px 0px 90px -15px rgba(41, 44, 28, 0.085);
	border: none;
	border-radius: 4px;
	background-color: #fff;
	width: 100%;

	form {
		padding: 30px 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		input {
			flex-grow: 1;
			padding: 18px 20px;
			margin-right: 30px;
			border: 1px solid #ececec;
			border-radius: 4px;
			background-color: #ececec;
			font-size: 2rem;
			line-height: 19px;
			color: #232628;
			font-weight: 500;
		}
	}
`;
