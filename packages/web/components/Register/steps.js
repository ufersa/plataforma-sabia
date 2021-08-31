import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

const steps = [
	{
		title: 'Forma de acesso',
		subtitle: 'Vamos começar o seu cadastro',
		component: StepOne,
		backgroundImage: '/login-rafiki.svg',
	},
	{
		title: 'Credenciais',
		subtitle: 'Seus dados para acesso à plataforma',
		component: StepTwo,
		backgroundImage: '/login-rafiki.svg',
	},
	{
		title: 'Validação',
		subtitle: 'Verifique o seu e-mail para continuar',
		component: StepThree,
		backgroundImage: '/authentication-rafiki.svg',
	},
	{
		title: 'Dados pessoais',
		subtitle: 'Precisamos de algumas informações sobre você',
		component: StepFour,
		backgroundImage: '/personal-rafiki.svg',
	},
	{
		title: 'Cadastro concluído com sucesso!',
		subtitle:
			'Utilize agora a Plataforma Sabiá para publicar ou adquirir  soluções em tecnologias e serviços para o semiárido!',
		component: StepFive,
	},
];

export default steps;
