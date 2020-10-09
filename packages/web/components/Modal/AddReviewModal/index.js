import React, { useCallback, useState, createElement } from 'react';
import HasNoTechnology from './HasNoTechnology';
import AddReview from './AddReview';
import { Container, Question, ButtonsContainer, Button } from './styles';

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
			<Container>
				<Question>Você já tem essa tecnologia?</Question>
				<ButtonsContainer>
					<Button type="negative" onClick={() => setCurrentContent('hasNoTechnology')}>
						Ainda não
					</Button>
					<Button type="positive" onClick={() => setCurrentContent('addReview')}>
						Sim, já tenho
					</Button>
				</ButtonsContainer>
			</Container>
		)
	);
};

export default AddReviewModal;
