import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Container, Question, ButtonsContainer, Button } from './styles';
import { updateCategoriesReviewer } from '../../../services';
import { toast } from '../../Toast';

const CurateSpecialtiesDeleteModal = ({ categories, speciality, closeModal }) => {
	const router = useRouter();

	const onRemove = async () => {
		const specialties = categories
			.filter((category) => !speciality.includes(category.id))
			.map((category) => category.id);
		const reviewer = await updateCategoriesReviewer({
			categories: specialties,
		});

		if (reviewer) {
			closeModal();
			router.reload();
			return toast.success('Solicitação enviada com sucesso');
		}

		return toast.error('Ocorreu um erro, recarregue a página e tente novamente');
	};

	return (
		<Container>
			<Question>Você tem certeza que deseja remover?</Question>
			<ButtonsContainer>
				<Button type="negative" onClick={closeModal}>
					Cancelar
				</Button>
				<Button type="positive" onClick={onRemove}>
					Remover
				</Button>
			</ButtonsContainer>
		</Container>
	);
};

CurateSpecialtiesDeleteModal.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.shape({})),
	speciality: PropTypes.arrayOf(PropTypes.number),
	closeModal: PropTypes.func.isRequired,
};

CurateSpecialtiesDeleteModal.defaultProps = {
	categories: [],
	speciality: 0,
};

export default CurateSpecialtiesDeleteModal;
