import React from 'react';
import { useTranslation } from 'next-i18next';
import theme from '../styles/theme';
import { ContentContainer } from '../components/Common';
import { PageTitle, Box } from '../components/TermsAndPolicies/styles';
import Head from '../components/head';

const PrivacyPolicy = () => {
	const { t } = useTranslation(['pages']);

	return (
		<>
			<Head
				title={t('pages:privacyPolicy.title')}
				description={t('pages:privacyPolicy.description')}
				keywords={t('pages:privacyPolicy.keywords')}
			/>
			<ContentContainer bgColor={theme.colors.whiteSmoke}>
				<PageTitle>Política de Privacidade</PageTitle>
				<Box>
					<h2>1 Introdução</h2>
					<p>
						Esta Política de Privacidade contém um conjunto de informações que descrevem
						quais os dados dos usuários serão armazenados, coletados, utilizados,
						compartilhados e processados a fim de viabilizar a realização dos serviços
						prestados pela Plataforma Sabiá.
					</p>
					<p>
						A Plataforma Sabiá preza pela proteção dos dados dos usuários, tratando-os
						com confidencialidade e dentro dos limites legais. Desse modo, é muito
						importante que você leia cuidadosamente a presente Política de Privacidade e
						realize contato, por meio dos nossos meios de comunicação de suporte, caso
						surja alguma dúvida a respeito dos termos aqui contidos.
					</p>
					<p>
						Ao ler e aceitar esta Política de Privacidade, você estará consentindo com
						as práticas nela descritas de tratamento de dados. Dessa forma, a Plataforma
						Sabiá armazena, coleta, utiliza, compartilha e processa os seus dados com
						apoio no seu consentimento, podendo este ser revogado a qualquer momento.
						Todavia, caso isso aconteça, você não poderá mais utilizar os serviços da
						plataforma que necessitam do uso e da coleta de dados pessoais.
					</p>
					<p>
						Esses termos entrarão em vigor a partir do aceite das condições aqui
						dispostas e permanecerão em vigor até a exclusão da conta pelo usuário, bem
						como a exclusão de todos os seus dados pessoais pela Plataforma Sabiá.
					</p>
					<h2>2 Das Partes</h2>
					<p>
						A presente Política de Privacidade será adotada por todos aqueles que
						utilizarem, de alguma forma, os serviços prestados pela Plataforma Sabiá,
						seja em território nacional ou estrangeiro, sem que haja qualquer tipo de
						discriminação. Desse modo, ela será aplicada especialmente ao usuário:
					</p>
					<ul>
						<li>
							Não cadastrado: aqueles que realizam simples acesso à plataforma, não
							efetuando cadastro. Podem acessá-la para realizar busca por tecnologias,
							visualizar dados básicos das tecnologias e a página Sobre a Tecnologia.
						</li>
						<li>
							Usuário comum: usuário devidamente cadastrado na Plataforma Sabiá, o
							qual ficará encarregado de cadastrar tecnologias, podendo participar de
							todos os fóruns da Plataforma Sabiá, tais como fóruns fechados de
							pesquisadores, fóruns com investidores e fóruns abertos; participar de
							chats com pesquisadores e investidores; enviar e receber mensagens;
							responder as FAQ das tecnologias e ter acesso ao Banco de Investidores e
							ao Banco de Oportunidades.
						</li>
						<li>
							Investidor: organizações, bancos, empresas ou pessoas naturais que se
							cadastram com o objetivo de fomentar, por meio de investimentos, o
							desenvolvimento das tecnologias. Poderá visualizar detalhes financeiros
							do desenvolvimento das tecnologias, participar dos fóruns de
							investidores com pesquisadores e fóruns abertos, participar de chats com
							pesquisadores, enviar e receber mensagens, e ter acesso ao Banco de
							Pesquisadores e ao Banco de Oportunidades.
						</li>
						<li>
							Curador: pessoa natural responsável por avaliar as tecnologias
							cadastradas na plataforma.
						</li>
						<li>
							Administrador: encarregado de administrar a plataforma, possuindo acesso
							à Interface Administrativa.
						</li>
					</ul>
					<p>
						A Política de Privacidade será aplicada também a todos aqueles que fornecem,
						de alguma forma, informações à Plataforma Sabiá. Ao ler e aceitar os termos
						desta Política de Privacidade, todos os usuários certificam, livre e
						expressamente, que possuem plena capacidade para usufruir dos serviços
						prestados pela Plataforma Sabiá, com base na legislação brasileira vigente e
						no nossos Termos e Condições de Uso.
					</p>
					<h2>3 Quais dados serão coletados</h2>
					<p>
						Com o objetivo de prestarmos os serviços aos nossos usuários de uma forma
						mais eficiente, precisamos colher uma série de informações no momento da
						realização do cadastro e durante a utilização da Plataforma Sabiá, como no
						cadastro das tecnologias e no relato de experiência quanto à utilização da
						plataforma, a depender do tipo de usuário cadastrado. Especificamente,
						coletamos os seguintes dados:
					</p>
					<h3>3.1 Dados coletados no cadastro do usuário</h3>
					<ul>
						<li>Nome completo</li>
						<li>E-mail principal</li>
						<li>E-mail secundário</li>
						<li>Senha</li>
						<li>Instituição a que pertence</li>
						<li>CPF</li>
						<li>Data de Nascimento</li>
						<li>Telefone</li>
						<li>Lattes ID</li>
						<li>Endereço completo</li>
					</ul>
					<h3>3.2 Dados coletados no cadastro da tecnologia</h3>
					<ul>
						<li>
							<span>Sobre a tecnologia</span>
							<ul>
								<li>Título da Tecnologia</li>
								<li>Descrição</li>
								<li>Palavras-chave</li>
								<li>Público-alvo</li>
								<li>Bioma principal</li>
								<li>Qual Programa de governo a tecnologia faz parte</li>
								<li>Nível de maturidade da tecnologia (TRL)</li>
								<li>Se tem patente registrada</li>
								<li>Qual o número da patente (se houver)</li>
								<li>Situação da proteção intelectual da tecnologia</li>
								<li>Classificação da tecnologia</li>
								<li>Dimensão da tecnologia</li>
								<li>Categoria</li>
								<li>Subcategoria</li>
							</ul>
						</li>
						<li>
							<span>Caracterização da tecnologia</span>
							<ul>
								<li>Objetivo principal</li>
								<li>Objetivos secundários</li>
								<li>
									Local de aplicação da tecnologia (solo, água, planta, ar,
									residência)
								</li>
								<li>Forma de aplicação</li>
								<li>Exemplos de aplicação</li>
								<li>Duração do processo de instalação</li>
								<li>Problemas que a tecnologia soluciona</li>
								<li>Problemas que a tecnologia acarreta</li>
								<li>Pré-requisitos para a implantação da tecnologia</li>
								<li>Riscos associados à tecnologia</li>
								<li>Contribuição da tecnologia para o semiárido</li>
							</ul>
						</li>
						<li>
							<span>Custos e financiamento</span>
							<ul>
								<li>Custos de desenvolvimento da tecnologia</li>
								<li>Custos de implantação da tecnologia</li>
								<li>Custos de manutenção da tecnologia</li>
								<li>Se necessita de financiamento para desenvolver a plataforma</li>
								<li>Qual o tipo de financiamento</li>
								<li>Qual o valor desejado para financiamento</li>
								<li>Qual a situação do financiamento</li>
							</ul>
						</li>
						<li>
							<span>Dados de localização</span>
							<ul>
								<li>
									<span>Onde a tecnologia é desenvolvida</span>
									<ul>
										<li>Nome da instituição</li>
										<li>Localização geográfica - Latitude e Longitude</li>
									</ul>
								</li>
								<li>
									<span>Onde a tecnologia pode ser aplicada</span>
									<ul>
										<li>Qual região</li>
									</ul>
								</li>
								<li>
									<span>Onde a tecnologia já está implantada</span>
									<ul>
										<li>Localização geográfica - Latitude e Longitude</li>
									</ul>
								</li>
								<li>
									<span>
										Onde existe assistência técnica para manutenção da
										tecnologia
									</span>
									<ul>
										<li>Nome da empresa</li>
										<li>Localização geográfica - Latitude e Longitude</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<span>Documentação</span>
							<ul>
								<li>Fotos anexas</li>
								<li>Vídeos anexos</li>
								<li>Documentos anexos</li>
							</ul>
						</li>
						<li>
							<span>Responsáveis</span>
							<ul>
								<li>
									<span>Dados dos responsáveis pela tecnologia</span>
									<ul>
										<li>Nome completo</li>
										<li>Email</li>
										<li>Telefone</li>
										<li>Id Lattes</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
					<h3>3.3 Dados coletados no relato da experiência do usuário</h3>
					<ul>
						<li>Dados do usuário que está avaliando (nome do usuário/email)</li>
						<li>Avaliação (1 a 5)</li>
						<li>Comentário</li>
						<li>Pontos positivos</li>
						<li>Pontos negativos</li>
						<li>Fotos do usuário</li>
						<li>Anexos do usuário</li>
					</ul>
					<h2>4 Como os dados coletados serão utilizados na Plataforma Sabiá</h2>
					<p>
						Ao concordar com essa política de privacidade, o usuário consente que a
						Plataforma Sabiá utilize os seus dados coletados, desde o início da sua
						utilização até o momento em que optar por excluir a sua conta. Salientamos
						que o usuário sempre poderá gerenciar as informações salvas em sua conta na
						plataforma.
					</p>
					<p>Durante o uso da plataforma, poderemos coletar dados para:</p>
					<ul>
						<li>
							Compartilhar, com o consentimento do usuário dentro da plataforma, as
							informações sobre as tecnologias cadastradas. Através do cadastro de
							tecnologia, podemos coletar dados que você cria, como: a descrição do
							produto, suas características, a localização e os uploads, respeitados
							os segredos comercial e industrial.
						</li>
						<li>
							Fornecer melhores serviços, o que inclui mostrar o que for mais
							relevante para cada usuário e acompanhar as suas atividades, utilizando
							palavras-chave de pesquisas, publicidade e novos anúncios, para
							administrar mais efetivamente as atividades na plataforma de acordo com
							o que achamos que será sua preferência.
						</li>
						<li>
							<span>
								Coletamos informações sobre suas atividades dentro da plataforma
								para fazer as recomendações que podem ser mais interessantes para
								você, o que pode incluir:
							</span>
							<ul>
								<li>Termos que você pesquisa.</li>
								<li>Sua localização.</li>
								<li>Visualizações e interações com outros usuários.</li>
								<li>O conteúdo que você compartilha com outros usuários.</li>
								<li>
									Atividades em sites e aplicativos de terceiros que interagem com
									nossa plataforma.
								</li>
							</ul>
						</li>
						<li>
							Prestar serviços ao usuário, como envio periódico de e-mails
							informativos, ou informações por notificação “Push”, SMS e afins sobre a
							Plataforma Sabiá, seus produtos ou serviços, além de informar sobre
							interações dentro da plataforma e em conjunto com o uso de determinadas
							Ferramentas Interativas.
						</li>
						<li>
							Validar a tecnologia cadastrada por meio de análise da curadoria
							especializada da Plataforma Sabiá.
						</li>
						<li>
							Comunicar acerca de mudanças nos Termos de Uso e na Política de
							Privacidade da nossa plataforma.
						</li>
						<li>
							Por motivos de segurança, para entrar em contato com você caso
							detectemos interações suspeitas ou incomuns em sua conta de usuário.
						</li>
						<li>Prestar assistência técnica.</li>
						<li>Em cumprimento de ordem legal ou judicial.</li>
						<li>
							Defender, constituir, ou exercer regularmente direitos na esfera
							judicial ou administrativa.
						</li>
					</ul>
					<p>
						Após a exclusão da sua conta na plataforma, poderemos utilizar algumas
						informações fornecidas durante o uso, por prazo e determinação legal e
						sempre sob sigilo, de forma controlada e com segurança, para os seguintes
						fins:
					</p>
					<ul>
						<li>
							Para que sejam cumpridas as exigências regulatórias, fiscais e de
							seguro, dos locais em que operamos.
						</li>
						<li>
							Para atender a interesses comerciais legítimos, como prevenção de
							fraudes.
						</li>
						<li>No caso de cumprimento de ordem legal ou judicial.</li>
						<li>
							Para defender, constituir ou exercer regularmente direitos na esfera
							judicial ou administrativa.
						</li>
					</ul>
					<h3>
						4.1 Sobre os dados de tecnologias disponibilizados pelos usuários
						cadastrados
					</h3>
					<p>
						O usuário, para cadastrar sua tecnologia na Plataforma Sabiá, poderá
						preencher os campos com diversas informações importantes, como, por exemplo,
						sua descrição, seu público-alvo, seus riscos, sua localização geográfica,
						bem como carregar fotos, vídeos, documentos com procedimentos de construção,
						diagrama de instalação etc.
					</p>
					<p>
						Quanto à natureza das informações prestadas pelo usuário à plataforma, estas
						são de responsabilidade do usuário, que estará ciente quanto ao
						compartilhamento dos dados aos demais usuários da plataforma, bem como ao
						público geral, de acordo com os critérios definidos nesta Política de
						Privacidade.
					</p>
					<p>
						Assim, o usuário deve respeitar as diretrizes previstas nos Termos de Uso,
						bem como os segredos comercial e industrial da tecnologia cadastrada.
					</p>
					<h3>4.2 Sobre os dados disponibilizados aos investidores</h3>
					<p>
						A Plataforma Sabiá servirá como facilitador de comunicações entre os
						usuários que disponibilizam sua tecnologia na plataforma e os investidores,
						que poderão ser bancos parceiros, empresas ou pessoas naturais.
					</p>
					<p>
						Para que esse contato ocorra da melhor forma, a plataforma disponibilizará
						alguns dados extras para essa modalidade de usuário investidor. Esses dados
						servirão para cumprir a finalidade de interesse deste, e por isso podem
						incluir informações como, por exemplo, detalhes financeiros do
						desenvolvimento da tecnologia, custos de desenvolvimento, implantação e
						manutenção, que serão disponibilizados pelo usuário no momento do cadastro
						da tecnologia.
					</p>
					<h3>4.3 Sobre as melhorias dentro da plataforma</h3>
					<p>
						Além dos fins descritos anteriormente, também usamos as informações que
						coletamos em nossa plataforma para realizar os seguintes aprimoramentos
						dentro dela mesma:
					</p>
					<ul>
						<li>
							Realizar auditorias e análises de dados internas para melhorar a
							experiência de quem usa a plataforma em termos de qualidade do serviço.
						</li>
						<li>
							Para entender como nossos serviços são utilizados, para otimizar nosso
							design, avaliar o desempenho das campanhas publicitárias e criar novos
							serviços, de acordo com a necessidade do usuário observada através dos
							dados da plataforma.
						</li>
						<li>
							Se você utilizar nossa plataforma para se comunicar com outros usuários,
							poderemos coletar informações para melhorar nossos serviços, bem como
							acompanhar as interações dos usuários dentro da plataforma e formar
							dados e estatísticas de interação.
						</li>
						<li>
							Com o objetivo de melhorar a segurança dos nossos serviços, como
							detectar fraudes, problemas técnicos e riscos de segurança para a
							Plataforma Sabiá.
						</li>
					</ul>
					<h2>5 Sobre o compartilhamento de dados</h2>
					<p>
						Além das hipóteses elencadas no tópico acima, seus dados pessoais poderão
						ser compartilhados em outras situações:
					</p>
					<ol type="a">
						<li>
							A pedido do usuário: quando você, na qualidade de usuário, se inscreve
							no nosso serviço e submete suas informações para criar uma conta e um
							perfil, outras pessoas terão acesso às suas informações, devendo ser
							respeitados os segredos comercial e industrial.
						</li>
						<li>
							Para processamento externo: poderemos fornecer informações às empresas
							confiáveis, respeitando todas as diretrizes de nossa Política de
							Privacidade e medidas de segurança da informação, para processar por nós
							determinados dados.
						</li>
						<li>
							Por motivos legais: poderá ocorrer o compartilhamento de informações com
							autoridades públicas, judiciais ou policiais, caso permitido pela
							legislação aplicável, por decisão judicial ou por requisição de
							autoridade legal.
						</li>
					</ol>
					<p>
						É totalmente vedada a divulgação de dados pessoais a terceiros, quando elas
						não se enquadrarem nas finalidades identificadas nos tópicos acima.
					</p>
					<p>
						Poderemos compartilhar dados de identificação não pessoal ao público geral e
						aos nossos parceiros para que sejam demonstradas tendências ou estatísticas
						sobre o uso da plataforma e dos nossos serviços.
					</p>
					<h2>6 Como as informações serão protegidas</h2>
					<p>
						Os serviços da Plataforma Sabiá são realizados com sólidos recursos de
						segurança contra acesso, alteração, destruição e divulgação não autorizada
						dos dados fornecidos. Além disso, serão efetivados monitoramento e testes de
						segurança em nossos servidores constantemente, visando preservar os dados
						dos usuários de maneira contínua.
					</p>
					<p>
						A Plataforma Sabiá utiliza o protocolo de segurança HTTPS, o qual incorpora
						uma camada de proteção na transmissão dos dados fornecidos ao servidor,
						criptografando a comunicação com o objetivo de proporcionar maior proteção
						aos dados dos usuários a fim de impossibilitar a perda, a interceptação e o
						uso indevido das informações disponibilizadas.
					</p>
					<p>
						Todavia, mesmo utilizadas todas as medidas técnicas pertinentes e
						sofisticados recursos de segurança para a proteção dos seus dados, não nos
						responsabilizaremos por violações em virtude de culpa exclusiva de
						terceiros, como, por exemplo, ataques de hackers e crackers, bem como por
						culpa do próprio usuário, a exemplo de transferência e disponibilização dos
						dados a outras pessoas.
					</p>
					<p>
						Mesmo assim, a Plataforma Sabiá se compromete a comunicar imediatamente ao
						usuário, através de mensagem enviada por e-mail e/ou pelos demais meios de
						comunicação disponibilizados na realização do cadastro, caso seja
						identificada qualquer tipo de violação aos seus dados.
					</p>
					<h2>7 Como serão utilizados os cookies e outras tecnologias</h2>
					<p>
						Utilizamos tecnologias para coletar e armazenar informações quando você
						visita a Plataforma Sabiá. Nesse sentido, poderemos utilizar cookies ou
						tecnologias análogas para reconhecimento do dispositivo ou navegador dos
						usuários.
					</p>
					<p>
						Os Cookies são pequenos arquivos de textos enviados pelo site que você
						visita ao seu navegador e nele ficam armazenados, com informações referentes
						à navegação na plataforma. Através dos Cookies, as informações dos usuários
						poderão ser coletadas para que o servidor possa decifrá-las posteriormente,
						como, por exemplo, o armazenamento do seu login e sua senha para que você
						não necessite digitá-los cada vez que visitar a Plataforma Sabiá, bem como
						informações sobre suas atividades realizadas dentro da própria plataforma,
						para que possamos fazer as recomendações necessárias a fim de proporcionar a
						sua melhor utilização e experiência dos nossos serviços.
					</p>
					<p>
						Os dados coletados por meio de Cookies que permitem identificação dos
						usuários são considerados como pessoais, sendo-lhes aplicáveis todas as
						regras contidas nesta Política de Privacidade.
					</p>
					<p>
						A critério do usuário, os Cookies podem ser bloqueados ou apagados do seu
						disco. Porém, ao fazer isso, a disponibilidade de algumas ferramentas e
						recursos da plataforma poderão ser afetados.
					</p>
					<h2>8 Sobre mudanças na Política de Privacidade</h2>
					<p>
						Esta Política de Privacidade poderá ser alterada ou atualizada a qualquer
						momento. Dessa forma, é recomendável que os usuários visitem-na de tempos em
						tempos para verificar as eventuais modificações. De todo modo, publicaremos
						as alterações e atualizações dos termos desta política na Plataforma Sabiá
						e, caso haja alguma modificação significativa, iremos realizar um aviso,
						através de notificação por e-mail e/ou na própria plataforma, aos usuários
						cadastrados.
					</p>
					<p>
						Ao acessar a Plataforma Sabiá após as modificações realizadas nesta Política
						de Privacidade, os usuários demonstrarão concordância com as novas normas e
						os dados serão armazenados, coletados, utilizados, compartilhados e
						processados de acordo com a nova política.
					</p>
					<p>
						A fim de dar o máximo de transparência possível às modificações realizadas
						nos termos da Política de Privacidade, forneceremos também, na própria
						Plataforma Sabiá, os arquivos das versões anteriores em sua integralidade
						para que você possa visualizá-los.
					</p>
					<h2>9 O que fazer em caso de dúvidas ou requerimento do usuário</h2>
					<p>
						Caso surjam dúvidas a respeito de quaisquer termos contidos nesta Política
						de Privacidade, bem como sobre a possibilidade de correção, explicação,
						visualização ou cópia dos seus dados, você poderá entrar em contato
						diretamente conosco através do e-mail{' '}
						<a href="mailto:contato@plataformasabia.com.br">
							contato@plataformasabia.com.br
						</a>
						, ou por meio da{' '}
						<a href="/contact">
							central de atendimento presente na própria Plataforma Sabiá
						</a>
						. Logo que possível, comprometemo-nos a respondê-lo, sanando as dúvidas
						apresentadas ou disponibilizando as informações requeridas, com base na
						legislação brasileira vigente e no nosso{' '}
						<a href="/terms-of-use">Termo e Condições de Uso</a>.
					</p>
				</Box>
			</ContentContainer>
		</>
	);
};

PrivacyPolicy.getInitialProps = async () => {
	return {
		namespacesRequired: ['pages'],
	};
};

export default PrivacyPolicy;
