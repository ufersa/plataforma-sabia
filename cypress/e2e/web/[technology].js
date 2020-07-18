describe('technology details', () => {
	it('should list details', () => {
		cy.request('GET', 'http://localhost:3333/technologies', {
			perPage: 1,
		}).then((response) => {
			const technology = response.body[0];

			cy.expect(response.status).to.equal(200);

			cy.visit(`/${technology.slug}`);

			cy.findAllByText(new RegExp(technology.title, 'i')).should('exist');
			cy.findAllByText(new RegExp(technology.description, 'im')).should('exist');
			cy.get('[data-testid=image]')
				.should('be.visible')
				.should('have.attr', 'src')
				.should('include', technology.thumbnail);
		});
	});
});
