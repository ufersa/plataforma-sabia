import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({
	suite: 'Visual Regression',
	test: imageSnapshot({
		storybookUrl: 'http://localhost:9009',
		getScreenshotOptions: () => ({
			encoding: 'base64',
		}),
	}),
});
