import React, { useCallback, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
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

const socialNetworks = {
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

const ShareModal = () => {
	const { t } = useTranslation(['common']);
	const pageUrlRef = useRef(null);

	const handleSocialShare = useCallback((service) => {
		const pageUrl = encodeURIComponent(pageUrlRef.current.value);
		const serviceUrl = socialNetworks[service].url.replace(':url', pageUrl);
		window.open(serviceUrl, '_blank', 'noopener');
	}, []);

	const handleCopyToClipboard = useCallback(() => {
		pageUrlRef.current.select();
		document.execCommand('copy');
		toast.success(t('common:copiedToClipboard'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container>
			<h3>{t('common:shareTechnology')}</h3>

			<IconsWrapper>
				{Object.keys(socialNetworks).map((service) => {
					const SocialIcon = socialNetworks[service].icon;
					return (
						<IconButton
							aria-label={service}
							key={service}
							onClick={() => handleSocialShare(service)}
						>
							<SocialIcon />
						</IconButton>
					);
				})}

				<IconButton aria-label="clipboard" onClick={handleCopyToClipboard}>
					<CopyIcon />
				</IconButton>
			</IconsWrapper>

			<LocationInput value={window.location.href} ref={pageUrlRef} />
		</Container>
	);
};

export default ShareModal;
