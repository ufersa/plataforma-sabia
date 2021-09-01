describe('technology details', () => {
	let technology;

	before(() => {
		cy.request('GET', 'http://localhost:3334/technologies?embed', {
			perPage: 1,
		}).then((response) => {
			cy.expect(response.status).to.equal(200);
			technology = response.body[0];
		});
	});

	it('should list details', () => {
		Cypress.on('uncaught:exception', () => false);

		cy.signIn({ redirectTo: `/t/${technology.slug}` });

		cy.findAllByText(new RegExp(technology.title, 'i')).should('exist');
		cy.findAllByText(new RegExp(technology.description, 'im')).should('exist');

		if (technology.attachments?.images?.length > 0) {
			cy.findByRole('listbox')
				.find('img')
				.first()
				.should('have.attr', 'src')
				.should('include', technology.attachments.images[0].url);
		}

		/**
		 * Tabs
		 */
		cy.findByTestId('description')
			.should('exist')
			.click();

		cy.findAllByText(/onde é a aplicação/i).should('be.visible');
		cy.findAllByText(/objetivo principal/i).should('be.visible');
		cy.findAllByText(/problemas que a tecnologia soluciona/i).should('be.visible');
		cy.findAllByText(/contribuição para o semiárido/i).should('be.visible');
		cy.findAllByText(/riscos associados à tecnologia/i).should('be.visible');

		cy.findByTestId('review')
			.should('exist')
			.click();

		cy.findByTestId('costs')
			.should('exist')
			.click();

		cy.findAllByText(/custos da tecnologia/i).should('be.visible');
		cy.findAllByText(/custos de implantação/i).should('be.visible');
		cy.findAllByText(/custos de manutenção/i).should('be.visible');

		cy.findByTestId('attachments')
			.should('exist')
			.click();

		cy.findAllByText(/fotos/i).should('be.visible');
		cy.findAllByText(/documentos/i).should('be.visible');

		cy.findByTestId('geolocation')
			.should('exist')
			.click();

		cy.findAllByText(/aplicada/i).should('be.visible');
		cy.findAllByText(/desenvolvida/i).should('be.visible');
		cy.findAllByText(/implementada/i).should('be.visible');
	});

	it('should see costs tables only when user is logged in', () => {
		cy.visit(`/t/${technology.slug}`);

		cy.findAllByText(/custos e financiamento/i)
			.should('exist')
			.click();

		cy.findAllByText(/custos da tecnologia/i).should('be.visible');

		cy.findAllByText(/custos de implantação/i).should('not.exist');
		cy.findAllByText(/custos de manutenção/i).should('not.exist');

		cy.findAllByText(/^(entrar|sign in)$/i).should('be.visible');

		cy.signIn({ inline: true });

		cy.findAllByText(/custos de implantação/i).should('be.visible');
		cy.findAllByText(/custos de manutenção/i).should('be.visible');
	});

	it('should redirect to the error page when the technology is not found', () => {
		const unknownTechnology = 'a';

		cy.visit(`/t/${unknownTechnology}`, {
			failOnStatusCode: false,
		});
		cy.url().should('match', /_error.js/);
		cy.findAllByText('404').should('exist');
	});

	describe('add review', () => {
		beforeEach(() => {
			cy.signIn({ redirectTo: `/t/${technology.slug}` });

			cy.findAllByText(/avaliação/i)
				.should('exist')
				.click();

			cy.findAllByRole('button', { name: /adicionar tecnologia/i })
				.should('exist')
				.click();
		});

		it('should close modal when user does not have the technology', () => {
			cy.findAllByText(/ainda não/i)
				.should('be.visible')
				.click();

			cy.findAllByText(/entendi/i)
				.should('be.visible')
				.click();

			cy.findAllByText(/você já tem essa tecnologia/i).should('not.exist');
			cy.findAllByText(/espere um pouco/i).should('not.exist');
		});

		it('should add a new technology review', () => {
			const data = {
				content: 'any content',
				positive: ['any text', 'another text'],
				negative: 'any text',
			};
			const modalTitle = /Como foi sua experiência com essa tecnologia?/;

			cy.findAllByText(/sim, já tenho/i)
				.should('be.visible')
				.click();

			cy.findAllByText(modalTitle).should('be.visible');

			cy.get('form textarea[name=content]').type(data.content);

			// Add positives and negatives
			cy.get('form [id="input-Quais pontos positivos?"]').as('positive-input');
			cy.get('form [id="input-Quais pontos negativos?"]').as('negative-input');

			cy.get('@positive-input').type(data.positive[0]);
			cy.get('@negative-input').type(data.negative);

			cy.findAllByText(/adicionar/i).as('adicionar');
			cy.get('@adicionar').click({ multiple: true });

			// Add and remove a positive point
			cy.get('@positive-input').type(data.positive[1]);
			cy.get('@adicionar')
				.first()
				.click();
			cy.findAllByText(/remover/i)
				.first()
				.click();

			// Rating
			cy.get('div[aria-label="Avaliação"]')
				.find('svg:first')
				.click();

			// Submit
			cy.findAllByText(/registrar avaliação/i)
				.should('be.visible')
				.click();

			cy.findAllByText(/avaliação cadastrada com sucesso/i).should('be.visible');
			cy.findAllByText(modalTitle).should('not.exist');
		});
	});

	it('should not be able to add new question when user is logged out', () => {
		cy.visit(`/t/${technology.slug}`);

		cy.findAllByText(/perguntas e respostas/i)
			.should('exist')
			.click();

		cy.findAllByText(/perguntas e respostas/i).should('be.visible');

		cy.findByRole('textbox', { name: /pergunte ao pesquisador/i }).should('not.exist');
		cy.findByRole('button', { name: /enviar pergunta/i }).should('not.exist');
	});

	describe('new question', () => {
		beforeEach(() => {
			cy.signIn({ redirectTo: `/t/${technology.slug}` });

			cy.findAllByText(/perguntas e respostas/i)
				.should('exist')
				.click();
		});

		it('should be able to create new question', () => {
			cy.findAllByText(/perguntas e respostas/i).should('be.visible');
			cy.findByRole('textbox', { name: /pergunte ao pesquisador/i })
				.should('exist')
				.type('some question');
			cy.findByRole('button', { name: /enviar pergunta/i })
				.should('exist')
				.click();

			cy.findAllByText(/pergunta enviada com sucesso/i).should('be.visible');
		});

		it('should not create a new question when input is empty', () => {
			cy.findAllByText(/perguntas e respostas/i).should('be.visible');
			cy.findByRole('textbox', { name: /pergunte ao pesquisador/i }).should('exist');
			cy.findByRole('button', { name: /enviar pergunta/i })
				.should('exist')
				.click();

			cy.findAllByText(/houve um erro ao enviar sua pergunta/i).should('be.visible');
		});
	});
});
