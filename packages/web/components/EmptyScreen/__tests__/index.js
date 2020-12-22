import React from 'react';
import { render, screen } from 'test-utils';

import EmptyScreen from '..';

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

		.c1 > img {
		  max-width: 100%;
		}

		.c2 {
		  font-size: 1.6rem;
		  font-weight: 500;
		  line-height: 2.4rem;
		  color: hsla(0,0%,52%);
		  text-align: center;
		}

		<section
		  class="c0"
		>
		  <div
		    class="c1"
		  >
		    <img
		      alt="Ilustração de um rapaz despejando uma caixa aberta em outra caixa"
		      src="/empty-rafiki.svg"
		    />
		  </div>
		  <p
		    class="c2"
		  >
		    Não existem dados a serem exibidos até o momento
		  </p>
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
