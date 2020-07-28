describe('technology form validation', () => {
	beforeEach(() => {
		cy.authenticate().visit('/technology/new');
	});

	it('step 1 - must fill required fields', () => {
		cy.get('input[name=title]').type('Minha tecnologia');
		cy.get('textarea[name=description]').type('Descrição da tecnologia');
		cy.findByText(/salvar e continuar/i).click();
		cy.findAllByText(/este campo é obrigatório/i).should('exist');
	});

	it('step 1 - selecting a category renders subcategories', () => {
		cy.findByText(/escolha uma categoria primeiro/i).should('exist');
		cy.select('terms.category', { exactMatch: true });

		cy.findByText(/escolha uma categoria primeiro/i).should('not.exist');
		cy.findByText(/escolha a sub categoria/i).should('exist');
	});
});

describe('creating/editing technology', () => {
	beforeEach(() => {
		cy.authenticate().visit('/technology/new');
	});

	it('redirects /technology/new if technology does not exist or does not belong to user', () => {
		cy.visit('/technology/9999/edit');
		cy.url().should('include', 'technology/new');
	});

	it('filling all fields creates an technology', () => {
		cy.fixture('technology.json').then((technologyData) => {
			cy.get('input[name=title]').type(technologyData.title);
			cy.get('textarea[name=description]').type(technologyData.description);

			cy.get('label[for=patent]').click();
			cy.select('target_audience');
			cy.select('biome');
			cy.select('government_program');

			// selecting two ketworks
			cy.select('keywords');
			cy.select('keywords');

			cy.select('stage');
			cy.select('intellectual_property');
			cy.select('classification');
			cy.select('dimension');
			cy.select('terms.category', { exactMatch: true });
			cy.findByText(/escolha uma categoria primeiro/i).should('not.exist');
			cy.select('subcategory');

			cy.findByText(/salvar e continuar/i).click();
			cy.url().should('include', 'edit');
			cy.url().should('include', 'technology');

			cy.get('[name=primary_purpose]').type(technologyData.primary_purpose);
			cy.get('[name=secondary_purpose]').type(technologyData.secondary_purpose);
			cy.get('[name=application_mode]').type(technologyData.application_mode);
			cy.get('[name=installation_time]').type(technologyData.installation_time);
			cy.get('[name=solves_problem]').type(technologyData.solves_problem);
			cy.get('[name=entailes_problem]').type(technologyData.entailes_problem);
			cy.get('[name=requirements]').type(technologyData.requirements);
			cy.get('[name=risks]').type(technologyData.risks);
			cy.get('[name=contribution]').type(technologyData.contribution);

			cy.findByText(/salvar e continuar/i).click();

			cy.get('[name="technologyCosts.costs.development_costs_add_button"]').click();
			cy.get('[name="technologyCosts.costs.development_costs[0]_remove_button"').should(
				'exist',
			);

			cy.get('[name="technologyCosts.costs.development_costs[0].description"]').type(
				'coolest description',
			);
			cy.get('[name="technologyCosts.costs.development_costs[0].quantity"]').type('2');
			cy.get('[name="technologyCosts.costs.development_costs[0].value"]').type('20');
			cy.select('technologyCosts.costs.development_costs[0].type');
			cy.findAllByText(/40\.00/i).should('exist');

			cy.get('[name="technologyCosts.costs.development_costs_add_button"]').click();
			cy.get('[name="technologyCosts.costs.development_costs[1]_remove_button"').should(
				'exist',
			);

			cy.get('[name="technologyCosts.costs.development_costs[1].description"]').type(
				'coolest description',
			);
			cy.get('[name="technologyCosts.costs.development_costs[1].quantity"]').type('3');
			cy.get('[name="technologyCosts.costs.development_costs[1].value"]').type('7');
			cy.select('technologyCosts.costs.development_costs[1].type');
			cy.findAllByText(/21\.00/i).should('exist');
			cy.findAllByText(/61\.00/i).should('exist');

			cy.get('[name="technologyCosts.costs.implementation_costs_add_button"]').click();
			cy.get('[name="technologyCosts.costs.implementation_costs[0]_remove_button"').should(
				'exist',
			);

			cy.get('[name="technologyCosts.costs.implementation_costs[0].description"]').type(
				'coolest description 2',
			);
			cy.get('[name="technologyCosts.costs.implementation_costs[0].quantity"]').type('1');
			cy.get('[name="technologyCosts.costs.implementation_costs[0].value"]').type('15');
			cy.select('technologyCosts.costs.implementation_costs[0].type');
			cy.findAllByText(/15\.00/i).should('exist');

			cy.get('[name="technologyCosts.costs.maintenence_costs_add_button"]').click();
			cy.get('[name="technologyCosts.costs.maintenence_costs[0]_remove_button"').should(
				'exist',
			);

			cy.get('[name="technologyCosts.costs.maintenence_costs[0].description"]').type(
				'coolest description 3',
			);
			cy.get('[name="technologyCosts.costs.maintenence_costs[0].quantity"]').type('3');
			cy.get('[name="technologyCosts.costs.maintenence_costs[0].value"]').type('45');
			cy.select('technologyCosts.costs.maintenence_costs[0].type');
			cy.findAllByText(/135\.00/i).should('exist');

			cy.get('label[for="technologyCosts.funding_required"]').click();
			cy.select('funding_type');
			cy.get('[name="technologyCosts.funding_value"]').type('15000');
			cy.select('funding_status');

			cy.findByText(/salvar e continuar/i).click();

			cy.technologyFormFillInNResponsible();

			cy.findByText(/salvar e continuar/i).click();
			cy.findByText(/salvar e continuar/i).should('not.exist');
		});
	});
});
