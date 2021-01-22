import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useModal } from '../../../hooks';

const Container = styled.section`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

const Video = styled.section`
	${({ theme: { colors, screens } }) => css`
		width: 316px;
		display: flex;
		flex-direction: column;
		margin: 0 8px 16px;

		button {
			border: none;
			display: block;
			padding: 0;
			margin-bottom: 10px;

			&:hover {
				opacity: 0.7;
			}

			&:focus {
				box-shadow: 0px 0px 4px 2px ${colors.primary};
			}
		}

		img {
			background: ${colors.lightGray2};
			width: 100%;
			display: block;
		}

		@media (max-width: ${screens.large}px) {
			width: 100%;
		}
	`}
`;

const Videos = ({ data }) => {
	const { openModal } = useModal();

	return (
		<Container>
			{data.map(({ videoId, thumbnail }) => (
				<Video key={`video_${videoId}`}>
					<button
						type="button"
						onClick={() =>
							openModal(
								'iframe',
								{
									src: `https://youtube.com/embed/${videoId}`,
									title: `Youtube Video ${videoId}`,
									frameBorder: 0,
									allow:
										'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
									allowFullScreen: true,
								},
								{ customModal: true },
							)
						}
					>
						<img src={thumbnail} alt={`Youtube vídeo ${videoId}`} />
					</button>
				</Video>
			))}
		</Container>
	);
};

Videos.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Videos;
