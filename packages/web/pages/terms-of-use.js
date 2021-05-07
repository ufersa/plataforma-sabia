import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import theme from '../styles/theme';
import { ContentContainer } from '../components/Common';
import { PageTitle, Box } from '../components/TermsAndPolicies/styles';
import Head from '../components/head';

const TermsOfUse = () => {
	const { t } = useTranslation(['pages']);

	return (
		<>
			<Head
				title={t('pages:termsOfUse.title')}
				description={t('pages:termsOfUse.description')}
				keywords={t('pages:termsOfUse.keywords')}
			/>
			<ContentContainer bgColor={theme.colors.whiteSmoke}>
				<PageTitle>Termos e Condições de Uso</PageTitle>
				<Box>
					<h2>1 Considerações Iniciais</h2>
					<p>
						Nestes Termos de Uso estão presentes as regras de utilização da Plataforma
						Sabiá e como serão estabelecidas as relações dos usuários com os nossos
						serviços. Qualquer pessoa que pretenda utilizar os serviços da plataforma
						deverá ler e aceitar as disposições aqui presentes.
					</p>
					<p>
						A Plataforma Sabiá é um canal de difusão de tecnologias e oportunidade de
						negócios. Propõe-se aqui um espaço para interação entre inventores,
						investidores, universidades, órgãos de governo, além do público em geral,
						contando com um ambiente acessível ao usuário. Ao ler e aceitar os Termos de
						Uso, todos os usuários certificam, livre e expressamente, que possuem plena
						capacidade para usufruir dos serviços prestados pela Plataforma Sabiá, com
						base na legislação brasileira e na nossa Política de Privacidade.
					</p>
					<p>
						É importante a leitura desses Termos de Uso para a compreensão do usuário
						quanto às condições gerais de uso e suas respectivas obrigações ao utilizar
						os serviços da Plataforma Sabiá. Desse modo, é muito importante que você
						leia cuidadosamente e realize contato, através dos nossos meios de suporte,
						caso surja alguma dúvida a respeito dos termos aqui contidos.
					</p>
					<p>
						Esses Termos entrarão em vigor a partir do aceite das condições aqui
						dispostas e assim permanecerão até a exclusão de todos os dados pessoais do
						usuário pela Plataforma Sabiá.
					</p>
					<h2>2 Definições das partes</h2>
					<p>
						As disposições nestes Termos de Uso serão adotadas, seja em território
						nacional ou estrangeiro, sem que haja qualquer tipo de discriminação. Desse
						modo, na relação estão presentes as seguintes partes:
					</p>
					<ul>
						<li>
							Plataforma Sabiá: plataforma que irá fornecer os serviços de
							intermediação e divulgação de tecnologia entre as diferentes partes
							descritas a seguir. Poderá ser referido nestes Termos pelo pronome
							“nós”.
						</li>
						<li>
							Não cadastrado: aqueles que realizam simples acesso à plataforma, não
							efetuando cadastro. Podem acessá-la para realizar busca por tecnologias,
							visualizar dados básicos das tecnologias e a página Sobre a Tecnologia.
							Poderá ser referido nestes Termos pelo pronome “você”.
						</li>
						<li>
							Usuário comum: usuário devidamente cadastrado na Plataforma Sabiá, o
							qual ficará encarregado de cadastrar tecnologias, podendo participar de
							todos os fóruns da Plataforma Sabiá, tais como fóruns fechados de
							pesquisadores, fóruns com investidores e fóruns abertos; participar de
							chats com pesquisadores e investidores; enviar e receber mensagens;
							responder as FAQ das tecnologias e ter acesso ao Banco de Investidores e
							ao Banco de Oportunidades. Poderá ser referido nestes Termos pelo
							pronome “você”.
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
					<h2>3 O que esperar dos nossos serviços</h2>
					<p>
						Você precisará de uma conta para acessar a maioria dos nossos serviços.
						Partes dos serviços, como navegação e pesquisa de tecnologia, podem ser
						usadas sem necessidade de um cadastro. A criação da sua conta na Plataforma
						Sabiá permitirá o acesso ao cadastro de tecnologia, ao investidores, aos
						fóruns de discussão, dentre outros serviços.
					</p>
					<p>
						A Plataforma Sabiá fornecerá um canal para difusão de tecnologia de forma a
						torná-la visível aos demais agentes cadastrados. Será possível que você
						cadastre sua tecnologia, procure e entre em contato com outros detentores de
						tecnologia, classifique e dê opiniões, bem como participe de fóruns de
						discussões sobre variados assuntos.
					</p>
					<p>
						Pela plataforma online, uma vez realizada a inserção dos dados, a tecnologia
						passará a ser difundida através de informações customizadas para cada
						usuário, seguindo o processo de parametrização.
					</p>
					<p>
						O conteúdo do serviço incluirá textos (dentro dos comentários e fóruns),
						imagens, fotos, vídeos, diagramas, fluxogramas, documentos em geral, marcas,
						patentes, recursos interativos e outros materiais que são fornecidos pelo
						usuário, pela Plataforma Sabiá ou por terceiros.
					</p>
					<p>
						De forma a sempre procurar evoluir, a Plataforma Sabiá poderá adicionar ou
						remover recursos e funcionalidades, além de aumentar ou diminuir a extensão
						dos serviços ofertados, como parte de uma melhoria contínua. Caso eventual
						mudança tenha impacto na experiência do usuário, nós entraremos em contato e
						o avisaremos com a devida antecedência.
					</p>
					<p>
						Nós nos comprometemos em manter nossos serviços em pleno funcionamento.
						Entretanto, como todo serviço online, poderemos sofrer paradas ocasionais ou
						interrupções. Por este motivo, a plataforma não se responsabiliza por
						eventuais perdas que o usuário venha a sofrer em decorrência disso.
					</p>
					<h2>4 Do cadastro do usuário</h2>
					<p>
						Você poderá criar sua conta na Plataforma Sabiá através de um cadastro
						online. Para isso, serão solicitadas algumas informações básicas, como seu
						nome e endereço de e-mail. O seu cadastro somente será autorizado quando
						todos os campos destinados às informações pessoais forem preenchidos.
					</p>
					<p>
						O usuário se compromete a não fornecer informações falsas, imprecisas ou
						enganosas. Também será de responsabilidade do usuário manter seus dados
						atualizados, se ocorrer alguma modificação necessária.
					</p>
					<p>
						É importante que você proteja sua conta e mantenha seus dados confidenciais
						em segurança. Não compartilhe sua senha com terceiros. A Plataforma Sabiá
						não se responsabilizará pelas consequências advindas da divulgação indevida
						da sua senha pelo usuário.
					</p>
					<p>
						Caso você esteja usando os serviços da plataforma em nome de organização,
						entidade, empresa ou empregador, você declara que tem autoridade legal para
						agir em seu nome, com o devido aceite a estes Termos de Uso.
					</p>
					<p>
						Quando precisarmos informar algo relacionado aos nossos serviços, enviaremos
						para você avisos, que poderão ser por notificação “Push”, por e-mail e
						afins. Poderemos enviar uma mensagem de SMS para você para verificar sua
						identidade ao vincular um número de telefone à sua conta de usuário. Taxas
						podem ser cobradas pela operadora ao receber notificações por SMS.
					</p>
					<h3>4.1 Do usuário comum</h3>
					<p>
						Após realizar o cadastro inicial e começar a usar nossos serviços, o usuário
						passará a nos conceder determinados direitos, como permitir que a Plataforma
						Sabiá utilize sua banda larga para operação dos serviços, bem como permitirá
						que lhe mostremos publicidades e outras informações, que poderão estar
						presentes em nossos conteúdos.
					</p>
					<p>
						Caso você forneça algum feedback, comentários, ideias ou sugestões para a
						Plataforma Sabiá relacionados aos serviços prestados, você reconhece que
						esse conteúdo não será confidencial e nos autoriza que o utilizemos sem
						restrições ou necessidade de pagamentos.
					</p>
					<p>
						O usuário poderá solicitar o encerramento de sua conta por qualquer motivo e
						a qualquer momento. Para que a exclusão de sua conta seja possível, é
						necessário que o usuário desative todas as tecnologias que tenha cadastrado
						e pela qual é responsável ou transfira para outro usuário a responsabilidade
						pela tecnologia. Quando a solicitação de encerramento é feita pelo usuário,
						será realizada a exclusão permanente de sua conta e de todos os seus dados.
						Consequentemente, você não poderá mais acessar nossos serviços por esta
						conta e qualquer conteúdo e tecnologia por ela cadastrados.
					</p>
					<p>
						Por determinação legal, após a exclusão da sua conta na plataforma,
						poderemos utilizar algumas informações fornecidas durante o uso, por prazo e
						determinação legal e sempre sob sigilo, de forma controlada e com segurança,
						para determinados fins, que podem ser consultados em nossa Política de
						Privacidade.
					</p>
					<h3>4.2 Do usuário investidor</h3>
					<p>
						Alguns usuários serão cadastrados como usuários investidores. Além dos
						serviços prestados pela plataforma para o usuário comum, os investidores
						terão algumas funcionalidades exclusivas, como visualizar detalhes
						financeiros das tecnologias cadastradas que não estarão disponíveis para o
						público geral.
					</p>
					<p>
						O usuário investidor terá acesso às tecnologias cadastradas a partir do
						primeiro nível de maturidade, bem como informações como o custo de
						investimento, de implantação, de manutenção, da necessidade de financiamento
						e tipo, valor e situação do financiamento. Além disso, também terá acesso ao
						Banco de Pesquisadores e ao Banco de Oportunidades.
					</p>
					<p>
						Caso a conta do investidor esteja vinculada a uma organização, entidade,
						empresa ou empregador, este ficará ciente que o proprietário do domínio
						associado à conta poderá receber informações ou ser notificado da existência
						de sua conta, podendo controlar os conteúdos administrados, bem como acessar
						seus dados, incluindo mensagens e comentários. Da mesma forma, o usuário
						investidor fica ciente de que estará sujeito aos contratos que a Plataforma
						Sabiá firmar com a organização, entidade, empresa ou empregador ao qual
						estiver vinculado.
					</p>
					<h3>4.3 Do usuário curador</h3>
					<p>
						Após a realização do cadastro como usuário comum, você poderá contribuir
						para a plataforma se cadastrando como usuário curador. A solicitação para
						ser curador será avaliada pela equipe da plataforma e poderá ou não ser
						aprovada, seguindo critérios internos. O curador terá a função de avaliar as
						informações cadastradas pelos usuários, checar sua coerência e consistência,
						desde que estejam dentro da sua área de especialidade.
					</p>
					<p>
						A atividade como curador está sujeita a estes Termos e pode exigir que o
						usuário aceite condições e regras adicionais, como os critérios a serem
						seguidos para a devida avaliação das informações que serão prestadas pelos
						detentores de tecnologia. A violação destes Termos poderá resultar em
						suspensão da situação de curador. A Plataforma Sabiá reserva para si o
						direito de suspender o status de qualquer curador a qualquer momento.
					</p>
					<p>
						Para mais informações sobre a função do curador, você pode checar o item 6
						destes Termos de Uso.
					</p>
					<h3>4.4 Do usuário administrador</h3>
					<p>
						Dentro da Plataforma Sabiá, serão cadastrados usuários administradores.
						Estes terão a função de prestar suporte administrativo para a plataforma e
						poderão estar encarregados dos mais variados serviços, como a gestão da
						plataforma ou a seleção dos investidores e dos curadores da plataforma.
					</p>
					<p>
						O usuário administrador também estará sujeito aos termos aqui presentes e
						qualquer violação poderá ser denunciada por você através de nossos canais de
						suporte ao usuário.
					</p>
					<h2>5 Do cadastro da tecnologia e do conteúdo do usuário</h2>
					<p>
						Se você criou sua conta na Plataforma Sabiá, poderá realizar o cadastro da
						tecnologia que detém e deseja difundir na nossa plataforma. Você deve
						atentar para os conteúdos que não estão em conformidade com estes Termos ou
						com a legislação vigente. Será proibida a inclusão de material que não seja
						de sua autoria, que viole a lei ou que contenham propriedade intelectual de
						terceiros, exceto por permissão destes ou autorização legal.
					</p>
					<p>
						Ao iniciar o cadastro da sua tecnologia, serão solicitadas algumas
						informações que consideramos importantes. Essas informações podem conter
						detalhes como a definição da tecnologia, sua classificação, seu
						público-alvo, seus objetivos, os riscos a ela associados, os custos e
						financiamentos, a existência de propriedade intelectual cadastrada, seu
						georreferenciamento, dentre outros dados.
					</p>
					<p>
						As tecnologias serão classificadas na Plataforma Sabiá por estágios de
						maturidade. A maturidade da tecnologia será medida utilizando a escala TRL
						(Technology Readiness Levels), em 9 níveis. Somente serão publicadas na
						plataforma as tecnologias do nível 7 ao 9 e que passaram pela aprovação dos
						nossos curadores, pois são as que consideramos adequadas para
						disponibilidade mercadológica. Tecnologias cadastradas do nível 1 ao 6 não
						serão publicadas, ou seja, seus dados ficarão privados. Entretanto, você
						poderá ter acesso ao banco de investidores e parceiros para o
						desenvolvimento do seu projeto, até que a tecnologia atinja a maturidade
						necessária para publicação.
					</p>
					<p>
						O usuário é exclusivamente responsável pelo conteúdo que disponibiliza em
						nossa plataforma. A Plataforma Sabiá não é responsável nem endossa qualquer
						opinião que venha a transparecer em qualquer conteúdo do usuário. Todo o
						conteúdo que você incluir no cadastro de sua tecnologia poderá ser revisado
						por nossa equipe administrativa ou pelos nossos curadores, e serão excluídas
						da plataforma caso detectemos as violações descritas acima ou formos
						autorizados ou obrigados por lei. Quando apropriado, enviaremos uma
						notificação especificando o motivo da remoção do seu conteúdo. Caso isso
						aconteça e você se sinta lesado ou se teve seu conteúdo excluído
						erroneamente, entre em contato, através dos nossos meios de suporte, para
						solucionarmos esse problema.
					</p>
					<p>
						O usuário manterá o direito de propriedade de todo o conteúdo que
						disponibilizar na plataforma. Entretanto, nos serão cedidos alguns direitos
						de licença (não exclusiva, transferível, sublicenciável, livre de royalties
						e internacional) a fim de que a Plataforma Sabiá possa realizar os seus
						serviços, como o uso, a distribuição, a reprodução, a disponibilização ao
						público e a execução desse conteúdo para os demais usuários. Essa licença
						continuará em vigor na extensão máxima permitida pela lei aplicável após a
						exclusão dos dados na plataforma.
					</p>
					<h2>6 Do processo de curadoria</h2>
					<p>
						A curadoria terá a função, dentro da Plataforma Sabiá, de checar as
						informações submetidas pelos usuários no momento de cadastro das
						tecnologias. A equipe validará as tecnologias de acordo com critérios de
						coesão, coerência e confiabilidade dos dados, pensando sempre nos usuários
						finais.
					</p>
					<p>
						O curador não será responsável por validar a tecnologia ou fazer qualquer
						valoração sobre os seus detentores, restringindo-se somente à análise dos
						dados e das informações sobre cada tecnologia. O usuário curador só poderá
						avaliar e validar as informações que forem de sua área de estudo ou
						categoria.
					</p>
					<p>
						Nesse processo, o curador dos dados pode entrar em contato com o detentor da
						tecnologia, através do respectivo canal disponível na plataforma, para
						conferir certos dados e, quando for o caso, fazer as alterações necessárias.
						Após a validação das informações pelos curadores, as tecnologias passarão a
						ser disponibilizadas na plataforma para acesso de todos os outros usuários.
					</p>
					<p>
						O usuário curador ficará ciente que suas avaliações, feedbacks ou
						comentários de qualquer natureza que estejam vinculados à função de
						curadoria não obrigarão a Plataforma Sabiá com restrições ou necessidade de
						pagamento de qualquer natureza. Da mesma forma, o usuário também estará
						ciente que suas ações como curador estarão sujeitas a estes Termos e poderão
						ser revistas por nossa equipe administrativa a qualquer momento, por motivos
						internos ou por denúncia de violação por outros usuários.
					</p>
					<h2>7 Das obrigações</h2>
					<p>
						Ao se cadastrar na Plataforma Sabiá, você assumirá determinadas obrigações,
						que poderão variar a depender da categoria de usuário que você esteja
						inserido. Dessa forma, cada tipo de usuário assumirá obrigações específicas.
						Todavia, excluídas as particularidades listadas, o Investidor, o Curador e o
						Administrador assumem todas as obrigações dos Usuários (item 7.2).
					</p>
					<h3>7.1 A Plataforma Sabiá se obriga a:</h3>
					<ul>
						<li>Tratar com equidade todos os usuários cadastrados na plataforma.</li>
						<li>
							Realizar auditorias periódicas quanto às informações disponibilizadas
							pelos usuários na plataforma.
						</li>
						<li>
							Tornar públicas as avaliações de satisfação das tecnologias adquiridas.
						</li>
						<li>
							Manter a plataforma de canal de difusão de tecnologias e oportunidades
							de negócios em pleno funcionamento.
						</li>
						<li>
							Publicar as alterações e atualizações dos Termos e Condições de Uso e da
							Política de Privacidade. Mesmo assim, os usuários devem acompanhar as
							atualizações e alterações, e a simples utilização da plataforma faz
							presumir aceitação das novas disposições.
						</li>
						<li>
							Disponibilizar os arquivos anteriores dos Termos e Condições de Uso e da
							Política de Privacidade da plataforma, caso sejam necessárias alterações
							e/ou modificações nos documentos.
						</li>
						<li>
							Realizar esforços para diminuir o risco de problemas técnicos na
							plataforma.
						</li>
						<li>
							Utilizar sólidos recursos de segurança contra acesso, alteração,
							destruição e divulgação não autorizada dos dados fornecidos.
						</li>
						<li>
							Realizar monitoramento e testes de segurança constantemente nos
							servidores a fim de preservar os dados dos usuários de maneira contínua.
						</li>
						<li>
							Comunicar ao usuário, através de mensagem enviada por e-mail e/ou pelos
							demais meios de comunicação disponibilizados na realização do cadastro,
							eventual violação aos dados fornecidos à plataforma.
						</li>
						<li>
							Advertir, suspender e/ou encerrar as contas dos usuários, caso sejam
							necessárias aplicações de penalidades, conforme disposto no item 8.
						</li>
					</ul>
					<h3>7.2 Os usuários ficam obrigados a:</h3>
					<ul>
						<li>
							Fornecer informações verdadeiras e exatas na realização do cadastro e,
							quando solicitado, durante a utilização da plataforma.
						</li>
						<li>
							Manter as informações de cadastro sempre atualizadas, sendo inteiramente
							responsável pela veracidade dos dados fornecidos.
						</li>
						<li>
							Fornecer todos os documentos e informações solicitados pela Plataforma
							Sabiá.
						</li>
						<li>
							Não divulgar, transferir e/ou disponibilizar os dados pessoais
							cadastrados na plataforma a terceiros.
						</li>
						<li>
							Comunicar eventual discrepância constatada nos dados e informações por
							eles cadastrados e divulgados pela Plataforma Sabiá.
						</li>
						<li>
							Responder pelo uso incorreto, indevido e/ou fraudulento da Plataforma
							Sabiá.
						</li>
						<li>
							Não utilizar a Plataforma Sabiá para fins ilícitos e/ou proibidos, sendo
							exclusivamente responsáveis por eventuais danos causados a terceiros, à
							Administração Pública e ao próprio serviço da plataforma.
						</li>
						<li>
							Não utilizar informações presentes na plataforma, inclusive das próprias
							tecnologias cadastradas, para fins de exploração comercial sem o
							necessário consentimento.
						</li>
						<li>
							Não divulgar materiais que violem direitos de outros indivíduos, tais
							como direitos de propriedade intelectual, direitos autorais e direitos
							de proteção de dados.
						</li>
					</ul>
					<h3>7.3 O investidor se obriga a:</h3>
					<ul>
						<li>
							Incentivar o desenvolvimento das tecnologias cadastradas na Plataforma
							Sabiá.
						</li>
						<li>Satisfazer todas as obrigações dos usuários, conforme item 7.2.</li>
					</ul>
					<h3>7.4 O curador fica obrigado a:</h3>
					<ul>
						<li>
							Avaliar as tecnologias cadastradas na plataforma de forma imparcial.
						</li>
						<li>Analisar o nível das tecnologias cadastradas.</li>
						<li>
							Avaliar as informações cadastradas pelos usuários, checar sua coerência
							e consistência.
						</li>
						<li>Cumprir as obrigações dos usuários (item 7.2) em sua integralidade.</li>
					</ul>
					<h3>7.5 O administrador se obriga a:</h3>
					<ul>
						<li>
							Realizar a gestão da Plataforma Sabiá, sendo encarregado de selecionar
							os investidores e os curadores da plataforma.
						</li>
						<li>Prestar suporte administrativo à plataforma.</li>
						<li>
							Desempenhar, integralmente, as obrigações dos usuários, de acordo com o
							item 7.2.
						</li>
					</ul>
					<h2>8 Das penalidades e exclusões de conteúdos</h2>
					<p>
						Os usuários deverão utilizar a Plataforma Sabiá com probidade, boa-fé e de
						acordo com a legislação vigente, sendo inteiramente responsáveis pelas
						condutas lesivas a direitos de terceiros, ao próprio serviço de difusão de
						tecnologias e oportunidade de negócios disponibilizado pela plataforma e à
						Administração Pública.
					</p>
					<p>
						Sem prejuízo de responsabilização civil contratual e/ou extracontratual e
						adoção das medidas penais aplicáveis ao caso, a Plataforma Sabiá se reserva
						ao direito de advertir, suspender, de modo temporário ou definitivo, ou,
						caso assim seja necessário, encerrar a conta do usuário que:
					</p>
					<ul>
						<li>
							Violar qualquer disposição destes Termos e Condições de Uso e demais
							políticas da Plataforma Sabiá.
						</li>
						<li>Transgredir com seus deveres enquanto usuário.</li>
						<li>Praticar atos fraudulentos ou dolosos.</li>
						<li>
							Prestar informações inexatas e inverídicas na realização do cadastro
							e/ou na utilização da plataforma.
						</li>
						<li>Utilizar a plataforma indevidamente, ocasionando danos a terceiros.</li>
						<li>
							Utilizar os serviços disponibilizados pela plataforma para fins ilícitos
							ou proibidos.
						</li>
						<li>
							Publicar material ilícito, difamatório ou proibido, que viole a
							privacidade de terceiros, ou que seja discriminatório, ameaçador,
							violento, obsceno, calunioso ou abusivo.
						</li>
						<li>
							Divulgar materiais que violem direitos de terceiros, a exemplo de
							direitos de propriedade intelectual, direitos autorais e direitos de
							proteção de dados de outras pessoas.
						</li>
						<li>
							Utilizar informações presentes na plataforma, inclusive das próprias
							tecnologias cadastradas, para fins de exploração comercial sem o devido
							consentimento.
						</li>
						<li>
							Propagar, de maneira intencional ou não, arquivos corrompidos, vírus,
							worms ou qualquer outro software com potencial de colocar em risco os
							serviços disponibilizados pela Plataforma Sabiá.
						</li>
					</ul>
					<p>
						Caso verificados conteúdos violem estes Termos e Condições de Uso e a
						legislação vigente e/ou se forem necessárias as aplicações das mencionadas
						penalidades, a Plataforma Sabiá se reserva ao direito de excluir, ao seu
						próprio critério, os referidos materiais.
					</p>
					<p>
						Além disso, se assim for necessário, antes de encerrar a conta dos usuários
						infratores, as tecnologias eventualmente cadastradas por eles também serão
						inativadas da plataforma.
					</p>
					<h2>9 Da avaliação de qualidade feita pelo usuário</h2>
					<p>
						O usuário poderá avaliar a tecnologia cadastrada na Plataforma Sabiá. Esta é
						uma ferramenta importante, representando a liberdade de expressão do usuário
						da plataforma a respeito da sua satisfação em relação à tecnologia. A
						avaliação poderá ser realizada através de formulário próprio dentro da
						própria plataforma e conterá os seguintes requisitos:
					</p>
					<ul>
						<li>
							Nota sobre a tecnologia, a depender do grau de satisfação, que variará
							de 1 a 5 estrelas.
						</li>
						<li>
							Comentários sobre a tecnologia, informando se está sendo implantada, se
							foi implementada ou se houve desistência na implementação.
						</li>
						<li>Pontos positivos e negativos da tecnologia.</li>
						<li>Imagens fotográficas ou vídeos nítidos da tecnologia.</li>
					</ul>
					<p>
						A Plataforma Sabiá não realiza o monitoramento das avaliações, das notas,
						dos comentários e das opiniões sobre as tecnologias, eximindo-se da
						responsabilidade de averiguar a autenticidade das informações. Todavia, a
						Plataforma Sabiá poderá, a seu critério, excluir ou editar os comentários de
						cunho eminentemente ofensivo, difamatório, ameaçador, violento, obsceno,
						calunioso ou abusivo, bem como aqueles que violem qualquer disposição destes
						Termos e Condições de Uso e da legislação vigente.
					</p>
					<h2>
						10 Do direito de propriedade intelectual sobre os recursos da plataforma
					</h2>
					<p>
						A estrutura do site e os elementos nele constantes, como as imagens
						gráficas, os recursos interativos, os sons, os vídeos, as fotografias, os
						scripts, os textos, os softwares e as demais aplicações informáticas são de
						inteira propriedade da Plataforma Sabiá e são protegidas pela legislação
						brasileira relativa à Propriedade Intelectual.
					</p>
					<p>
						Não admitimos qualquer tipo de reprodução, cópia, utilização, distribuição,
						difusão, transmissão, comercialização e exploração desses elementos para
						qualquer fim sem expressa autorização prévia, sob pena de responsabilização
						civil contratual e/ou extracontratual e adoção das medidas penais cabíveis.
					</p>
					<p>
						O cadastro e acesso à plataforma não gera direito de propriedade intelectual
						sobre os elementos gráficos, interativos, audiovisuais e demais aplicações
						informáticas nela contidos, sendo de inteira e exclusiva propriedade da
						Plataforma Sabiá.
					</p>
					<h2>11 Do canal de suporte aos usuários</h2>
					<p>
						Ficará à disposição dos usuários suporte técnico, que poderá ser realizado
						através do e-mail contato@plataformasabia.com.br, ou por meio da central de
						atendimento presente na própria Plataforma Sabiá.
					</p>
					<p>
						O canal de suporte diz respeito ao meio de comunicação entre a Plataforma
						Sabiá e os seus usuários e, através dele, serão sanadas eventuais dúvidas,
						realizadas reclamações e denúncias pela má utilização da plataforma e pela
						violação de qualquer disposição destes Termos e Condições de Uso.
					</p>
					<p>
						Logo que possível, as solicitações serão respondidas, sanando as dúvidas
						indicadas, apresentando medidas para solucionar os atos que ocasionaram as
						reclamações dos usuários e/ou, se assim for necessário, adotando
						providências em relação às denúncias apontadas, com base na legislação
						brasileira vigente e nestes Termos e Condições de Uso.
					</p>
					<h2>12 Sobre a privacidade dos seus dados</h2>
					<p>
						A privacidade dos seus dados é muito importante para nós. Para tanto,
						possuímos a nossa Política de Privacidade, a qual contém um conjunto de
						informações que descrevem quais os dados dos usuários serão armazenados,
						coletados, utilizados, compartilhados e processados para viabilizar a
						realização dos serviços prestados pela Plataforma Sabiá. A exemplo destes
						Termos e Condições de Uso, você deverá ler e aceitar a Política de
						Privacidade antes de usufruir dos serviços disponibilizados pela plataforma.
					</p>
					<h2>13 Modificações nestes termos e condições de uso</h2>
					<p>
						Visando ao aprimoramento e melhoria dos serviços prestados, estes Termos e
						Condições de Uso poderão ser modificados ou atualizados a qualquer momento.
						Portanto, recomenda-se que os usuários visitem-nos com frequência para que
						fiquem cientes das eventuais alterações realizadas.
					</p>
					<p>
						Mesmo assim, as possíveis alterações e atualizações serão publicadas e, em
						caso de significativa modificação, realizaremos contato, através de
						notificação “Push”, por e-mail e afins, aos usuários cadastrados. Os
						usuários expressarão concordância com as novas disposições dos Termos e
						Condições de Uso ao acessar a Plataforma Sabiá após as modificações e/ou
						atualizações realizadas.
					</p>
					<p>
						Caso não concorde com os novos termos, você deverá interromper o uso dos
						serviços disponibilizados e realizar o encerramento da conta da Plataforma
						Sabiá.
					</p>
					<h2>14 Sobre o aprimoramento das funcionalidades da plataforma</h2>
					<p>
						Com o objetivo de aprimorar os serviços disponibilizados, as funcionalidades
						da Plataforma Sabiá poderão ser alteradas constantemente. Caso seja
						necessária a realização de descontinuidade temporária da plataforma para a
						realização dos devidos aprimoramentos ou se nela forem realizadas
						modificações significativas, nós enviaremos, se possível, um comunicado,
						através de notificação “Push”, por e-mail e afins, para que você fique
						devidamente informado. Todavia, você fica ciente de que poderemos realizar
						alterações na plataforma sem qualquer aviso prévio, a depender da urgência e
						necessidade das modificações.
					</p>
					<h2>15 Isenções e limitações de responsabilidade</h2>
					<p>
						Os serviços disponibilizados pela Plataforma Sabiá são prestados “como
						estão”, sem qualquer garantia expressa ou implícita sobre eles. Dessa forma,
						a Plataforma Sabiá não estabelece qualquer garantia sobre:
					</p>
					<ul>
						<li>A capacidade dos serviços atenderem às suas necessidades.</li>
						<li>
							A disponibilidade, precisão, fidedignidade e segurança das tecnologias
							ofertadas através dos serviços disponibilizados pela plataforma.
						</li>
						<li>
							A qualidade satisfatória dos materiais e conteúdos oferecidos por meio
							dos serviços da Plataforma Sabiá.
						</li>
					</ul>
					<p>
						A Plataforma Sabiá é apenas um canal de difusão de tecnologias e
						oportunidades de negócios, ficando inteiramente eximida de responsabilidades
						oriundas de condutas danosas dos usuários em decorrência da má utilização da
						plataforma e/ou por atos danosos praticados por terceiros de má-fé, a
						exemplo de ataques de hackers e crackers.
					</p>
					<p>Além disso, a Plataforma Sabiá também não será responsabilizada:</p>
					<ul>
						<li>
							Pelas declarações inautênticas prestadas pelos usuários que
							eventualmente provoquem danos a terceiros, ao próprio serviço
							disponibilizado pela plataforma e à Administração Pública.
						</li>
						<li>
							Pelas informações acerca da Propriedade Intelectual das tecnologias
							cadastradas, sendo estas de inteira responsabilidade dos usuários.
						</li>
						<li>
							Pelos materiais ilícitos, difamatórios ou proibidos publicados por
							usuários e/ou por terceiros.
						</li>
						<li>
							Pelos eventuais danos e prejuízos suportados pelos usuários em
							decorrência de falhas no servidor e/ou no sistema utilizado, provocadas
							por atos de terceiros, caso fortuito ou força maior.
						</li>
						<li>
							Por vírus que possam atacar o aparelho eletrônico pelo qual a Plataforma
							Sabiá é utilizada, em virtude do acesso ou navegação na internet.
						</li>
						<li>
							Pelos materiais, conteúdos e serviços prestados por parceiros da
							Plataforma Sabiá, muito menos por perdas e danos ocasionados por atos
							destes parceiros.
						</li>
						<li>Pelo cumprimento das obrigações assumidas pelos usuários.</li>
						<li>
							Pelos lucros cessantes, danos e/ou prejuízos que os usuários possam
							sofrer ao disponibilizar e/ou adquirir uma tecnologia cadastrada na
							plataforma.
						</li>
						<li>
							Por qualquer dano ocasionado pelo uso não autorizado, por parte de
							terceiros, das informações cadastradas e disponibilizadas pelos
							usuários.
						</li>
						<li>
							Por falha e/ou atrasos na execução das nossas obrigações assumidas
							nestes Termos até a extensão de que a falha e/ou o atraso seja provocado
							por circunstâncias que vão além do controle razoável da Plataforma
							Sabiá.
						</li>
					</ul>
					<h2>16 Indenizações</h2>
					<p>
						Você aceita indenizar e isentar de responsabilidade a Plataforma Sabiá, seus
						administradores e parceiros contra qualquer tipo de perda, dano, dívidas e
						despesas (incluindo honorários advocatícios) em virtude (i) da violação de
						qualquer disposição destes Termos e Condições de Uso; (ii) da violação de
						qualquer direito de terceiros, a exemplo dos direitos de propriedade
						intelectual, direitos autorais e direitos de proteção de dados; e (iii)
						alegações de que seus conteúdos e condutas na utilização da plataforma
						causaram danos a terceiros e à Administração Pública.
					</p>
					<h2>17 Disposições finais</h2>
					<p>
						A Plataforma Sabiá permanecerá à disposição dos usuários por tempo
						indeterminado. Contudo, os serviços da plataforma poderão ser suspensos ou
						interrompidos em caso de determinação judicial ou se forem necessárias
						realizações de melhorias e aprimoramentos para o seu pleno funcionamento,
						conforme item 14 destes Termos e Condições de Uso.
					</p>
					<p>
						A declaração de invalidade, ilegalidade ou inexequibilidade de qualquer
						determinação presente nestes Termos e Condições de Uso não afetará a
						validade, legalidade ou exequibilidade das demais cláusulas, termos ou
						disposições aqui presentes. Caso isso aconteça, poderemos alterar estes
						Termos, conforme disposto no item 13.
					</p>
					<p>
						Os usuários ficam cientes de que a Plataforma Sabiá é apenas um canal de
						difusão de tecnologias e oportunidades de negócios. Desse modo, em hipótese
						alguma será constituído vínculo cooperativo, associativo, societário ou
						empregatício entre a plataforma, os usuários cadastrados e os parceiros.
					</p>
					<p>
						Caso surjam conflitos relacionados à interpretação, à validade, à
						exigibilidade ou ao cumprimento de qualquer disposição presente nestes
						Termos e Condições de Uso, serão aplicadas as leis do ordenamento jurídico
						da República Federativa do Brasil.
					</p>
					<p>
						As partes elegem o foro da Comarca de Mossoró, no Estado do Rio Grande do
						Norte, como competente para dirimir eventuais controvérsias acerca da
						interpretação, validade, exigibilidade e do cumprimento das cláusulas do
						presente Termo.
					</p>
				</Box>
			</ContentContainer>
		</>
	);
};

TermsOfUse.getInitialProps = async () => {
	return {
		namespacesRequired: ['pages'],
	};
};

export default TermsOfUse;
