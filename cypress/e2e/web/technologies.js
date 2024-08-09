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

		cy.findAllByTestId('cards-wrapper')
			.eq(1)
			.within(() => {
				cy.get('[data-testid="card-title"]')
					.parent()
					.then((technologies) => {
						technologies.map((index, technology) => {
							let slug = technology.toString().split('/');
							slug = slug[slug.length - 1];
							technologiesFromDom[index] = slug;
							return true;
						});

						cy.request('GET', 'http://localhost:3334/technologies', {
							embed: true,
							perPage: 4,
							orderBy: 'likes',
							order: 'DESC',
							status: 'published',
							taxonomy: 'category',
						}).then((featured) => {
							const featuredTechnologiesFromJson = featured.body.map(
								(item) => item.slug,
							);

							cy.expect(featured.status).to.equal(200);

							cy.expect([...featuredTechnologiesFromJson]).to.deep.equal(
								technologiesFromDom,
							);
						});
					});
			});
	});

	it('should be able to like or dislike a technology', () => {
		cy.authenticate().visit(data.pages.home);

		cy.findAllByTestId('card-heart')
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
