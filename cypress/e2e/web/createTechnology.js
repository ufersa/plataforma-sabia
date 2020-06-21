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
		cy.select('primarycategory');

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
			cy.select('primarycategory');
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

			cy.technologyFormFillInNResponsible();

			cy.findByText(/salvar e continuar/i).click();
			cy.findByText(/salvar e continuar/i).should('not.exist');
		});
	});
});
