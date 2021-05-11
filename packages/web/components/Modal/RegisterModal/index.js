import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { MdPermContactCalendar, MdMailOutline, MdVpnKey } from 'react-icons/md';
import { AiFillCloseCircle as CloseIcon } from 'react-icons/ai';

import Link from 'next/link';
import { toast } from '../../Toast';
import { Form, InputField, CheckBoxField } from '../../Form';
import { Button } from '../../Button';
import { SafeHtml } from '../../SafeHtml';
import {
	StyledRegisterModal,
	StyledLabel,
	StyledCloseButton,
	StyledModalContent,
	ActionsRegister,
	Label,
	LabelGroups,
	StyledSpan,
	StyledLink,
	ErrorMessage,
	SuccessMessage,
} from './styles';
import { useModal, useAuth } from '../../../hooks';

const RegisterModal = ({ closeModal }) => {
	const { openModal } = useModal();
	const { register } = useAuth();
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation(['common']);
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);

	const router = useRouter();

	const handleSubmit = async ({ fullname, email, password }) => {
		setLoading(true);
		const result = await register({ fullname, email, password });
		setLoading(false);
		setError(false);
		if (result.error) {
			setError(true);
			setMessage(result.error.message[0].message);
		} else {
			closeModal();
			toast.success(t('common:accountCreated'));
			router.push('/auth/confirm-account');
		}
	};

	const [acceptedTerms, setAcceptedTerms] = useState({
		terms_conditions: false,
		data_conditions: false,
		platform_conditions: false,
		services_conditions: false,
		channel_conditions: false,
		link_conditions: false,
		process_conditions: false,
	});

	// eslint-disable-next-line consistent-return
	const handleAcceptedTerms = (type) => {
		const types = Object.keys(acceptedTerms);

		if (!type || !types.includes(type)) return;

		setAcceptedTerms({
			...acceptedTerms,
			[type]: !acceptedTerms[type],
		});
	};

	const isMissingCheck = () => {
		const checkTerms = [
			'terms_conditions',
			'data_conditions',
			'platform_conditions',
			'services_conditions',
			'channel_conditions',
			'link_conditions',
		];
		return checkTerms.every((key) => acceptedTerms[key]);
	};

	return (
		<StyledRegisterModal>
			<StyledLabel>
				<StyledCloseButton type="button" aria-label="Close modal" onClick={closeModal}>
					<CloseIcon />
				</StyledCloseButton>
				<SafeHtml html={t('common:registerTitle')} />
			</StyledLabel>
			<StyledModalContent>
				<Form onSubmit={handleSubmit}>
					<InputField
						icon={MdPermContactCalendar}
						name="fullname"
						placeholder={t('common:fullName')}
						type="text"
						validation={{ required: true }}
					/>
					<InputField
						icon={MdMailOutline}
						name="email"
						placeholder="E-mail"
						type="email"
						validation={{ required: true }}
					/>
					<InputField
						icon={MdVpnKey}
						name="password"
						placeholder="Senha"
						type="password"
					/>
					{error ? (
						<ErrorMessage>{message}</ErrorMessage>
					) : (
						<SuccessMessage>{message}</SuccessMessage>
					)}
					<CheckBoxField
						name="terms_conditions"
						value={acceptedTerms.terms_conditions}
						label={
							<Label>
								Concordo com a{' '}
								<Link href="/privacy-policy">
									<a target="_blank" rel="noopener noreferrer">
										Política de Privacidade
									</a>
								</Link>
								e os{' '}
								<Link href="/terms-of-use">
									<a target="_blank" rel="noopener noreferrer">
										Termos e Condições de Uso
									</a>
								</Link>
								.
							</Label>
						}
						required
						onChange={() => handleAcceptedTerms('terms_conditions')}
					/>
					<CheckBoxField
						name="data_conditions"
						value={acceptedTerms.data_conditions}
						label={
							<Label>
								Concordo com o processamento dos meus dados pessoais para fins de
								fornecimento dos serviços da Plataforma Sabiá. Veja mais na{' '}
								<Link href="/privacy-policy">
									<a target="_blank" rel="noopener noreferrer">
										Política de Privacidade
									</a>
								</Link>
								.
							</Label>
						}
						required
						onChange={() => handleAcceptedTerms('data_conditions')}
					/>
					<CheckBoxField
						name="platform_conditions"
						value={acceptedTerms.platform_conditions}
						label={
							<Label>
								Concordo em respeitar a legislação brasileira vigente no conteúdo
								que eu venha a disponibilizar na Plataforma Sabiá, sendo de minha
								exclusiva responsabilidade. Veja mais nos{' '}
								<Link href="/terms-of-use">
									<a target="_blank" rel="noopener noreferrer">
										Termos e Condições de Uso
									</a>
								</Link>
								.
							</Label>
						}
						required
						onChange={() => handleAcceptedTerms('platform_conditions')}
					/>
					<CheckBoxField
						name="services_conditions"
						value={acceptedTerms.services_conditions}
						label={
							<Label>
								Estou ciente de que posso revogar o consentimento de uso dos meus
								dados pessoais a qualquer momento. Todavia, não poderei mais
								utilizar os serviços da plataforma que necessitam do uso e da coleta
								de dados pessoais. Veja mais na{' '}
								<Link href="/privacy-policy">
									<a target="_blank" rel="noopener noreferrer">
										Política de Privacidade
									</a>
								</Link>
								.
							</Label>
						}
						required
						onChange={() => handleAcceptedTerms('services_conditions')}
					/>
					<CheckBoxField
						name="channel_conditions"
						value={acceptedTerms.channel_conditions}
						label={
							<Label>
								Estou ciente quanto ao canal de suporte da Plataforma Sabiá, que
								estará à disposição para sanar eventual dúvida que possa surgir.
							</Label>
						}
						required
						onChange={() => handleAcceptedTerms('channel_conditions')}
					/>
					<CheckBoxField
						name="link_conditions"
						value={acceptedTerms.link_conditions}
						label={
							<Label>
								Estou ciente que em hipótese alguma será constituído vínculo
								cooperativo, associativo, societário ou empregatício entre a
								plataforma, os usuários cadastrados e os parceiros. Veja mais nos{' '}
								<Link href="/terms-of-use">
									<a target="_blank" rel="noopener noreferrer">
										Termos e Condições de Uso
									</a>
								</Link>
								.
							</Label>
						}
						required
						onChange={() => handleAcceptedTerms('link_conditions')}
					/>
					<CheckBoxField
						name="process_conditions"
						value={acceptedTerms.process_conditions}
						label={
							<Label>
								Concordo com o processamento dos meus dados pessoais com o objetivo
								de receber publicidade da Plataforma Sabiá e de terceiros parceiros.
								Veja mais nos{' '}
								<Link href="/terms-of-use">
									<a target="_blank" rel="noopener noreferrer">
										Termos e Condições de Uso
									</a>
								</Link>
								.(Opcional)
							</Label>
						}
						onChange={() => handleAcceptedTerms('process_conditions')}
					/>

					<ActionsRegister>
						<Button type="submit" disabled={loading || !isMissingCheck()}>
							{loading ? t('common:wait') : t('common:register')}
						</Button>
						<LabelGroups>
							<StyledSpan>{t('common:alreadyHaveAnAccount?')}</StyledSpan>
							<StyledLink onClick={() => openModal('login')}>
								{t('common:enterHere')}
							</StyledLink>
						</LabelGroups>
					</ActionsRegister>
				</Form>
			</StyledModalContent>
		</StyledRegisterModal>
	);
};

RegisterModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
};

export default RegisterModal;
