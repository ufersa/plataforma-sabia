import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { InputField, TextField, SelectField, SwitchField } from '../Form';
import { ColumnContainer, Column } from '../Common';
import { mapArrayOfObjectToSelect } from '../../utils/helper';
import { getTaxonomyTerms } from '../../services';

const AboutTechnology = ({ form, data }) => {
	const { watch, setValue } = form;
	const category = watch('terms.category');
	const [subCategories, setSubCategories] = useState([]);
	const { taxonomies } = data;
	const categoryValue = category?.value;
	useEffect(() => {
		if (categoryValue) {
			getTaxonomyTerms('category', { parent: categoryValue }).then((subcategories) => {
				setSubCategories(subcategories);
			});
		}
	}, [categoryValue, setValue]);

	return (
		<ColumnContainer>
			<Column>
				<InputField
					form={form}
					name="title"
					label="Título da Tecnologia"
					placeholder="Insira o título da tecnologia"
					validation={{ required: true }}
					help={<p>Nome que identifica a sua tecnologia na plataforma.</p>}
				/>
				<TextField
					form={form}
					name="description"
					label="Descrição da Tecnologia"
					placeholder="Descreva resumidamente a tecnologia"
					validation={{ required: true }}
					help={<p>Descreva de forma sucinta o que é a sua tecnologia.</p>}
				/>
				<SelectField
					form={form}
					name="terms.target_audience"
					placeholder="Escolha pelo menos um"
					label="Público-alvo da tecnologia"
					isMulti
					validation={{ required: true }}
					help={<p>A sua tecnologia se destina a quais públicos-alvos?</p>}
					options={mapArrayOfObjectToSelect(
						taxonomies?.target_audience?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.biome"
					placeholder="Escolha um termo"
					label="Bioma Principal da Tecnologia"
					help={<p>Informe o bioma principal de indicação da tecnologia</p>}
					validation={{ required: true }}
					options={mapArrayOfObjectToSelect(taxonomies?.biome?.terms, 'term', 'id')}
				/>
				<SelectField
					form={form}
					name="terms.government_program"
					placeholder="Busque por um programa de governo (pode adicionar mais de um)"
					label="Programa de Governo"
					isMulti
					validation={{ required: false }}
					help={
						<p>
							Se a sua tecnologia faz parte de algum incentivo de programa
							<br /> de governo, especifique qual o programa.
						</p>
					}
					options={mapArrayOfObjectToSelect(
						taxonomies?.government_program?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.keywords"
					placeholder="Busque por palavras chaves (pode adicionar mais de um)"
					label="Palavras-chave"
					isMulti
					validation={{ required: true }}
					help={<p>Palavras-chave</p>}
					options={mapArrayOfObjectToSelect(taxonomies?.keywords?.terms, 'term', 'id')}
				/>
			</Column>
			<Column>
				<SelectField
					form={form}
					name="terms.stage"
					placeholder="Escolha o estágio TRL"
					label="Em qual estágio de maturidade está a sua tecnologia?"
					validation={{ required: true }}
					callback={(selected) => {
						// shows a message if the user selects a maturity level that is less than or equal to 6
						if (selected.label.split('Nível ')[1][0] <= 6) {
							toast.info(
								'ATENÇÃO: Só serão publicadas na Plataforma Sabiá as tecnologias do nível 7 a 9, pois tratam-se de projetos que já estão nas etapas de disponibilidade mercadológica. Tecnologias em níveis inferiores de maturidade poderão ser cadastradas apenas para ter acesso ao banco de investidores e parceiros para o desenvolvimento do projeto. Ao atingir a maturidade 7 ou superior serão analisadas pela curadoria para serem publicadas.',
								{ autoClose: false, toastId: 'maturity-level' },
							);
						}
					}}
					help={
						<p>
							A maturidade da tecnologia será medida utilizando a escala TRL
							(Technology Readiness Levels) em 9 níveis. Defina qual estágio está sua
							tecnologia: <br /> <br />
							<strong>Nível 1 - Princípios básicos observados e relatados</strong>
							<br />
							Neste nível estamos falando de atividades de pesquisa científica, do
							tipo acadêmica.
							<br /> Possíveis aplicações da tecnologia ainda estão no estágio
							inicial, sem definições conceituais.
							<br />
							<br />
							<strong>
								Nível 2 – Conceito e/ou aplicação da tecnologia formulados
							</strong>
							<br />
							São definidos os princípios básicos estudados no nível 1 e as aplicações
							conceituais são mencionadas de forma consistente, porém não
							necessariamente comprovada.
							<br />
							<br />
							<strong>
								Nível 3 – Prova de conceito analítica e experimental de
								características e/ou funções críticas
							</strong>
							<br />
							Envolve a prova de conceito, através de modelagem, simulação e
							experimentação. Os estudos analíticos e laboratoriais são essenciais
							para a validação do conceito. Após estas atividades a tecnologia avança
							para o próximo nível.
							<br />
							<br />
							<strong>
								Nível 4 – Verificação funcional de componente e/ou subsistema em
								ambiente laboratorial
							</strong>
							<br />
							A tecnologia ainda se encontra na fase de prova de conceito, sendo
							necessário neste nível a construção de um protótipo em estágio inicial
							para análise da funcionalidade de todos os componentes envolvidos,
							porém, ainda não representa o desempenho do sistema final por estar no
							ambiente laboratorial.
							<br />
							<br />
							<strong>
								Nível 5 – Verificação da função crítica do componente e/ou
								subsistema em ambiente relevante
							</strong>
							<br />
							Ao demonstrar as funções do elemento estudado em ambiente relevante, mas
							ainda em escala piloto, atingiu-se o nível 5. Neste nível há uma
							definição preliminar dos requisitos de desempenho do elemento e o
							projeto preliminar, pois testes mais detalhados são realizados. Uma
							incerteza está relacionada à funcionalidade do elemento após o aumento
							de escala.
							<br />
							<br />
							<strong>
								Nível 6 – Demonstração do modelo de protótipo de sistema/subsistema
								em ambiente relevante
							</strong>
							<br />
							A tecnologia encontra-se no nível 6 quando o desempenho geral do modelo
							proposto está demonstrado. Neste estágio, a tecnologia está pronta para
							a realização dos testes finais, visando a aplicação final e
							comercialização.
							<br />
							<br />
							<strong>
								Nível 7 – Demonstração do protótipo de sistema/subsistema em
								ambiente operacional
							</strong>
							<br />
							Neste nível são realizados ensaios com o protótipo, porém em ambiente
							operacional, utilizando os parâmetros reais, para análise da integração
							da tecnologia no sistema operacional. Neste estágio, há desenvolvimentos
							para a resolução de problemas de desempenho da tecnologia.
							<br />
							<br />
							<strong>Nível 8 – Sistema real desenvolvido e aprovado</strong>
							<br />
							O elemento é integrado no sistema final e está pronto para operar.
							<br />
							<br />
							<strong>
								Nível 9 – Sistema real desenvolvido e aprovado através de operações
								bem-sucedidas
							</strong>
							<br />
							É alcançado quando o elemento está integrado no sistema final e
							operando.
							<br />
							<br />
							<strong>ATENÇÃO:</strong>
							<br />
							Só serão publicadas na Plataforma Sabiá as tecnologias do nível 7 a 9,
							pois tratam-se de projetos que já estão nas etapas de disponibilidade
							mercadológica.
							<br /> Tecnologias em níveis inferiores de maturidade poderão ser
							cadastradas apenas para ter acesso ao banco de investidores e parceiros
							para o desenvolvimento do projeto. Quando atingir a maturidade 7 ou
							superior poderão ser publicadas.
							<br />
						</p>
					}
					options={mapArrayOfObjectToSelect(taxonomies?.stage?.terms, 'term', 'id')}
				/>
				<SwitchField
					form={form}
					name="patent"
					label="Tem patente?"
					help={
						<p>
							A sua tecnologia tem depósito do registro de proteção
							<br /> intelectual junto ao INPI?
						</p>
					}
				/>
				<SelectField
					form={form}
					name="terms.intellectual_property"
					placeholder="Escolha a proteção intelectual"
					label="Proteção Intelectual da tecnologia"
					validation={{ required: true }}
					help={
						<p>
							A Propriedade Intelectual é o que garante direitos em níveis
							<br /> industriais sobre aquilo que foi criado por alguém.
						</p>
					}
					options={mapArrayOfObjectToSelect(
						taxonomies?.intellectual_property?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.classification"
					placeholder="Escolha a classificação"
					label="Classifique sua tecnologia"
					validation={{ required: true }}
					help={
						<p>
							As tecnologias podem ser classificadas quanto à sua natureza, que podem
							ser:
							<br />
							<br />
							<strong>Avanços Tecnológicos:</strong>
							<br />
							São tecnologias que envolvem um conjunto de instrumentos, métodos
							<br /> e técnicas que visam a resolução de problemas.
							<br />
							<br />
							<strong>Tecnologia Social:</strong>
							<br />
							São tecnologias que podem ser utilizadas como ferramenta para resolver
							desafios sociais.
							<br /> Não necessariamente precisa ser algo novo, mas que ajude a
							solucionar problemas da sociedade.
							<br />
							<br />
							<strong>Inovação Social:</strong>
							<br />
							Produzem resultados que são orientados por necessidades e de caráter
							inovador, solucionando problemas da sociedade a longo prazo. Preocupa-se
							em solucionar desafios de ordem social, não necessariamente buscando
							aumento de lucro ou de competitividade. Podem se utilizar de tecnologias
							sociais como meio para solução dos problemas.
						</p>
					}
					options={mapArrayOfObjectToSelect(
						taxonomies?.classification?.terms,
						'term',
						'id',
					)}
				/>
				<SelectField
					form={form}
					name="terms.dimension"
					placeholder="Escolha a dimensão"
					label="Dimensão da tecnologia"
					validation={{ required: true }}
					help={
						<p>
							Em quais áreas a tecnologia contribui para o desenvolvimento sustentável
							da região:
							<br /> Ambiental, social, econômica, cultural ou política.
						</p>
					}
					options={mapArrayOfObjectToSelect(taxonomies?.dimension?.terms, 'term', 'id')}
				/>

				<SelectField
					form={form}
					name="terms.category"
					placeholder="Escolha a categoria"
					label="Categoria da Tecnologia"
					onChange={([selectedOption]) => {
						setValue('terms.subcategory', null);
						return selectedOption;
					}}
					validation={{ required: true }}
					help={
						<p>
							As categorias e subcategorias são áreas que associam
							<br /> a sua tecnologia com a região do semiárido.
						</p>
					}
					options={mapArrayOfObjectToSelect(taxonomies?.category?.terms, 'term', 'id')}
				/>

				<SelectField
					form={form}
					name="terms.subcategory"
					placeholder={
						subCategories.length > 0
							? 'Escolha a sub categoria'
							: 'Escolha uma categoria primeiro'
					}
					label="Sub-Categoria"
					validation={{ required: true }}
					help={
						<p>
							As categorias e subcategorias são áreas que associam
							<br /> a sua tecnologia com a região do semiárido.
						</p>
					}
					options={mapArrayOfObjectToSelect(subCategories, 'term', 'id')}
				/>
			</Column>
		</ColumnContainer>
	);
};

AboutTechnology.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
	data: PropTypes.shape({
		taxonomies: PropTypes.shape({}),
	}).isRequired,
};

AboutTechnology.defaultProps = {
	form: {},
};

export default AboutTechnology;
