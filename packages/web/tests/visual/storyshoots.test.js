import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({
	suite: 'Visual Regression',
	test: imageSnapshot({
		storybookUrl: 'http://localhost:9009',
		beforeScreenshot: () => new Promise((resolve) => setTimeout(() => resolve(), 300)),
		getScreenshotOptions: () => ({
			encoding: 'base64',
		}),
		getMatchOptions: () => ({
			failureThreshold: 0.05,
			failureThresholdType: 'percent',
		}),
	}),
});
