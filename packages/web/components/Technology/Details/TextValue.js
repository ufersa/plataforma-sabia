import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import styled, { css } from 'styled-components';
import List from './List';

const TextValue = ({ title, value, boolean, showIfEmpty }) => {
	const { t } = useTranslation(['common']);

	if (!boolean && !value && typeof value !== 'number' && !showIfEmpty) {
		return null;
	}

	if (boolean) {
		// eslint-disable-next-line no-param-reassign
		value = value ? t('common:yes') : t('common:no');
	}

	return (
		<Container>
			{!!title && <strong>{title}: </strong>}
			{Array.isArray(value) ? <List itens={value} /> : <span>{value}</span>}
		</Container>
	);
};

TextValue.propTypes = {
	title: PropTypes.string,
	boolean: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.node,
		PropTypes.string,
		PropTypes.number,
	]),
	showIfEmpty: PropTypes.bool,
};

TextValue.defaultProps = {
	title: null,
	value: null,
	boolean: false,
	showIfEmpty: false,
};

export const Container = styled.div`
	${({ theme: { colors } }) => css`
		font-size: 1.6rem;
		line-height: 2.4rem;

		strong {
			color: ${colors.darkGray};
		}

		span {
			color: ${colors.black};
		}
	`}
`;

export default TextValue;
