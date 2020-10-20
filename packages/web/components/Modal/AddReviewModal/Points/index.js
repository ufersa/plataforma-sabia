/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Field,
	Input,
	AddButton,
	RemoveButton,
	PlusIcon,
	PointContainer,
	Point,
} from './styles';

const Points = ({ label, onPointsUpdate }) => {
	const [points, setPoints] = useState([]);
	const inputRef = useRef(null);

	useEffect(() => {
		if (onPointsUpdate) {
			onPointsUpdate(points);
		}
	}, [onPointsUpdate, points]);

	const addPoint = useCallback(() => {
		const { value } = inputRef.current;

		if (!value || points.includes(value)) {
			return;
		}

		setPoints([...points, value]);
		inputRef.current.value = '';
	}, [points]);

	const removePoint = useCallback(
		(index) => {
			setPoints(points.filter((_, item) => item !== index));
		},
		[points],
	);

	return (
		<Container>
			<Field>
				<label htmlFor={`input-${label}`}>{label}</label>
				<div>
					<Input autoComplete="off" id={`input-${label}`} ref={inputRef} />
					<AddButton onClick={addPoint}>
						<PlusIcon />
						<span>Adicionar</span>
					</AddButton>
				</div>
			</Field>

			{!!points.length && (
				<ul>
					{points.map((point, index) => (
						<PointContainer key={`point-${point}-${index}`}>
							<Point>{`"${point}"`}</Point>
							<RemoveButton onClick={() => removePoint(index)}>Remover</RemoveButton>
						</PointContainer>
					))}
				</ul>
			)}
		</Container>
	);
};

Points.propTypes = {
	label: PropTypes.string.isRequired,
	onPointsUpdate: PropTypes.func.isRequired,
};

export default Points;
