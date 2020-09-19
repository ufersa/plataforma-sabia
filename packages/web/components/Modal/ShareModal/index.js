import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '../../Toast';
import {
	Container,
	IconsWrapper,
	IconButton,
	CopyIcon,
	LocationInput,
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	WhatsAppIcon,
} from './styles';

const externalServices = {
	facebook: {
		url: 'https://facebook.com/sharer/sharer.php?u=:url',
		icon: FacebookIcon,
	},
	twitter: {
		url: `https://twitter.com/intent/tweet?url=:url`,
		icon: TwitterIcon,
	},
	linkedin: {
		url: 'https://www.linkedin.com/sharing/share-offsite/?url=:url',
		icon: LinkedinIcon,
	},
	whatsapp: {
		url: 'https://api.whatsapp.com/send?text=:url',
		icon: WhatsAppIcon,
	},
};

const handleSocialShare = (service) => {
	const pageUrl = encodeURIComponent(window.location.href);
	const serviceUrl = externalServices[service].url.replace(':url', pageUrl);
	window.open(serviceUrl, '_blank');
};

const ShareModal = () => {
	const { t } = useTranslation(['common']);
	const currentUrlRef = useRef(null);

	const handleCopyToClipboard = useCallback(() => {
		currentUrlRef.current.select();
		document.execCommand('copy');
		toast.success(t('common:copiedToClipboard'));
	}, [t]);

	return (
		<Container>
			<h3>{t('common:shareTechnology')}</h3>

			<IconsWrapper>
				{Object.keys(externalServices).map((service) => {
					const IconComponent = externalServices[service].icon;

					return (
						<IconButton key={service} onClick={() => handleSocialShare(service)}>
							<IconComponent />
						</IconButton>
					);
				})}

				<IconButton onClick={handleCopyToClipboard}>
					<CopyIcon />
				</IconButton>
			</IconsWrapper>

			<LocationInput value={window.location.href} ref={currentUrlRef} />
		</Container>
	);
};

export default ShareModal;
