const data = {
	pages: {
		messages: '/user/my-account/messages',
	},
};

describe('inbox messages', () => {
	it('should be able to click and open a message', () => {
		cy.intercept('PUT', '/messages/mark-as-read').as('markAsRead');
		cy.intercept('PUT', '/messages/mark-as-new').as('markAsNew');

		cy.authenticate().visit(data.pages.messages);
		cy.getCookie('token').then((cookie) => {
			cy.request({
				method: 'GET',
				url:
					'http://localhost:3334/messages?embed&orderBy=created_at&order=DESC&perPage=20',
				headers: {
					Authorization: `Bearer ${cookie.value}`,
				},
			}).then((messages) => {
				const messageSubject = messages.body[0].subject;
				const messageContent = messages.body[0].content;
				const messageIsNew = messages.body[0].status === 'new';

				// Checks if first item in message list is the first from api
				cy.findByRole('heading', { name: /caixa de mensagens/i })
					.parent()
					.next()
					.find('ul li')
					.eq(0)
					.contains(messageSubject);

				cy.findByText(messageSubject)
					.should('be.visible')
					.click();

				if (messageIsNew) {
					cy.wait('@markAsRead')
						.its('response.statusCode')
						.should('eq', 200);
				}

				cy.findAllByText(messageSubject)
					.should('have.length', 2)
					.last()
					.should('be.visible');

				cy.findAllByText(messageContent)
					.should('have.length', 2)
					.last()
					.should('be.visible');

				cy.findByRole('button', { name: /marcar como não lida/i }).click();

				cy.wait('@markAsNew')
					.its('response.statusCode')
					.should('eq', 200);

				cy.findByRole('button', { name: /marcar como lida/i }).should('be.visible');
			});
		});
	});

	it('should be able to paginate messages', () => {
		cy.authenticate().visit(data.pages.messages);
		cy.intercept(
			'GET',
			'http://127.0.0.1:3334/messages?embed&orderBy=created_at&order=DESC&perPage=20&page=1',
		).as('previousPage');
		cy.intercept(
			'GET',
			'http://127.0.0.1:3334/messages?embed&orderBy=created_at&order=DESC&perPage=20&page=2',
		).as('nextPage');

		cy.findByRole('button', { name: /next page/i }).click();

		cy.wait('@nextPage')
			.its('response.statusCode')
			.should('eq', 200);

		cy.findByRole('button', { name: /previous page/i }).click();

		cy.wait('@previousPage')
			.its('response.statusCode')
			.should('eq', 200);
	});
});
