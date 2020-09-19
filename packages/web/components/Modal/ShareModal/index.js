import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	Container,
	IconsWrapper,
	IconButton,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	WhatsAppIcon,
} from './styles';

const externalServices = {
	facebook: {
		url: 'https://facebook.com/sharer/sharer.php?u=:technology-url',
		icon: FacebookIcon,
	},
	twitter: {
		url: `https://twitter.com/intent/tweet?url=:technology-url`,
		icon: TwitterIcon,
	},
	linkedin: {
		url: 'https://www.linkedin.com/sharing/share-offsite/?url=:technology-url',
		icon: LinkedinIcon,
	},
	whatsapp: {
		url: 'https://api.whatsapp.com/send?text=:technology-url',
		icon: WhatsAppIcon,
	},
};

const handleShare = (service) => {
	const pageUrl = encodeURIComponent(window.location.href);
	const pageTitle = encodeURIComponent(document.title);
	const serviceUrl = externalServices[service].url
		.replace(':technology-url', pageUrl)
		.replace(':technology-title', pageTitle);
	window.open(serviceUrl, '_blank');
	return true;
};

const ShareModal = () => {
	const { t } = useTranslation(['common']);

	return (
		<Container>
			<h3>{t('common:shareTechnology')}</h3>

			<IconsWrapper>
				{Object.keys(externalServices).map((service) => {
					const IconComponent = externalServices[service].icon;

					return (
						<IconButton key={service} onClick={() => handleShare(service)}>
							<IconComponent />
						</IconButton>
					);
				})}
			</IconsWrapper>
		</Container>
	);
};

export default ShareModal;
