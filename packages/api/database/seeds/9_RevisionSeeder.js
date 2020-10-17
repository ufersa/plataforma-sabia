/*
|--------------------------------------------------------------------------
| RevisionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const Reviewer = use('App/Models/Reviewer');
const Technology = use('App/Models/Technology');

class RevisionSeeder {
	async run() {
		// Creates reviewers
		const userRev01 = await User.create({
			email: 'sabiatestingreviewer01@gmail.com',
			password: 'sabiatesting',
			first_name: 'Sabia Reviewer',
			last_name: '01',
			status: 'verified',
			role: 'REVIEWER',
		});
		const userRev02 = await User.create({
			email: 'sabiatestingreviewer02@gmail.com',
			password: 'sabiatesting',
			first_name: 'Sabia Reviewer',
			last_name: '02',
			status: 'verified',
			role: 'REVIEWER',
		});
		const userRev03 = await User.create({
			email: 'sabiatestingreviewer03@gmail.com',
			password: 'sabiatesting',
			first_name: 'Sabia Reviewer',
			last_name: '03',
			status: 'verified',
			role: 'REVIEWER',
		});
		const reviewer01 = await Reviewer.create({ status: 'approved' });
		await reviewer01.user().associate(userRev01);
		const reviewer02 = await Reviewer.create({ status: 'approved' });
		await reviewer02.user().associate(userRev02);
		const reviewer03 = await Reviewer.create({ status: 'approved' });
		await reviewer03.user().associate(userRev03);

		const technologies = await Technology.all();
		const tech01 = technologies.rows[0];
		const tech02 = technologies.rows[1];
		const tech03 = technologies.rows[2];

		await reviewer01.technologies().attach(tech01.id);
		await reviewer02.technologies().attach(tech02.id);
		await reviewer03.technologies().attach(tech03.id);

		// Makes revisions
		const revisions = await Factory.model('App/Models/Revision').createMany(15);
		await Promise.all(
			revisions.slice(0, 5).map(async (revision) => {
				await revision.technology().associate(tech01);
				await revision.reviewer().associate(reviewer01);
			}),
		);
		await Promise.all(
			revisions.slice(5, 10).map(async (revision) => {
				await revision.technology().associate(tech02);
				await revision.reviewer().associate(reviewer02);
			}),
		);
		await Promise.all(
			revisions.slice(10, 15).map(async (revision) => {
				await revision.technology().associate(tech03);
				await revision.reviewer().associate(reviewer03);
			}),
		);
	}
}

module.exports = RevisionSeeder;
