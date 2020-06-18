import React from 'react';
import { render } from 'test-utils';
import { SafeHtml } from '..';

const renderedText = 'hello';

describe('SafeHtml component', () => {
	it('should sanitize and parse a dirty html string', () => {
		const dirtyHTML = `<TABLE><tr><td>${renderedText}</tr></TABL>`;

		const { container } = render(<SafeHtml html={dirtyHTML} />);

		expect(container.textContent).toStrictEqual(renderedText);
	});

	it('should allow passed tags and attributes', () => {
		const dirtyHTML = `<p style="color:red;">${renderedText}<iframe//src=jAva&Tab;script:alert(3)></p>`;

		const config = {
			ALLOWED_TAGS: ['p'],
			ALLOWED_ATTR: ['style'],
		};

		const { container } = render(
			<SafeHtml
				html={dirtyHTML}
				allowedTags={config.ALLOWED_TAGS}
				allowedAttrs={config.ALLOWED_ATTR}
			/>,
		);

		expect(container).toMatchSnapshot();
	});

	it('should not allow unpassed tags and attributes', () => {
		const dirtyHTML = `<p style="color: red;">${renderedText}<iframe//src=jAva&Tab;script:alert(3)></p>`;

		const config = {
			ALLOWED_TAGS: ['img'],
			ALLOWED_ATTR: ['src'],
		};

		const { container } = render(
			<SafeHtml
				html={dirtyHTML}
				allowedTags={config.ALLOWED_TAGS}
				allowedAttrs={config.ALLOWED_ATTR}
			/>,
		);

		expect(container).toMatchSnapshot();
	});

	it('should return html with an custom container', () => {
		const dirtyHTML = `<span id="testing">${renderedText}</span>`;

		const { container } = render(<SafeHtml html={dirtyHTML} as="h1" />);

		expect(container).toMatchSnapshot();
	});
});
