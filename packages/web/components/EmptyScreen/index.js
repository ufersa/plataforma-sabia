import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

import { RectangularButton } from '../Button';
import { internal as internalPages } from '../../utils/consts/pages';
import * as S from './styles';

const EmptyScreen = ({ message, showHomeButton }) => {
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

			{showHomeButton && (
				<Link href={internalPages.home} passHref>
					<RectangularButton as="a" colorVariant="green">
						Voltar para o início
					</RectangularButton>
				</Link>
			)}
		</S.Container>
	);
};

EmptyScreen.propTypes = {
	message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	showHomeButton: PropTypes.bool,
};

EmptyScreen.defaultProps = {
	message: 'Não existem dados a serem exibidos até o momento',
	showHomeButton: false,
};

export default EmptyScreen;
