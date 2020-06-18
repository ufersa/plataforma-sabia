import React from 'react';
import { render } from 'test-utils';
import { SafeHtml } from '..';

const renderText = 'hello';

describe('SafeHtml component', () => {
	it('should sanitize and parse a dirty html string', () => {
		const dirtyHTML = `<TABLE><tr><td>${renderText}</tr></TABL>`;

		const { container } = render(<SafeHtml html={dirtyHTML} />);

		expect(container.textContent).toStrictEqual(renderText);
	});

	it('should allow passed tags and attributes', () => {
		const dirtyHTML = `<p style="color:red;">${renderText}<iframe//src=jAva&Tab;script:alert(3)></p>`;

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
		const dirtyHTML = `<section><img src="${renderText}" id="xss" onerror=alert(1)//></section>`;

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
		const dirtyHTML = `<TABLE><tr><td>${renderText}</tr></TABL>`;

		const { container } = render(<SafeHtml html={dirtyHTML} as="h1" />);

		expect(container).toMatchSnapshot();
	});
});
