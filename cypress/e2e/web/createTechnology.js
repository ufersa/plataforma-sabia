describe('vallidation', () => {
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
		cy.select('#category');

		cy.findByText(/escolha uma categoria primeiro/i).should('not.exist');
		cy.findByText(/escolha a sub categoria/i).should('exist');
	});
});

describe('creating technology', () => {
	beforeEach(() => {
		cy.authenticate().visit('/technology/new');
	});

	it.only('step 1 - filling all fields creates an technology', () => {
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
		});
	});
});
