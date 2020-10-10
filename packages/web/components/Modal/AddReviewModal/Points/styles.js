import styled, { css } from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import StyledButton from '../../../Button/styles';

export const Container = styled.div`
	margin: 2rem 0;
`;

export const Field = styled.div`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	width: 50rem;
	margin: 1rem 0;

	label {
		font-size: 1.6rem;
		margin-bottom: 1rem;
	}

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
`;

export const Input = styled.input`
	${({ theme: { colors } }) => css`
		width: 100%;
		margin-right: 0.8rem;
		background: ${colors.lightGray4};
		border: none;
		border-radius: 0.5rem;
		padding: 1.4rem 1rem;
		font-size: 1.4rem;
	`}
`;

export const AddButton = styled(StyledButton).attrs(() => ({
	type: 'button',
}))`
	${({ theme: { colors } }) => css`
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.4rem;
		text-transform: uppercase;
		border-radius: 0;
		background: ${colors.white};
		color: ${colors.secondary};
		border: 0.3rem solid ${colors.secondary};

		span {
			font-weight: 600;
			font-size: 1.2rem;
		}
	`}
`;

export const RemoveButton = styled(StyledButton).attrs(() => ({
	type: 'button',
}))`
	${({ theme: { colors } }) => css`
		padding: 0.4rem;
		text-transform: uppercase;
		background: transparent;
		color: ${colors.red};
		font-size: 1.2rem;
		font-weight: 600;
	`}
`;

export const PlusIcon = styled(AiOutlinePlus).attrs(({ theme: { colors } }) => ({
	color: colors.secondary,
}))``;

export const PointContainer = styled.li`
	${({ theme: { colors } }) => css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1rem 0;
		border-top: 0.1rem solid ${colors.border};

		:last-child {
			border-bottom: 0.1rem solid ${colors.border};
		}
	`}
`;

export const Point = styled.p`
	${({ theme: { colors } }) => css`
		font-size: 1.4rem;
		color: ${colors.lightGray2};
		font-style: italic;
		line-height: 2.4rem;
	`}
`;
