
const SicapPage = () => {
	// Estados para armazenar a localidade selecionada, o termo de pesquisa e as opções de localidades filtradas
	// const [localidade, setLocalidade] = useState('Mossoró'); // Localidade padrão
	// const [pesquisa, setPesquisa] = useState('');
	// const [opcoesLocalidadesFiltradas, setOpcoesLocalidadesFiltradas] = useState([]);
	// const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

	// // Lista de localidades disponíveis
	// const localidadesDisponiveis = ['Mossoró'];

	// // Efeito para atualizar as opções filtradas ao iniciar a página
	// useEffect(() => {
	// 	handlePesquisaChange({ target: { value: pesquisa } });
	// }, []);

	// // Função para lidar com a alteração no campo de pesquisa
	// const handlePesquisaChange = (event) => {
	// 	const termoPesquisa = event.target.value;
	// 	setPesquisa(termoPesquisa);
	// 	// Mostra as opções apenas se houver um termo de pesquisa
	// 	setMostrarOpcoes(Boolean(termoPesquisa));

	// 	// Filtra as localidades com base no termo de pesquisa e as ordena
	// 	const localidadesFiltradas = localidadesDisponiveis
	// 		.filter((localidade) => localidade.toLowerCase().includes(termoPesquisa.toLowerCase()))
	// 		.sort();

	// 	setOpcoesLocalidadesFiltradas(localidadesFiltradas);
	// };

	// // Função para lidar com o clique em uma opção de localidade
	// const handleOpcaoLocalidadeClick = (opcao) => {
	// 	setLocalidade(opcao);
	// 	setPesquisa('');
	// 	setOpcoesLocalidadesFiltradas([]);
	// 	setMostrarOpcoes(false);
	// };

	// Função para obter a URL do Power BI com base na localidade selecionada
	const getDashboardUrl = () => {
		return 'https://app.powerbi.com/view?r=eyJrIjoiN2M0ZWZlMDctZTRiZC00OTI0LWFjMjktNTc4NjVlNjE2Njg1IiwidCI6IjQ0MzBkNGIwLTRiMDktNDAxNy1hYzRmLWUwOGUxMjA2MWFmOSJ9&embedImagePlaceholder=true&pageName=0346e3c5402016a4eac7';
	};

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			<iframe
				title="Sicap v2 com mapa"
				width="1024"
				height="804"
				src={getDashboardUrl()}
				frameBorder="0"
				allowFullScreen="true"
			/>
			<div style="text-align:center" />
		</div>
	);
};

export default SicapPage;
