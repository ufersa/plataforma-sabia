import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { cache } from 'swr';
import { createTechnologyReview } from '../../../../services';
import Rating from '../../../Rating';
import { toast } from '../../../Toast';
import ModalContext from '../../ModalContext';
import Points from '../Points';
import {
	Container,
	TextArea,
	RatingContainer,
	ButtonsContainer,
	SubmitButton,
	CloseButton,
} from './styles';

const AddReview = ({ technology }) => {
	const contentRef = useRef(null);
	const { closeModal } = useContext(ModalContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [positivePoints, setPositivePoints] = useState([]);
	const [negativePoints, setNegativePoints] = useState([]);
	const [rating, setRating] = useState(0);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		const { value: content } = contentRef.current;

		const data = {
			technologyId: technology.id,
			content,
			positive: positivePoints,
			negative: negativePoints,
			rating,
		};

		// console.log({ data });

		// return;

		const result = await createTechnologyReview(data);

		if (result) {
			toast.success('Avaliação cadastrada com sucesso');
		} else {
			toast.error('Ocorreu um erro ao cadastrar sua avaliação.');
		}

		setIsSubmitting(false);
		cache.clear();
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<p>Como foi sua experiência com essa tecnologia?</p>
				<TextArea ref={contentRef} />

				<Points label="Quais pontos positivos?" onPointsUpdate={setPositivePoints} />
				<Points label="Quais pontos negativos?" onPointsUpdate={setNegativePoints} />

				<RatingContainer>
					<p>Qual sua nota para essa tecnologia?</p>
					<Rating value={rating} onClick={setRating} size={3} />
				</RatingContainer>

				<ButtonsContainer>
					<CloseButton onClick={closeModal}>Cancelar</CloseButton>
					<SubmitButton disabled={isSubmitting}>
						{!isSubmitting ? 'Registrar Avaliação' : 'Cadastrando...'}
					</SubmitButton>
				</ButtonsContainer>
			</form>
		</Container>
	);
};

AddReview.propTypes = {
	technology: PropTypes.shape({
		id: PropTypes.number,
	}),
};

AddReview.defaultProps = {
	technology: {},
};

export default AddReview;
