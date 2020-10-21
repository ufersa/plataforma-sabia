import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createTechnologyReview } from '../../../../services';
import Rating from '../../../Rating';
import { toast } from '../../../Toast';
import Points from '../Points';
import { useModal } from '../../../../hooks';
import {
	Container,
	TextArea,
	RatingContainer,
	ButtonsContainer,
	SubmitButton,
	CloseButton,
} from './styles';

const AddReview = ({ technology, mutate }) => {
	const { closeModal } = useModal();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isAbleToSubmit, setIsAbleToSubmit] = useState(false);
	const [content, setContent] = useState(null);
	const [positivePoints, setPositivePoints] = useState([]);
	const [negativePoints, setNegativePoints] = useState([]);
	const [rating, setRating] = useState(0);

	useEffect(() => {
		if (!content?.length || !rating || !positivePoints.length || !negativePoints.length) {
			setIsAbleToSubmit(false);
			return;
		}

		setIsAbleToSubmit(true);
	}, [setIsAbleToSubmit, negativePoints.length, positivePoints.length, rating, content]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitting(false);

		const data = {
			technologyId: technology.id,
			content,
			positive: positivePoints,
			negative: negativePoints,
			rating,
		};

		mutate((oldData) => (oldData ? [data, ...oldData] : [data]), false);
		const result = await createTechnologyReview(data);

		if (result) {
			toast.success('Avaliação cadastrada com sucesso');
			closeModal();
		} else {
			toast.error('Ocorreu um erro ao cadastrar sua avaliação.');
		}

		setIsSubmitting(false);
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<p>Como foi sua experiência com essa tecnologia?*</p>
				<TextArea onChange={(e) => setContent(e.currentTarget.value)} name="content" />

				<Points label="Quais pontos positivos?*" onPointsUpdate={setPositivePoints} />
				<Points label="Quais pontos negativos?*" onPointsUpdate={setNegativePoints} />

				<RatingContainer aria-label="Avaliação">
					<p>Qual sua nota para essa tecnologia?*</p>
					<Rating value={rating} onClick={setRating} size={3} />
				</RatingContainer>

				<ButtonsContainer>
					<CloseButton onClick={closeModal}>Cancelar</CloseButton>
					<SubmitButton disabled={!isAbleToSubmit || isSubmitting}>
						<span>{!isSubmitting ? 'Registrar Avaliação' : 'Cadastrando...'}</span>
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
	mutate: PropTypes.func.isRequired,
};

AddReview.defaultProps = {
	technology: {},
};

export default AddReview;
