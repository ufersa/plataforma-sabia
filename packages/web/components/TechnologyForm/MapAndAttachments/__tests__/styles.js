import React from 'react';
import { render, screen } from 'test-utils';
import {
	ButtonVideoAdd,
	VideoContainer,
	VideosWrapper,
	VideoItem,
	RemoveVideoButton,
} from '../styles';

const video = {
	thumbnail: 'http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg',
	videoId: '8h7p88oySWY',
};

const onAdd = jest.fn(() => {});
const onRemove = jest.fn(() => {});

test('it render the <VideoContainer /> component', () => {
	const { container } = render(<VideoContainer />);

	expect(container).toMatchSnapshot();
});

test('it render the <VideosWrapper /> component', () => {
	const { container } = render(<VideosWrapper />);

	expect(container).toMatchSnapshot();
});

test('it render the <ButtonVideoAdd /> component', () => {
	const { container } = render(
		<ButtonVideoAdd type="button" variant="secondary" onClick={onAdd}>
			Adicionar
		</ButtonVideoAdd>,
	);

	expect(screen.getByRole('button', { name: /adicionar/i })).toBeEnabled();
	expect(container).toMatchSnapshot();
});

test('it render the <VideoItem /> component', async () => {
	const { container } = render(
		<VideoItem>
			<a href={`//www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer">
				<img src={video.thumbnail} alt={`Youtube vídeo ${video.videoId}`} />
			</a>
			<RemoveVideoButton type="button" onClick={onRemove}>
				Remover
			</RemoveVideoButton>
		</VideoItem>,
	);

	expect(screen.getByRole('img', { src: video.thumbnail })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /remover/i })).toBeEnabled();
	expect(container).toMatchSnapshot();
});
