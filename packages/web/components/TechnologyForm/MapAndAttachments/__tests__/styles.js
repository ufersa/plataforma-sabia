import React from 'react';
import { render, screen } from 'test-utils';
import { VideosWrapper, VideoItem } from '../styles';

const video = {
	thumbnail: 'http://i3.ytimg.com/vi/8h7p88oySWY/hqdefault.jpg',
	videoId: '8h7p88oySWY',
};

test('it render the <VideosWrapper /> component', () => {
	const { container } = render(<VideosWrapper />);

	expect(container).toMatchSnapshot();
});

test('it render the <VideoItem /> component', async () => {
	const { container } = render(
		<VideoItem>
			<a href={`//www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noreferrer">
				<img src={video.thumbnail} alt={`Youtube vídeo ${video.videoId}`} />
			</a>
		</VideoItem>,
	);

	expect(screen.getByRole('img', { src: video.thumbnail })).toBeInTheDocument();
	expect(container).toMatchSnapshot();
});
