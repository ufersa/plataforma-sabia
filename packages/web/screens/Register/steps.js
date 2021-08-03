import StepOne from './StepOne';
import StepTwo from './StepTwo';

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
	},
	{
		title: 'Dados pessoais',
		subtitle: 'Precisamos de algumas informações sobre você',
	},
];

export default steps;
