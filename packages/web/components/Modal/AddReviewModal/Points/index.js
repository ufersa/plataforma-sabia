import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Form,
	Input,
	AddButton,
	RemoveButton,
	PlusIcon,
	ItemContainer,
	Item,
} from './styles';

const Points = ({ label }) => {
	const [points, setPoints] = useState([]);
	const inputRef = useRef(null);

	const addPoint = (event) => {
		event.preventDefault();
		event.stopPropagation();

		const { value } = inputRef.current;

		if (!value) {
			return;
		}

		setPoints((state) => [...state, value]);
		inputRef.current.value = '';
	};

	const removePoint = (index) => {
		setPoints((state) => state.filter((_, i) => i !== index));
	};

	return (
		<Container>
			<Form onSubmit={addPoint}>
				<label htmlFor={`input-${label}`}>{label}</label>
				<div>
					<Input id={`input-${label}`} ref={inputRef} />
					<AddButton type="submit">
						<PlusIcon />
						<span>Adicionar</span>
					</AddButton>
				</div>
			</Form>

			{!!points.length && (
				<ul>
					{points.map((point, index) => (
						<ItemContainer>
							{/* eslint-disable-next-line react/no-array-index-key */}
							<Item key={index}>{`"${point}"`}</Item>
							<RemoveButton onClick={() => removePoint(index)}>Remover</RemoveButton>
						</ItemContainer>
					))}
				</ul>
			)}
		</Container>
	);
};

Points.propTypes = {
	label: PropTypes.string.isRequired,
};

export default Points;
