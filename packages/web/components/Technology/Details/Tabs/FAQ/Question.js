import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FiCornerDownRight } from 'react-icons/fi';
import { formatDateLong } from '../../../../../utils/helper';

const Question = ({ question }) => {
	return (
		<Container>
			<Date>{formatDateLong(question.created_at)}</Date>
			<StyledQuestion>{question.question}</StyledQuestion>
			<FiCornerDownRight />
			<Answer>{question.answer}</Answer>
		</Container>
	);
};

const Container = styled.div`
	${({ theme: { colors } }) => css`
		& + div {
			margin-top: 3.2rem;
		}

		svg {
			color: ${colors.lightGray2};
			width: 1.6rem;
			margin-right: 1.2rem;
		}
	`}
`;

const Date = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		font-size: 1.2rem;
		font-weight: 500;
		margin-bottom: 0.4rem;
	`}
`;

const StyledQuestion = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.black};
		font-weight: 500;
		margin-bottom: 0.8rem;
	`}
`;

const Answer = styled.p`
	${({ theme: { colors } }) => css`
		color: ${colors.lightGray2};
		font-weight: 500;
		display: inline-block;
	`}
`;

Question.propTypes = {
	question: PropTypes.shape({
		question: PropTypes.string,
		answer: PropTypes.string,
		created_at: PropTypes.string,
	}).isRequired,
};

export default Question;
