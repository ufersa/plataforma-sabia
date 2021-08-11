import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { VerificationCodeWrapper } from './styles';

const KEY_CODE = {
	BACKSPACE: 8,
	LEFT: 37,
	RIGHT: 39,
};

const VerificationCodeField = forwardRef(({ values, setValues }, ref) => {
	const inputsRef = useRef([]);
	useImperativeHandle(ref, () => ({
		focus: () => inputsRef.current[0].focus(),
	}));

	const triggerValueChange = (index, value) => {
		const newValues = [...values];
		newValues[index] = value;
		setValues(newValues);
	};

	const handleChange = (event) => {
		const currentIndex = parseInt(event.target.dataset.id, 10);
		const nextElement = inputsRef.current[currentIndex + 1];
		const currentInputValue = event.target.value.replace(/[^\d]/gi, '');

		if (currentInputValue.length > 1 && nextElement) {
			const pasteValues = currentInputValue.split('');
			const newInputsValue = [...values];

			pasteValues.forEach((value, index) => {
				const currentCursor = currentIndex + index;

				if (inputsRef.current[currentCursor]) {
					newInputsValue[currentCursor] = value;
					inputsRef.current[currentCursor].focus();
				}
			});

			setValues(newInputsValue);
			return;
		}

		if (event.target.value.length <= 1) {
			triggerValueChange(currentIndex, currentInputValue);
		}

		if (nextElement && currentInputValue) {
			nextElement.focus();
			nextElement.select();
		}
	};

	const handleFocus = (event) => {
		event.target.select(event);
	};

	const handleKeyDown = (event) => {
		const currentIndex = parseInt(event.target.dataset.id, 10);
		const previousElement = inputsRef.current[currentIndex - 1];
		const nextElement = inputsRef.current[currentIndex + 1];

		switch (event.keyCode) {
			case KEY_CODE.BACKSPACE:
				if (previousElement && !event.target.value) {
					previousElement.focus();
					previousElement.select();
				}
				break;
			case KEY_CODE.LEFT:
				event.preventDefault();
				if (previousElement) {
					previousElement.focus();
					previousElement.select();
				}
				break;
			case KEY_CODE.RIGHT:
				event.preventDefault();
				if (nextElement) {
					nextElement.focus();
					nextElement.select();
				}
				break;
			default:
				break;
		}
	};

	return (
		<VerificationCodeWrapper>
			{values.map((value, index) => (
				<input
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					ref={(el) => {
						inputsRef.current[index] = el;
					}}
					data-id={index}
					type="number"
					value={value}
					onChange={handleChange}
					onFocus={handleFocus}
					onKeyDown={handleKeyDown}
				/>
			))}
		</VerificationCodeWrapper>
	);
});

VerificationCodeField.propTypes = {
	values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
	setValues: PropTypes.func.isRequired,
};

VerificationCodeField.defaultProps = {
	values: null,
};

export default VerificationCodeField;
