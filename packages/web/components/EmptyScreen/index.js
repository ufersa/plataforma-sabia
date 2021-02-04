import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import * as S from './styles';

const EmptyScreen = ({ message }) => {
	return (
		<S.Container>
			<S.ImageWrapper>
				<Image
					src="/empty-rafiki.svg"
					layout="responsive"
					width={360}
					height={360}
					alt="Ilustração de um rapaz despejando uma caixa aberta em outra caixa"
				/>
			</S.ImageWrapper>

			<S.Message>{message}</S.Message>
		</S.Container>
	);
};

EmptyScreen.propTypes = {
	message: PropTypes.string,
};

EmptyScreen.defaultProps = {
	message: 'Não existem dados a serem exibidos até o momento',
};

export default EmptyScreen;
