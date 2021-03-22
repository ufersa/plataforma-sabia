const data = {
	pages: {
		home: '/',
		shoppingCart: '/shopping-cart',
		createService: '/service/new',
		myServices: '/user/my-account/my-services',
	},
};

const addServiceData = [
	{
		buttonLabel: 'finalize',
		buttonSelector: /finalizar cadastro/i,
	},
	{
		buttonLabel: 'add new service',
		buttonSelector: /adicionar novo serviço/i,
	},
];

describe('services', () => {
	it('should list the same services as the api', () => {
		cy.visit(data.pages.home);
		const servicesFromDom = [];

		cy.findAllByTestId('cards-wrapper')
			.eq(1)
			.within(() => {
				cy.get('[data-testid="card-title"]').then((servicesTitle) =>
					servicesTitle.map((index, serviceTitle) => {
						servicesFromDom[index] = serviceTitle.innerText;
						return true;
					}),
				);

				cy.request('GET', 'http://localhost:3334/services', {
					embed: true,
					perPage: 4,
					orderBy: 'likes',
					order: 'DESC',
				}).then((services) => {
					const servicesFromJson = services.body.map((service) => service.name);

					cy.expect(services.status).to.equal(200);

					cy.expect([...servicesFromJson]).to.deep.equal(servicesFromDom);
				});
			});
	});

	it('should be able to like or dislike a service', () => {
		cy.authenticate().visit(data.pages.home);

		cy.findByText(/serviços em destaque/i)
			.siblings()
			.findAllByTestId('card-heart')
			.first()
			.as('serviceLikes');

		cy.get('@serviceLikes').then((serviceLikes) => {
			const initialLikes = Number(serviceLikes.text());
			cy.wrap(serviceLikes).click();

			cy.get('@serviceLikes').should((newCounter) => {
				const currentLikes = Number(newCounter.text());

				expect(currentLikes).to.be.oneOf([initialLikes + 1, initialLikes - 1]);
				expect(currentLikes).to.not.equal(initialLikes);
			});
		});
	});

	it('should be able to add and remove a service from shopping cart', () => {
		cy.visit(data.pages.home);

		cy.findByText(/serviços em destaque/i)
			.siblings()
			.children()
			.first()
			.as('serviceCard');

		cy.get('@serviceCard')
			.find('h3')
			.then((serviceTitleEl) => {
				const serviceTitle = serviceTitleEl.text();
				cy.get('@serviceCard')
					.findByRole('button', { name: /adicionar ao carrinho/i })
					.click();

				cy.visit(data.pages.shoppingCart);

				cy.findByText(serviceTitle).should('exist');

				cy.findByRole('button', { name: /remover/i }).click();

				cy.findByText(serviceTitle).should('not.exist');
			});
	});

	it('should not be able to create a service when user is logged out', () => {
		cy.visit(data.pages.createService);

		cy.findByTranslation('error:notAuthorized');
		cy.findAllByText(/^(entrar|sign in)$/i).should('be.visible');
	});

	addServiceData.forEach((serviceData) => {
		it(`should not be able to create a service with required fields empty by clicking ${serviceData.buttonLabel} button`, () => {
			cy.authenticate().visit(data.pages.createService);
			cy.findByRole('button', { name: serviceData.buttonSelector }).click();
			cy.findAllByText(/este campo é obrigatório/i).should('have.length', 6);
		});
	});

	it('should be able to create a service and be redirected to home when clicking in finalize button', () => {
		cy.authenticate().visit(data.pages.createService);

		cy.fixture('service.json').then((service) => {
			cy.inputType({ name: 'name' }, service.name);
			cy.select('keywords');
			cy.inputType('textarea[name="description"]', service.description);
			cy.select('measure_unit');
			cy.inputType({ name: 'price' }, service.price);
			cy.select('type');
			cy.findByRole('button', { name: /editar mensagem/i }).click();
			cy.inputType({ contenteditable: 'true' }, service.payment_message);
			cy.findByRole('button', { name: /fechar/i }).click();
			cy.findByText(service.payment_message).should('exist');

			const toastMessage = /serviço criado com sucesso/i;
			cy.findByRole('button', { name: /finalizar cadastro/i }).click();
			cy.findByText(toastMessage).should('exist');
		});
	});

	it('should be able to create more than one service and delete them', () => {
		cy.authenticate().visit(data.pages.createService);

		cy.fixture('service.json').then((service) => {
			cy.inputType({ name: 'name' }, service.name);
			cy.select('keywords');
			cy.inputType('textarea[name="description"]', service.description);
			cy.select('measure_unit');
			cy.inputType({ name: 'price' }, service.price);
			cy.select('type');
			cy.findByRole('button', { name: /editar mensagem/i }).click();
			cy.inputType({ contenteditable: 'true' }, service.payment_message);
			cy.findByRole('button', { name: /fechar/i }).click();
			cy.findByText(service.payment_message).should('exist');

			cy.findByRole('button', { name: /adicionar novo serviço/i }).click();
			const toastMessage = /serviço criado com sucesso/i;
			cy.findByText(toastMessage).should('be.visible');

			cy.findByRole('heading', { name: /^Serviços$/i })
				.parent()
				.then((servicesCard) => {
					cy.wrap(servicesCard)
						.findByText(service.name)
						.should('be.visible');

					cy.wrap(servicesCard)
						.findByRole('button', { name: /remover/i })
						.click();

					const toastRemoveMessage = /serviço deletado com sucesso/i;
					cy.findByText(toastRemoveMessage).should('not.be.visible');

					cy.wrap(servicesCard)
						.findByText(service.name)
						.should('not.exist');
				});
		});
	});

	it('should be able to edit a service', () => {
		cy.intercept('GET', '/terms').as('getKeywords');

		cy.authenticate().visit(data.pages.myServices);

		cy.wait('@getKeywords')
			.its('response.statusCode')
			.should('eq', 200);

		// Assert user can open edit modal and just hit save button
		cy.findAllByRole('button', { name: /edit service/i })
			.first()
			.click();
		cy.findByRole('button', { name: /editar serviço/i }).click();
		cy.findByText(/serviço atualizado com sucesso/i).should('be.visible');

		cy.findAllByRole('button', { name: /edit service/i })
			.first()
			.click();

		cy.inputType({ name: 'name' }, 'Service Name');
		cy.select('keywords');
		cy.inputType('textarea[name="description"]', 'Service Description');
		cy.select('measure_unit');
		cy.inputType({ name: 'price' }, '12345');
		cy.select('type');

		cy.findByRole('button', { name: /editar serviço/i }).click();

		cy.findByText(/serviço atualizado com sucesso/i).should('be.visible');
	});

	it('should be able to deactivate and activate a service', () => {
		cy.intercept('PUT', '/services/*/active').as('toggleServiceActive');
		cy.authenticate().visit(data.pages.myServices);

		cy.get('#active-1')
			.next()
			.children()
			.then((switchLabel) => {
				const actualStatus = switchLabel.text().toLowerCase();
				const nextStatus = actualStatus === 'sim' ? 'não' : 'sim';

				cy.wrap(switchLabel).click();

				cy.wait('@toggleServiceActive')
					.its('response.statusCode')
					.should('eq', 204);

				cy.wrap(switchLabel)
					.findByText(new RegExp(nextStatus, 'i'))
					.should('be.visible');

				cy.wrap(switchLabel).click();

				cy.wait('@toggleServiceActive')
					.its('response.statusCode')
					.should('eq', 204);

				cy.wrap(switchLabel)
					.findByText(new RegExp(actualStatus, 'i'))
					.should('be.visible');
			});
	});
});
