import styled from 'styled-components';

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	transition: all 0.3s ease 0s;
	border-radius: 5px;

	:hover {
		transform: translateY(-7px);
	}
`;

export const ImageContainer = styled.div`
	width: 100%;
	padding-top: 60%;
	border-radius: 5px 5px 0 0;

	overflow: hidden;
	position: relative;

	img {
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 20px;
`;

export const UpContent = styled.div`
	margin-bottom: 30px;

	> div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}
`;

export const LocationContainer = styled.div`
	display: flex;
	align-items: center;

	span {
		text-transform: uppercase;
		color: #666666;
		font-size: 1.3rem;
		margin-left: 5px;
	}
`;

export const LikesContainer = styled.div`
	display: flex;
	align-items: center;

	span {
		font-size: 1.3rem;
		color: #666666;
		display: inline-block;
		margin-left: 5px;
	}
`;

export const MainTitle = styled.h4`
	margin-bottom: 20px;
	color: #1d1d1d;
	font-size: 2.4rem;
	line-height: 32px;
	font-weight: normal;

	a {
		color: #1d1d1d;
	}
`;

export const DownContent = styled.div``;

export const TextContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1.4rem;
	padding-bottom: 20px;
	border-bottom: 1px solid #eee;

	div {
		display: flex;
		align-items: center;

		span {
			color: #999;
			font-weight: 500;
			margin-left: 5px;
			display: block;
		}
	}
`;

export const IconsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 20px;

	div:first-of-type {
		display: flex;
		align-items: center;

		span {
			color: #999;
			font-size: 1.4rem;
			margin-left: 2px;
		}
	}

	div:last-of-type {
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;
