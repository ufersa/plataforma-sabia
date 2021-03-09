/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render, screen } from 'test-utils';

import EmptyScreen from '..';

jest.mock('next/image', () => {
	return {
		__esModule: true,
		// eslint-disable-next-line jsx-a11y/alt-text
		default: (props) => <img {...props} />,
	};
});

describe('<EmptyScreen />', () => {
	it('should render correctly', () => {
		const { container } = render(<EmptyScreen />);

		expect(container.firstChild).toMatchInlineSnapshot(`
		.c0 {
		  display: -webkit-box;
		  display: -webkit-flex;
		  display: -ms-flexbox;
		  display: flex;
		  -webkit-flex-flow: column wrap;
		  -ms-flex-flow: column wrap;
		  flex-flow: column wrap;
		  -webkit-align-items: center;
		  -webkit-box-align: center;
		  -ms-flex-align: center;
		  align-items: center;
		  -webkit-box-pack: center;
		  -webkit-justify-content: center;
		  -ms-flex-pack: center;
		  justify-content: center;
		  height: 100%;
		}

		.c1 {
		  width: 100%;
		  max-width: 36rem;
		}

		.c2 {
		  font-size: 1.6rem;
		  font-weight: 500;
		  line-height: 2.4rem;
		  color: hsla(0,0%,52%);
		  text-align: center;
		  margin-bottom: 1.2rem;
		}

		<section
		  class="c0"
		>
		  <div
		    class="c1"
		  >
		    <img
		      alt="Ilustração de um rapaz despejando uma caixa aberta em outra caixa"
		      height="360"
		      layout="responsive"
		      src="/empty-rafiki.svg"
		      width="360"
		    />
		  </div>
		  <div
		    class="c2"
		  >
		    Não existem dados a serem exibidos até o momento
		  </div>
		</section>
	`);
	});

	it('should render an image and a default message', () => {
		render(<EmptyScreen />);

		expect(screen.getByRole('img')).toBeInTheDocument();
		expect(
			screen.getByText(/não existem dados a serem exibidos até o momento/i),
		).toBeInTheDocument();
	});

	it('should render a custom message', () => {
		render(<EmptyScreen message="Custom message" />);

		expect(screen.getByText(/custom message/i)).toBeInTheDocument();
	});
});
