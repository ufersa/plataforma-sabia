import React from 'react';
import PropTypes from 'prop-types';
import cookies from 'next-cookies';
import { ContentContainer, Title } from '../../../components/Common';
import { Protected } from '../../../components/Authorization';
import { useTheme } from '../../../hooks';
import { getUserTechnologies } from '../../../services';

const MyAccount = ({ technologies }) => {
	const { colors } = useTheme();
	return (
		<ContentContainer bgColor={colors.gray98}>
			<Protected>
				<Title align="left" noPadding noMargin>
					Minhas Tecnologias
				</Title>
				{technologies.length > 0 ? (
					JSON.stringify(technologies)
				) : (
					<div>Você não possui nenhuma tecnologia no momento</div>
				)}
			</Protected>
		</ContentContainer>
	);
};

MyAccount.propTypes = {
	technologies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

MyAccount.getInitialProps = async (ctx) => {
	const { token } = cookies(ctx);

	const technologies = token ? await getUserTechnologies(token) : [];

	return {
		technologies,
	};
};

export default MyAccount;
