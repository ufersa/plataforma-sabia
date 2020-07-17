describe('technology details', () => {
	it('should list details', () => {
		cy.request('GET', 'http://localhost:3333/technologies', {
			perPage: 1,
		}).then((technologies) => {
			const technology = technologies.body[0];

			cy.request('GET', `http://localhost:3333/technologies/${technology.slug}`).then(
				(response) => {
					cy.expect(response.status).to.equal(200);

					cy.visit(`/${technology.slug}`);
				},
			);
		});
	});
});
