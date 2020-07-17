// const data = {
// 	pages: {
// 		home: '/',
// 		technology: 'pages/technology/',
// 	},
// };

describe('technologies', () => {
	it('should list the same technologies as the api', () => {
		cy.request('GET', 'http://localhost:3333/technologies', {
			perPage: 1,
		}).then((technologies) => {
			const technology = technologies.body[0];

			cy.request('GET', `http://localhost:3333/${technology.slug}`).then((response) => {
				cy.expect(response).to.equal(200);

				cy.visit(`/${technology.slug}`);
			});
		});
	});
});
