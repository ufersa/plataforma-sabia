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

	// eslint-disable-next-line consistent-return
	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(true);

		const { value: content } = contentRef.current;

		if (!content || !rating || !positivePoints.length || !negativePoints.length) {
			setIsSubmitting(false);
			return toast.error('Todos os campos são obrigatórios.');
		}

		const result = await createTechnologyReview({
			technologyId: technology.id,
			content,
			positive: positivePoints,
			negative: negativePoints,
			rating,
		});

		if (result) {
			toast.success('Avaliação cadastrada com sucesso');
			cache.clear();
			closeModal();
		} else {
			toast.error('Ocorreu um erro ao cadastrar sua avaliação.');
		}

		setIsSubmitting(false);
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<p>Como foi sua experiência com essa tecnologia?</p>
				<TextArea name="content" ref={contentRef} />

				<Points label="Quais pontos positivos?" onPointsUpdate={setPositivePoints} />
				<Points label="Quais pontos negativos?" onPointsUpdate={setNegativePoints} />

				<RatingContainer aria-label="Avaliação">
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
