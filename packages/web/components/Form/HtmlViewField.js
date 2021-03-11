import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { SafeHtml } from '../SafeHtml';

import * as S from './styles';

const Field = styled.div`
	${({ theme: { colors, metrics }, placeholderStyle }) => css`
		border-radius: ${metrics.baseRadius}rem;
		border: 1px solid ${colors.lightGray4};
		background-color: ${colors.lightGray4};
		height: 12rem;
		cursor: text;
		color: ${colors.black};

		overflow-wrap: break-word;
		overflow-y: scroll;

		margin: 0.5rem 0;
		padding: 1.2rem;
		width: 100%;

		${!!placeholderStyle &&
			css`
				color: ${colors.lightGray2};
				font-style: italic;
			`}
	`}
`;

const HtmlViewField = ({ label, placeholder, html }) => {
	return (
		<S.InputFieldWrapper>
			<S.InputLabel>{label}</S.InputLabel>
			<S.Row>
				<Field placeholderStyle={!!placeholder && !html}>
					<SafeHtml html={html || placeholder} />
				</Field>
			</S.Row>
		</S.InputFieldWrapper>
	);
};

HtmlViewField.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	html: PropTypes.string,
};

HtmlViewField.defaultProps = {
	label: '',
	placeholder: '',
	html: '',
};

export default HtmlViewField;
