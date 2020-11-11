import React from 'react';
import PropTypes from 'prop-types';

import { useAuth } from '../../hooks';
import * as S from './styles';
import { dateToString } from '../../utils/helper';
import { InputField } from '../Form';

const chatMock = [
	{
		id: 1,
		date: '2020-01-01 12:53:24.000000',
		messages: [
			{
				id: 1,
				ownMessage: true,
				content: 'Olá',
				created_at: '2020-01-01 14:53:24.000000',
			},
			{
				id: 2,
				ownMessage: false,
				content: 'Oi, tudo bem?',
				created_at: '2020-01-01 15:53:24.000000',
			},
			{
				id: 3,
				ownMessage: true,
				content: 'Tudo bem, e você?',
				created_at: '2020-01-01 15:59:24.000000',
			},
		],
	},
	{
		id: 2,
		date: '2020-12-25 12:53:24.000000',
		messages: [
			{
				id: 1,
				ownMessage: false,
				content: 'Esqueci de te responder, feliz natal!',
				created_at: '2020-01-01 14:53:24.000000',
			},
			{
				id: 2,
				ownMessage: true,
				content: 'Tchau!',
				created_at: '2020-01-01 15:53:24.000000',
			},
			{
				id: 3,
				ownMessage: false,
				content: 'Que falta de educação cara',
				created_at: '2020-01-01 15:54:24.000000',
			},
			{
				id: 4,
				ownMessage: false,
				content: 'Só vim te desejar boas festas',
				created_at: '2020-01-01 15:55:24.000000',
			},
			{
				id: 5,
				ownMessage: true,
				content: 'Aqui não é facebook',
				created_at: '2020-01-01 15:59:24.000000',
			},
		],
	},
];

const OrderMessages = ({ isBuyer, currentOrder, backToList }) => {
	const { user } = useAuth();

	return (
		<S.Container>
			<div>
				<div>
					<S.Button onClick={backToList}>Voltar</S.Button>
				</div>
				<S.MessagesWrapper>
					{chatMock.map((chat) => (
						<S.MessageBlock key={chat.id}>
							<span>{new Date(chat.date).toLocaleDateString('pt-br')}</span>

							{chat.messages.map((message) => (
								<S.SingleMessage key={message.id} ownMessage={message.ownMessage}>
									<img src="/no-avatar-placeholder.png" alt="User avatar" />

									<S.MessageContent>
										<p>{message.content}</p>
										<span>
											{new Date(message.created_at).toLocaleTimeString(
												'pt-br',
												{
													timeStyle: 'short',
												},
											)}
										</span>
									</S.MessageContent>
								</S.SingleMessage>
							))}
						</S.MessageBlock>
					))}
				</S.MessagesWrapper>
				<S.Actions>
					<InputField
						form={{ register: () => {} }}
						placeholder="Digite sua mensagem"
						label=""
						variant="gray"
						name="message"
					/>
					<S.Button variant="contained">Enviar</S.Button>
				</S.Actions>
			</div>

			<S.OrderDetails>
				<S.UserDetails>
					<img src="/no-avatar-placeholder.png" alt="User profile" />

					<div>
						<p>{isBuyer ? 'Responsável' : 'Comprador'}</p>
						<p>{isBuyer ? currentOrder.responsible : user.full_name}</p>
					</div>
				</S.UserDetails>

				<S.Technology>
					<p>{isBuyer ? 'Tecnologia adquirida' : 'Tecnologia negociada'}</p>

					<div>
						<img
							src="https://rocketfinalchallenge.s3.amazonaws.com/card-image.jpg"
							alt="Technology thumbnail"
						/>
						<S.TechnologyDetails>
							<p>{currentOrder.title}</p>
							<p>Data do pedido: {dateToString(currentOrder.created_at)}</p>
							<p>Quantidade: {currentOrder.quantity}</p>
							<S.Button>Ver tecnologia</S.Button>
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
		title: PropTypes.string,
		quantity: PropTypes.number,
		responsible: PropTypes.string,
		created_at: PropTypes.string,
	}).isRequired,
	backToList: PropTypes.func.isRequired,
};

export default OrderMessages;
