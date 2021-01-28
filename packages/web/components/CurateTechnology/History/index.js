import React from 'react';

import EmptyScreen from '../../EmptyScreen';
import { useAuth, useTechnology } from '../../../hooks';
import { stringToLocaleDate } from '../../../utils/helper';
import { Container, ContentBox } from '../styles';
import * as S from './styles';

const History = () => {
	const { technology } = useTechnology();
	const { user } = useAuth();

	const comments = [...technology.technologyComments].reverse();

	return (
		<Container>
			<ContentBox flexBasis="100%">
				{comments.length ? (
					comments.map((comment) => (
						<S.Comment key={comment.id}>
							<S.CommentTitle>
								<p>
									{user.id === comment.user_id
										? 'Comentários do curador'
										: 'Comentários do pesquisador'}
								</p>
							</S.CommentTitle>

							<S.CommentContent>
								<span>
									{stringToLocaleDate(comment.created_at, {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</span>
								<p>{comment.comment}</p>
							</S.CommentContent>
						</S.Comment>
					))
				) : (
					<EmptyScreen message="Não existe histórico a ser exibido até o momento" />
				)}
			</ContentBox>
		</Container>
	);
};

export default History;
