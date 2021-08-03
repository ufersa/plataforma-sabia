import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { FiInbox, FiTool } from 'react-icons/fi';
import { CardTitle } from '../../../components/Common';
import { internal as internalPages } from '../../../utils/consts/pages';

import * as S from './styles';

const HitCard = ({ hit: { initials, name, logo, slug, __meta__ } }) => {
	const { t } = useTranslation(['common']);

	return (
		<Link href={internalPages.institutionShowcase.replace(':institution', slug)} passHref>
			<S.Container>
				<S.Info>
					<img src={logo?.url || '/add-to-cart-rafiki.svg'} alt="Institution logo" />

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
		logo: {
			url: PropTypes.string,
		},
		slug: PropTypes.string,
		__meta__: PropTypes.shape({
			technologies_count: PropTypes.number,
			services_count: PropTypes.number,
		}),
	}).isRequired,
};

export default HitCard;
