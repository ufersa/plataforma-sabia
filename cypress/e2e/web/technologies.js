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

		cy.get('[data-testid=cards-wrapper] [data-testid=card-link]')
			.parent()
			.then((technologies) => {
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
				}).then((featured) => {
					const featuredTechnologiesFromJson = featured.body.map((item) => item.slug);
					const featuredTechnologiesIdsFromJson = featured.body.map((item) => item.id);

					cy.expect(featured.status).to.equal(200);
					cy.request('GET', 'http://localhost:3333/technologies', {
						embed: true,
						perPage: 4,
						orderBy: 'created_at',
						order: 'DESC',
						notIn: featuredTechnologiesIdsFromJson.join(),
					}).then((recent) => {
						const recentTechnologiesFromJson = recent.body.map((item) => item.slug);
						cy.expect([
							...featuredTechnologiesFromJson,
							...recentTechnologiesFromJson,
						]).to.deep.equal(technologiesFromDom);
					});
				});
			});
	});

	it('should be able to like or dislike a technology', () => {
		cy.authenticate().visit(data.pages.home);

		cy.get('[data-testid=card-heart]')
			.first()
			.find('span')
			.should('exist')
			.as('counter');

		cy.get('@counter').then((initialCounter) => {
			const initialLikes = Number(initialCounter.text());

			cy.wrap(initialCounter).click();

			// eslint-disable-next-line cypress/no-unnecessary-waiting
			cy.wait(1500);

			cy.get('@counter').then((newCounter) => {
				const currentLikes = Number(newCounter.text());

				expect(currentLikes).to.be.oneOf([initialLikes + 1, initialLikes - 1]);
				expect(currentLikes).to.not.equal(initialLikes);
			});
		});
	});
});
