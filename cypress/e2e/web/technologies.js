const data = {
	pages: {
		home: '/',
		technology: 'pages/technology/',
	},
};

describe('technologies', () => {
	it('should list the same technologies as the api', () => {
		cy.visit(data.pages.home);

		const technologiesFromDom = [];

		cy.get('[data-testid=cards-wrapper] a[href^="/"]').then((technologies) => {
			technologies.map((index, technology) => {
				let slug = technology.toString().split('/');
				slug = slug[slug.length - 1];
				technologiesFromDom[index] = slug;
				return true;
			});

			cy.request('GET', 'http://localhost:3333/technologies', {
				embed: true,
				perPage: 4,
				orderBy: 'likes',
				order: 'DESC',
			}).then((response) => {
				const featuredTechnologiesFromJson = response.body.map((item) => item.slug);
				const featuredTechnologiesIdsFromJson = response.body.map((item) => item.id);

				cy.expect(response.status).to.equal(200);
				cy.request('GET', 'http://localhost:3333/technologies', {
					embed: true,
					perPage: 4,
					orderBy: 'created_at',
					order: 'DESC',
					notIn: featuredTechnologiesIdsFromJson.join(),
				}).then((response2) => {
					const recentTechnologiesFromJson = response2.body.map((item) => item.slug);
					cy.expect([
						...featuredTechnologiesFromJson,
						...recentTechnologiesFromJson,
					]).to.deep.equal(technologiesFromDom);
				});
			});
		});
	});
});
