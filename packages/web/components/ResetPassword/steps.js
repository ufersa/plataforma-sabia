import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

const steps = [
	{
		title: 'Esqueceu sua senha?',
		subtitle: (
			<span>
				Digite o email cadastrado, enviaremos um <strong>link</strong> de recuperação para
				você.
			</span>
		),
		component: StepOne,
	},
	{
		title: 'Verifique seu e-mail',
		subtitle: (
			<span>
				Foi enviado para o seu email um <strong>código de 6 dígitos</strong> de recuperação
				da sua senha.
			</span>
		),
		component: StepTwo,
	},
	{
		title: 'Redefina sua senha',
		subtitle: 'Agora é o momento de definir uma nova senha para acessar a Plataforma Sabiá.',
		component: StepThree,
	},
	{
		title: 'Senha alterada com sucesso!',
		subtitle: 'Sua senha foi alterada e agora você pode entrar na Plataforma Sabiá.',
		component: StepFour,
	},
];

export default steps;
