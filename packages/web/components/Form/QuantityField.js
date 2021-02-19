import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import styled, { css } from 'styled-components';

import { InputFieldWrapper, InputLabel } from './styles';

const Row = styled.div`
	${({ theme: { colors, metrics } }) => css`
		display: flex;
		align-items: center;
		padding: 0.8rem;

		background-color: ${colors.lightGray4};
		border-radius: ${metrics.baseRadius}rem;
	`}
`;

const Button = styled.button`
	${({ theme: { colors } }) => css`
		border: none;
		background: none;
		outline: none;

		display: flex;
		align-items: center;
		justify-content: center;

		color: ${colors.secondary};

		&:focus {
			box-shadow: 0px 0px 4px 2px ${colors.primary};
		}

		&:first-of-type {
			margin-right: 2rem;
		}

		&:last-of-type {
			margin-left: 2rem;
		}

		&:disabled {
			opacity: 0.54;
			cursor: not-allowed;
		}
	`}
`;

const QuantityText = styled.span`
	width: 2.4rem;
	text-align: center;
`;

const QuantityField = ({ defaultValue, labelPlacement, minValue, onChange }) => {
	const [internalQuantity, setInternalQuantity] = useState(defaultValue);

	useEffect(() => {
		onChange(internalQuantity);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [internalQuantity]);

	const handleDecreaseValue = () => {
		if (internalQuantity > minValue) {
			setInternalQuantity((prevValue) => prevValue - 1);
		}
	};

	const handleIncreaseValue = () => {
		setInternalQuantity((prevValue) => prevValue + 1);
	};

	return (
		<InputFieldWrapper labelPlacement={labelPlacement}>
			<InputLabel>Quantidade:</InputLabel>

			<Row>
				<Button
					disabled={internalQuantity <= minValue}
					aria-label="Decrease quantity"
					type="button"
					onClick={handleDecreaseValue}
				>
					<MdArrowBack fontSize={24} />
				</Button>
				<QuantityText>{internalQuantity}</QuantityText>
				<Button aria-label="Increase quantity" type="button" onClick={handleIncreaseValue}>
					<MdArrowForward fontSize={24} />
				</Button>
			</Row>
		</InputFieldWrapper>
	);
};

QuantityField.propTypes = {
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	labelPlacement: PropTypes.string,
	minValue: PropTypes.number,
	onChange: PropTypes.func,
};

QuantityField.defaultProps = {
	defaultValue: '',
	labelPlacement: 'top',
	minValue: 0,
	onChange: () => {},
};

export default QuantityField;
