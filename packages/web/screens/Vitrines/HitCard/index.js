import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FiInbox, FiTool } from 'react-icons/fi';
import { CardTitle } from '../../../components/Common';

import * as S from './styles';

const HitCard = ({ hit: { initials, name, __meta__ } }) => {
	const { t } = useTranslation(['common']);

	return (
		<Link href={`/vitrine/${initials}`} passHref>
			<S.Container>
				<S.Info>
					<img src="/card-image.jpg" alt="Institution logo" />

					<S.Name>
						<CardTitle>{initials}</CardTitle>
						<span>{name}</span>
					</S.Name>
				</S.Info>

				<S.SolutionsCount>
					{!!__meta__.technologies_count && (
						<div>
							<FiInbox fontSize={19} />
							<span>
								{t('common:technologyCounter', {
									count: __meta__.technologies_count,
								})}
							</span>
						</div>
					)}
					{!!__meta__.services_count && (
						<div>
							<FiTool fontSize={19} />
							<span>
								{t('common:serviceCounter', { count: __meta__.services_count })}
							</span>
						</div>
					)}
				</S.SolutionsCount>
			</S.Container>
		</Link>
	);
};

HitCard.propTypes = {
	hit: PropTypes.shape({
		initials: PropTypes.string,
		name: PropTypes.string,
		__meta__: PropTypes.shape({
			technologies_count: PropTypes.number,
			services_count: PropTypes.number,
		}),
	}).isRequired,
};

export default HitCard;
