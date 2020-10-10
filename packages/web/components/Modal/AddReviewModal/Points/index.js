import React, {
	useState,
	useRef,
	// useEffect,
	useCallback,
} from 'react';
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

/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
const Points = ({ label, getPoints }) => {
	const [points, setPoints] = useState([]);
	const inputRef = useRef(null);

	// useEffect(() => {
	// 	getPoints = points;
	// }, [points]);

	const addPoint = useCallback((event) => {
		event.preventDefault();
		event.stopPropagation();

		const { value } = inputRef.current;

		if (!value) {
			return;
		}

		setPoints((state) => [...state, value]);
		inputRef.current.value = '';
	}, []);

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
						<PointContainer>
							{/* eslint-disable-next-line react/no-array-index-key */}
							<Point key={index}>{`"${point}"`}</Point>
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
};

export default Points;
