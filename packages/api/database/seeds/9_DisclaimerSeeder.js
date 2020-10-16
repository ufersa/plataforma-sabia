/*
|--------------------------------------------------------------------------
| DisclaimerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Disclaimer = use('App/Models/Disclaimer');
const User = use('App/Models/User');
class DisclaimerSeeder {
	async run() {
		await Disclaimer.createMany([
			{
				description:
					'Concordo com a Política de Privacidade e os Termos e Condições de Uso.',
				required: true,
				type: 'termsOfUseRegister',
				version: '1',
			},
			{
				description:
					'Concordo com o processamento dos meus dados pessoais para fins de fornecimento dos serviços da Plataforma Sabiá. Veja mais na Política de Privacidade. ',
				required: true,
				type: 'termsOfUseRegister',
				version: '1',
			},
			{
				description:
					'Concordo em respeitar a legislação brasileira vigente no conteúdo que eu venha a disponibilizar na Plataforma Sabiá, sendo de minha exclusiva responsabilidade. Veja mais nos Termos e Condições de Uso. ',
				required: true,
				type: 'termsOfUseRegister',
				version: '1',
			},
			{
				description:
					'Estou ciente de que posso revogar o consentimento de uso dos meus dados pessoais a qualquer momento. Todavia, não poderei mais utilizar os serviços da plataforma que necessitam do uso e da coleta de dados pessoais. Veja mais na Política de Privacidade. ',
				required: true,
				type: 'termsOfUseRegister',
				version: '1',
			},
			{
				description:
					'Estou ciente quanto ao canal de suporte da Plataforma Sabiá, que estará à disposição para sanar eventual dúvida que possa surgir.',
				required: true,
				type: 'termsOfUseRegister',
				version: '1',
			},
			{
				description:
					'Estou ciente que em hipótese alguma será constituído vínculo cooperativo, associativo, societário ou empregatício entre a plataforma, os usuários cadastrados e os parceiros. Veja mais nos Termos e Condições de Uso.',
				required: true,
				type: 'termsOfUseRegister',
				version: '1',
			},
			{
				description:
					'Concordo com o processamento dos meus dados pessoais com o objetivo de receber publicidade da Plataforma Sabiá e de terceiros parceiros. Veja mais nos Termos e Condições de Uso.',
				required: true,
				type: 'termsOfUseRegister',
				version: '1',
			},
			{
				description:
					'Declaro ciência de que devo fornecer apenas informações verdadeiras no cadastro das tecnologias. Veja mais nos Termos e Condições de Uso.',
				required: true,
				type: 'termsOfUseTechnology',
				version: '1',
			},
			{
				description:
					'Estou ciente de que as informações cadastradas são de minha inteira responsabilidade, e a Plataforma Sabiá não responderá por quaisquer violações ao Direito de Propriedade Intelectual e Direito Autoral de terceiros. Veja mais nos Termos e Condições de Uso.',
				required: true,
				type: 'termsOfUseTechnology',
				version: '1',
			},
			{
				description:
					'Estou ciente de que poderei ser penalizado com advertência, suspensão e encerramento da minha conta por eventuais violações a direitos de terceiros no cadastro das tecnologias, como o Direito de Propriedade Intelectual e Direito Autoral. Veja mais nos Termos e Condições de Uso.',
				required: true,
				type: 'termsOfUseTechnology',
				version: '1',
			},
			{
				description:
					'Declaro ciência de que as transgressões a direitos de terceiros no cadastro das tecnologias podem implicar em responsabilização na esfera jurisdicional cível e criminal. Veja mais nos Termos e Condições de Uso.',
				required: true,
				type: 'termsOfUseTechnology',
				version: '1',
			},
		]);

		const users = await User.query()
			.where('status', 'verified')
			.fetch();

		await Promise.all(
			users.rows.map((user) => {
				return user.acceptMandatory('termsOfUseRegister');
			}),
		);
	}
}

module.exports = DisclaimerSeeder;
