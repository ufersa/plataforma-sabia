import React, { useCallback, useState, createElement } from 'react';

import HasNoTechnology from './HasNoTechnology';
import AddReview from './AddReview';

const components = {
	addReview: AddReview,
	hasNoTechnology: HasNoTechnology,
};

const AddReviewModal = () => {
	const [currentContent, setCurrentContent] = useState(null);

	const switchContent = useCallback(() => {
		return components[currentContent] ? createElement(components[currentContent]) : null;
	}, [currentContent]);

	return (
		switchContent() || (
			<>
				<h1>Você já tem essa tecnologia?</h1>
				<button type="button" onClick={() => setCurrentContent('hasNoTechnology')}>
					Ainda não
				</button>
				<button type="button" onClick={() => setCurrentContent('addReview')}>
					Já tenho
				</button>
			</>
		)
	);
};

export default AddReviewModal;
