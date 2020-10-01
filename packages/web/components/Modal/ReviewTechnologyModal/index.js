import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdClose as CloseIcon } from 'react-icons/md';
import useSWR from 'swr';

import { TechnologyProvider } from '../../Technology/TechnologyProvider';
import Loading from '../../Loading';
import { TabList, TabPanel, Tabs as Container } from '../../Tab';
import { getTechnologyCosts } from '../../../services/technology';
import tabs from './tabs';
import {
	StyledModal,
	TabsHeader,
	StyledTab,
	CloseButton,
	ReviewWrapper,
	ReviewTitle,
	ReviewInput,
	ReviewActions,
	ReviewButton,
} from './styles';

const ReviewTechnologyModal = ({ closeModal, technology = {} }) => {
	const [inputValue, setInputValue] = useState('');

	const { data: technologyCosts, isValidating } = useSWR(
		'getCosts',
		() => getTechnologyCosts(technology.id, { normalize: true }),
		{
			revalidateOnFocus: false,
		},
	);

	const handleChange = ({ target: { value } }) => setInputValue(value);

	return (
		<StyledModal>
			<Container>
				<TabsHeader>
					<TabList>
						{tabs.map((tab) => (
							<StyledTab key={tab.slug} data-testid={tab.slug}>
								{tab.label}
							</StyledTab>
						))}
					</TabList>
					<CloseButton aria-label="Close modal" onClick={closeModal}>
						<CloseIcon />
					</CloseButton>
				</TabsHeader>

				<Loading loading={isValidating}>
					<TechnologyProvider technology={{ ...technology, technologyCosts }}>
						{tabs.map((tab) => (
							<TabPanel key={tab.slug}>
								<tab.component />
							</TabPanel>
						))}
					</TechnologyProvider>
				</Loading>

				<ReviewWrapper>
					<ReviewTitle>
						<h3>Observações</h3>
						<span>(Obrigatório em caso de correção ou reprovação)</span>
					</ReviewTitle>

					<ReviewInput
						rows="8"
						placeholder="Digite sua observação"
						value={inputValue}
						onChange={handleChange}
					/>

					<ReviewActions>
						<ReviewButton
							type="deny"
							disabled={!inputValue.trim()}
							onClick={() => console.log('click')}
						>
							Reprovar Tecnologia
						</ReviewButton>
						<ReviewButton type="requestChanges" disabled={!inputValue.trim()}>
							Solicitar Correção
						</ReviewButton>
						<ReviewButton type="approve">Aprovar Tecnologia</ReviewButton>
					</ReviewActions>
				</ReviewWrapper>
			</Container>
		</StyledModal>
	);
};

ReviewTechnologyModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	technology: PropTypes.shape({}).isRequired,
};

export default ReviewTechnologyModal;
