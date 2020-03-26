import styled from 'styled-components';

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	transition: all 0.3s ease 0s;
	border-radius: 5px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 5px 20px 0 rgba(0, 0, 0, 0.19);

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
		box-shadow: 0 5px 3px #ccc;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 10px 20px 20px;
`;

export const UpContent = styled.div`
	margin-bottom: 30px;

	> div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}
`;

export const LocationContainer = styled.div`
	display: flex;
	align-items: center;

	p {
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

export const MainTitle = styled.p`
	margin-bottom: 20px;
	color: #000;
	font-size: 2.2rem;
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

		p {
			color: #999;
			font-weight: bold;
			margin-left: 5px;
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

		p {
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
