import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Select from 'react-select';
import { RectangularButton } from '../../Button';
import { useModal } from '../../../hooks';
import { RequiredIndicator } from '../../Form';
import { buyTechnology } from '../../../services';
import { toast } from '../../Toast';
import { FUNDING as orderFundingEnum, USE as orderUseEnum } from '../../../utils/enums/orders.enum';
import { getFundingLabelText, getUseLabelText } from '../../../utils/technologyOrders';
import * as S from './styles';

const technologyFunding = [
	{
		id: 1,
		label: getFundingLabelText(orderFundingEnum.HAS_FUNDING),
		value: orderFundingEnum.HAS_FUNDING,
	},
	{
		id: 2,
		label: getFundingLabelText(orderFundingEnum.WANTS_FUNDING),
		value: orderFundingEnum.WANTS_FUNDING,
	},
	{
		id: 3,
		label: getFundingLabelText(orderFundingEnum.NO_NEED_FUNDING),
		value: orderFundingEnum.NO_NEED_FUNDING,
	},
];

/*
 * Reducer based on useState so we can update receiving previous value
 */
const useStateReducer = (prevState, newState) =>
	typeof newState === 'function'
		? { ...prevState, ...newState(prevState) }
		: { ...prevState, ...newState };

const initialState = {
	quantity: 0,
};

/*
 * Validates state to check for unset fields
 *
 */
const validateFields = (state) => {
	const { quantity, use, funding } = state;

	if (!quantity || !use || !funding) return false;

	return true;
};

const BuyTechnologyModal = ({ technology }) => {
	const [fields, setFields] = useReducer(useStateReducer, initialState);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { closeModal } = useModal();
	const validForm = validateFields(fields);

	const handleSumTechQuantity = (quantityToSum) =>
		setFields((prevState) => ({ quantity: prevState.quantity + quantityToSum }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const result = await buyTechnology(technology.id, { ...fields });

		if (result) toast.success('Ordem de compra enviada com sucesso');
		else
			toast.error(
				'Ocorreu um erro ao registrar ordem de compra. Tente novamente em instantes.',
			);

		setIsSubmitting(false);
		closeModal();
	};

	return (
		<form onSubmit={handleSubmit}>
			<S.Header>
				<div>
					<img
						src={technology.thumbnail?.url || '/card-image.jpg'}
						alt="Imagem de capa para a tecnologia"
					/>
				</div>

				<div>
					<h3>{technology.title}</h3>

					<S.QuantityField>
						<span id="btm1befa-technology-quantity">
							Quantas unidades da tecnologia?
							<RequiredIndicator />
						</span>

						<div aria-labelledby="btm1befa-technology-quantity">
							<button
								aria-label="Decrease quantity"
								onClick={() => handleSumTechQuantity(-1)}
								type="button"
								disabled={!fields.quantity}
							>
								<AiOutlineArrowLeft />
							</button>

							<span role="textbox" aria-readonly="true">
								{fields.quantity}
							</span>

							<button
								aria-label="Increase quantity"
								onClick={() => handleSumTechQuantity(1)}
								type="button"
							>
								<AiOutlineArrowRight />
							</button>
						</div>
					</S.QuantityField>

					<S.TechnologyUseField>
						<span id="btm6c297-technology-use">
							A tecnologia será adquirida para uso:
							<RequiredIndicator />
						</span>
						<div aria-labelledby="btm6c297-technology-use">
							{Object.values(orderUseEnum).map((option) => {
								const label = getUseLabelText(option);

								return (
									<S.RadioWrapper key={option}>
										<input
											id={`btm2b3ef-${label}`}
											value={option}
											name="technology-use"
											type="radio"
											onChange={(e) => setFields({ use: e.target.value })}
										/>
										<label htmlFor={`btm2b3ef-${label}`}>{label}</label>
									</S.RadioWrapper>
								);
							})}
						</div>
					</S.TechnologyUseField>
				</div>
			</S.Header>

			<S.Content>
				<span id="btm1sfb4-funding">
					Deseja financiamento para essa aquisição?
					<RequiredIndicator />
				</span>
				<Select
					aria-labelledby="btm1sfb4-funding"
					instanceId="btm1s23e-funding-select"
					options={technologyFunding}
					placeholder="Selecione a opção"
					isSearchable={false}
					onChange={(option) => setFields({ funding: option.value })}
				/>

				<label htmlFor="btm21sf1-comments">
					Observações
					<input
						id="btm21sf1-comments"
						type="text"
						onChange={(e) => setFields({ comment: e.target.value })}
					/>
				</label>
			</S.Content>

			<S.Actions>
				<RectangularButton variant="outlined" colorVariant="red" onClick={closeModal}>
					Cancelar
				</RectangularButton>
				<RectangularButton
					variant="filled"
					colorVariant="green"
					disabled={!validForm || isSubmitting}
					type="submit"
				>
					Adquirir tecnologia
				</RectangularButton>
			</S.Actions>
		</form>
	);
};

BuyTechnologyModal.propTypes = {
	technology: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		thumbnail: PropTypes.string,
	}).isRequired,
};

export default BuyTechnologyModal;
