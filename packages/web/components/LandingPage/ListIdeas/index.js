import React from 'react';

import Card from '../Card';

import * as S from './styles';

const ListIdeas = () => {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Top>
					<S.Title>Banco de ideias</S.Title>
				</S.Top>
				<S.Content>
					<Card
						title="Poço artesiano"
						description="Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus."
						keywords={['Água', 'Fata de água', 'Seca']}
					/>
					<Card
						title="Poço artesiano"
						description="Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Quisque velit nisi, pretium ut lacinia in, elementum id enim."
						keywords={['Água', 'Fata de água', 'Seca']}
					/>
					<Card
						title="Poço artesiano"
						description="Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta."
						keywords={['Água', 'Fata de água', 'Seca']}
					/>
				</S.Content>
				<S.Button onClick={() => console.log('Load more ideas.')}>Ver mais ideias</S.Button>
			</S.Container>
		</S.Wrapper>
	);
};

export default ListIdeas;
