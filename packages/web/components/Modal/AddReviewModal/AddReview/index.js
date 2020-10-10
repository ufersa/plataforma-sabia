import React, { useState } from 'react';
import { cache } from 'swr';
import PropTypes from 'prop-types';
import { createTechnologyReview } from '../../../../services';
import Rating from '../../../Rating';
import { toast } from '../../../Toast';
import Points from '../Points';

const AddReview = ({ technology }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [positivePoints, setPositivePoints] = useState(null);
	const [negativePoints, setNegativePoints] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		// setIsSubmitting(true);

		const data = {
			technologyId: technology.id,
			content: '',
			positive: positivePoints,
			negative: negativePoints,
			rating: 1,
		};

		// console.log(data);

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
		<>
			<form onSubmit={handleSubmit}>
				{/* Content */}
				<p>Como foi sua experiência com essa tecnologia?</p>
				<textarea value="Foi muito boa" />

				<Points label="Quais pontos positivos?" onPointsUpdate={setPositivePoints} />
				<Points label="Quais pontos negativos?" onPointsUpdate={setNegativePoints} />

				{/* Rating */}
				<p>Qual sua nota para essa tecnologia?</p>
				<Rating readonly size={3} />

				{/* Footer */}
				<button type="button">Cancelar</button>
				<button type="submit" disabled={isSubmitting}>
					{!isSubmitting ? 'Registrar Avaliação' : 'Cadastrando...'}
				</button>
			</form>
		</>
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
