import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { RequiredIndicator } from '.';

import { InputError, InputLabel, VerificationCodeWrapper } from './styles';

const KEY_CODE = {
	BACKSPACE: 8,
	LEFT: 37,
	RIGHT: 39,
};

const VerificationCodeField = forwardRef(({ value, onChange, label, required, error }, ref) => {
	const inputsRef = useRef([]);
	useImperativeHandle(ref, () => ({
		focus: () => inputsRef.current[0]?.focus(),
	}));

	const triggerValueChange = (index, _value) => {
		const newValues = [...value];
		newValues[index] = _value;
		onChange(newValues);
	};

	const handleChange = (event) => {
		const currentIndex = parseInt(event.target.dataset.id, 10);
		const nextElement = inputsRef.current[currentIndex + 1];
		const currentInputValue = event.target.value.replace(/[^\d]/gi, '');

		if (currentInputValue.length > 1 && nextElement) {
			const pasteValues = currentInputValue.split('');
			const newInputsValue = [...value];

			pasteValues.forEach((_value, index) => {
				const currentCursor = currentIndex + index;

				if (inputsRef.current[currentCursor]) {
					newInputsValue[currentCursor] = _value;
					inputsRef.current[currentCursor].focus();
				}
			});

			onChange(newInputsValue);
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
		<VerificationCodeWrapper error={!!error.message}>
			{!!label && (
				<InputLabel id="verification-code-label" variant="lightRounded">
					{label} {required && <RequiredIndicator />}
				</InputLabel>
			)}
			<div>
				{value.map((_value, index) => (
					<input
						// eslint-disable-next-line react/no-array-index-key
						key={index}
						ref={(el) => {
							inputsRef.current[index] = el;
						}}
						data-id={index}
						type="number"
						value={_value}
						onChange={handleChange}
						onFocus={handleFocus}
						onKeyDown={handleKeyDown}
						aria-labelledby={label ? 'verification-code-label' : ''}
						aria-label={!label ? `Verification code input number ${index + 1}` : ''}
					/>
				))}
			</div>
			{!!error.message && <InputError>{error.message}</InputError>}
		</VerificationCodeWrapper>
	);
});

VerificationCodeField.propTypes = {
	value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	required: PropTypes.bool,
	error: PropTypes.shape({
		message: PropTypes.string,
	}),
};

VerificationCodeField.defaultProps = {
	value: [],
	label: '',
	required: false,
	error: {},
};

export default VerificationCodeField;
