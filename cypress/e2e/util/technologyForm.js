/* eslint-disable import/prefer-default-export */
export const fillInNResponsible = ({ cypress, fixture, howMany = 1 }) => {
	for (let index = 0; index < howMany; index += 1) {
		cypress.get(`[name=responsible[${index}].phone]`).type(fixture.responsibles[index].phone);
		cypress.get(`[name=responsible[${index}].email]`).type(fixture.responsibles[index].email);
		cypress
			.get(`[name=responsible[${index}].fullName]`)
			.type(fixture.responsibles[index].fullName);
		cypress
			.get(`[name=responsible[${index}].lattesId]`)
			.type(fixture.responsibles[index].lattesId);
	}
};
