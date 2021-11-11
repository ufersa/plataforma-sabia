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
		const disclaimersCount = await Disclaimer.getCount();
		if (disclaimersCount > 0) {
			return;
		}
		await Disclaimer.createMany([
			{
				description:
					'Concordo com a Política de Privacidade e os Termos e Condições de Uso.',
				required: true,
				type: 'register',
				version: '1',
			},
			{
				description:
					'Concordo com o processamento dos meus dados pessoais com o objetivo de receber publicidade da Plataforma Sabiá e de terceiros parceiros. ',
				required: true,
				type: 'register',
				version: '1',
			},
			{
				description:
					'Declaro ciência de que devo fornecer apenas informações verdadeiras no cadastro das tecnologias. ',
				required: true,
				type: 'technology',
				version: '1',
			},
			{
				description:
					'Estou ciente de que as informações cadastradas são de minha inteira responsabilidade, e a Plataforma Sabiá não responderá por quaisquer violações ao Direito de Propriedade Intelectual e Direito Autoral de terceiros. ',
				required: true,
				type: 'technology',
				version: '1',
			},
			{
				description:
					'Estou ciente de que poderei ser penalizado com advertência, suspensão e encerramento da minha conta por eventuais violações a direitos de terceiros no cadastro das tecnologias, como o Direito de Propriedade Intelectual e Direito Autoral. ',
				required: true,
				type: 'technology',
				version: '1',
			},
			{
				description:
					'Declaro ciência de que as transgressões a direitos de terceiros no cadastro das tecnologias podem implicar em responsabilização na esfera jurisdicional cível e criminal. ',
				required: true,
				type: 'technology',
				version: '1',
			},

			{
				description:
					'Declaro estar disponível para avaliar as informações cadastradas pelos usuários no cadastro de tecnologias, checar sua coerência e consistência, bem como analisar o nível das tecnologias cadastradas na Plataforma Sabiá, desde que estejam dentro da minha área de especialidade.',
				required: true,
				type: 'reviewers',
				version: '1',
			},
			{
				description:
					'Declaro que NÃO POSSUO conflito de interesses de ordens financeira, comercial, política, acadêmica e pessoal com as tecnologias pela qual irei avaliar.',
				required: true,
				type: 'reviewers',
				version: '1',
			},
			{
				description:
					'Declaro que irei atender aos princípios éticos no uso da Plataforma Sabiá e desempenharei as minhas funções com probidade, boa-fé e de acordo com a legislação vigente, sendo inteiramente responsável pelas condutas lesivas a direitos de terceiros, ao próprio serviço disponibilizado pela plataforma e à Administração Pública, com responsabilização civil contratual e/ou extracontratual e adoção das medidas penais aplicáveis ao caso, conforme os Termos e Condições de Uso.',
				required: true,
				type: 'reviewers',
				version: '1',
			},
		]);

		const users = await User.query()
			.where('status', 'verified')
			.fetch();

		await Promise.all(
			users.rows.map((user) => {
				user.acceptMandatory('register');
				user.acceptMandatory('technology');
				user.acceptMandatory('reviewers');
				return user;
			}),
		);
	}
}

module.exports = DisclaimerSeeder;
