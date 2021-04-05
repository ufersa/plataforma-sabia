import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useSwr, { useSWRInfinite } from 'swr';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { animateScroll as scroll } from 'react-scroll';

import { InputField } from '../Form';
import { useAuth } from '../../hooks';
import { dateToString, stringToLocaleDate, stringToLocaleTime } from '../../utils/helper';
import { ROLES as apiRolesEnum, LIMITS as apiLimitsEnum } from '../../utils/enums/api.enum';
import { getChatInstance, getChatMessages, sendChatMessage } from '../../services';
import { toast } from '../Toast';
import EmptyScreen from '../EmptyScreen';
import * as S from './styles';

const getChatMessagesKey = (pageIndex, previousPageData, chatInstanceId) => {
	if (previousPageData && !previousPageData.length) return null;

	if (!pageIndex) return [`get-chat-messages-${chatInstanceId}`, 0];

	return [`get-chat-messages-${chatInstanceId}`, pageIndex];
};

const OrderMessages = ({ isBuyer, currentOrder, backToList, orderType }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [shouldScrollToTop, setShouldScrollToTop] = useState(false);
	const { user } = useAuth();
	const { t } = useTranslation(['account']);
	const form = useForm({ defaultValues: { message: '' }, reValidateMode: 'onSubmit' });

	const { data: chatInstance, isValidating: isValidatingChatInstance } = useSwr(
		['get-chat-instance', currentOrder.id],
		(_, orderId) =>
			getChatInstance({
				object_type: `${orderType}-order`,
				object_id: orderId,
				target_user: isBuyer ? currentOrder.owner.id : currentOrder.user_id,
			}),
		{
			revalidateOnFocus: false,
		},
	);

	const {
		data: rawMessages,
		isValidating: isValidatingChatMessages,
		mutate: mutateChatMessages,
		size,
		setSize,
	} = useSWRInfinite(
		(pageIndex, previousPageData) =>
			getChatMessagesKey(pageIndex, previousPageData, chatInstance.id),
		(_, offset) => getChatMessages(chatInstance.id, { offset: offset * 10 }),
		{
			revalidateOnFocus: false,
			refreshInterval: 60000,
		},
	);

	useEffect(() => {
		if (shouldScrollToTop) {
			scroll.scrollToTop({
				containerId: 'chat-messages-container',
				duration: 0,
			});
		} else {
			scroll.scrollToBottom({
				containerId: 'chat-messages-container',
				duration: 0,
			});
		}
	}, [rawMessages, shouldScrollToTop]);

	const handleSubmit = async (values) => {
		setIsSubmitting(true);
		mutateChatMessages(
			[
				[
					{
						id: `${Math.floor(Math.random() * values.message.length)}abc`,
						content: { text: values.message },
						created_at: new Date().toISOString(),
						from_user_id: user.id,
					},
				],
				...rawMessages,
			],
			false,
		);
		form.reset();

		const result = await sendChatMessage(chatInstance.id, values.message);

		if (!result)
			toast.error('Ocorreu um erro ao enviar sua mensagem. Tente novamente em instantes.');

		mutateChatMessages();
		setIsSubmitting(false);
		setShouldScrollToTop(false);
	};

	const chatMessages = rawMessages ? [].concat(...rawMessages).reverse() : null;
	const isFetching = isSubmitting || isValidatingChatInstance || isValidatingChatMessages;
	const isEmpty = rawMessages?.[0]?.length === 0;
	const isReachingEnd =
		isEmpty ||
		(rawMessages && rawMessages[rawMessages.length - 1]?.length < apiLimitsEnum.chatMessages);

	return (
		<S.Container onSubmit={form.handleSubmit(handleSubmit)} noValidate>
			<div>
				<S.ChatHeader>
					<S.Button onClick={backToList} type="button">
						Voltar
					</S.Button>
					{isFetching && <S.Spinner />}
				</S.ChatHeader>
				<S.MessagesWrapper id="chat-messages-container">
					{isEmpty && !isFetching && (
						<EmptyScreen message={t('messages.noChatMessagesToShow')} />
					)}

					{!isEmpty && chatMessages?.length >= apiLimitsEnum.chatMessages && (
						<S.Button
							type="button"
							disabled={isFetching || isReachingEnd}
							margin="0 auto 1.2rem"
							onClick={() => {
								setSize(size + 1);
								setShouldScrollToTop(true);
							}}
						>
							Carregar mais mensagens
						</S.Button>
					)}

					{chatMessages?.map((message, index) => (
						<S.MessageBlock key={message.id}>
							{stringToLocaleDate(message.created_at) !==
								stringToLocaleDate(chatMessages[index - 1]?.created_at) && (
								<span>{stringToLocaleDate(message.created_at)}</span>
							)}

							<S.SingleMessage ownMessage={user.id === message.from_user_id}>
								<img src="/no-avatar-placeholder.png" alt="User avatar" />

								<S.MessageContent>
									<p>{message.content?.text}</p>
									<span>
										{stringToLocaleTime(message.created_at, {
											timeStyle: 'short',
										})}
									</span>
								</S.MessageContent>
							</S.SingleMessage>
						</S.MessageBlock>
					))}
				</S.MessagesWrapper>
				<S.Actions>
					<InputField
						form={form}
						placeholder="Digite sua mensagem"
						variant="gray"
						name="message"
						validation={{ required: true }}
						autoComplete="off"
					/>
					<S.Button variant="contained" disabled={isFetching} type="submit">
						Enviar
					</S.Button>
				</S.Actions>
			</div>

			<S.OrderDetails>
				<S.UserDetails>
					<img src="/no-avatar-placeholder.png" alt="User profile" />

					<div>
						<p>{isBuyer ? 'Responsável' : 'Comprador'}</p>
						<p>
							{isBuyer
								? currentOrder.technology?.users?.find((technologyUser) => {
										return technologyUser.pivot?.role === apiRolesEnum.OWNER;
								  })?.full_name
								: currentOrder.user?.full_name}
						</p>
					</div>
				</S.UserDetails>

				<S.Technology>
					<p>{isBuyer ? 'Tecnologia adquirida' : 'Tecnologia negociada'}</p>

					<div>
						<img
							src={currentOrder.technology?.thumbnail?.url || '/card-image.jpg'}
							alt="Technology thumbnail"
						/>
						<S.TechnologyDetails>
							<p>{currentOrder.technology?.title}</p>
							<p>Data do pedido: {dateToString(currentOrder.created_at)}</p>
							<p>Quantidade: {currentOrder.quantity}</p>
							<Link href={`/t/${currentOrder.technology?.id}`} passHref>
								<S.Button as="a" target="_blank">
									Ver tecnologia
								</S.Button>
							</Link>
						</S.TechnologyDetails>
					</div>
				</S.Technology>
			</S.OrderDetails>
		</S.Container>
	);
};

OrderMessages.propTypes = {
	isBuyer: PropTypes.bool.isRequired,
	currentOrder: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		technology: PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			title: PropTypes.string,
			users: PropTypes.arrayOf(PropTypes.shape({})),
			thumbnail: PropTypes.shape({
				url: PropTypes.string,
			}),
		}),
		user: PropTypes.shape({
			full_name: PropTypes.string,
		}),
		user_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		created_at: PropTypes.string,
		owner: PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		}),
	}).isRequired,
	backToList: PropTypes.func.isRequired,
	orderType: PropTypes.string.isRequired,
};

export default OrderMessages;
