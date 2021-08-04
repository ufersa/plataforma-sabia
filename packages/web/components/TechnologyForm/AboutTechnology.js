import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { toast } from '../Toast';
import { InputField, TextField, SelectField, SwitchField, RequiredInfo } from '../Form';
import { ColumnContainer, Column } from '../Common';
import { mapArrayOfObjectToSelect } from '../../utils/helper';
import { TYPES as typesEnum } from '../../utils/enums/technology.enums';
import { createTerm, getCNPQAreas } from '../../services';

const AboutTechnology = ({ form, data }) => {
	const { watch, setValue } = form;
	const {
		'knowledge_area_id[0]': greatArea,
		'knowledge_area_id[1]': area,
		'knowledge_area_id[2]': subArea,
		intellectual_property: intellectualProperty,
	} = watch([
		'knowledge_area_id[0]',
		'knowledge_area_id[1]',
		'knowledge_area_id[2]',
		'intellectual_property',
	]);

	const { taxonomies, greatAreas } = data;

	const { data: rawAreas = [], isValidating: isValidatingAreas } = useSWR(
		() => `get-area-from-${greatArea.value}`,
		() => getCNPQAreas(null, { level: 2, greatArea: greatArea.value }),
		{
			revalidateOnFocus: false,
		},
	);

	const { data: rawSubAreas = [], isValidating: isValidatingSubAreas } = useSWR(
		() => `get-subarea-from-${area.value}`,
		() => getCNPQAreas(null, { level: 3, area: area.value }),
		{
			revalidateOnFocus: false,
		},
	);

	const { data: rawSpecialities = [], isValidating: isValidatingSpecialities } = useSWR(
		() => `get-specialities-from-${subArea.value}`,
		() => getCNPQAreas(null, { level: 4, subArea: subArea.value }),
		{
			revalidateOnFocus: false,
		},
	);

	/**
	 * Handles creating a new term
	 *
	 * @param {string} inputValue The inserted input value.
	 * @param {string} taxonomy The taxonomy associated to the term
	 * @returns {Promise<object>} A promise that resolves to an object of shape { label, value }
	 */
	const onCreateTerm = async (inputValue, taxonomy) => {
		const term = await createTerm(inputValue, taxonomy);
		return { label: term.term, value: `${term.id}` };
	};

	return (
		<>
			<ColumnContainer>
				<Column>
					<RequiredInfo />
				</Column>
			</ColumnContainer>
			<ColumnContainer>
				<Column>
					<InputField
						form={form}
						name="title"
						label="Título da Tecnologia"
						placeholder="Insira o título da tecnologia"
						validation={{ required: true }}
					/>
					<TextField
						form={form}
						name="description"
						label="Descrição da Tecnologia"
						placeholder="Descreva resumidamente a tecnologia"
						validation={{ required: true }}
					/>
					<SelectField
						form={form}
						name="terms.target_audience"
						placeholder="Escolha pelo menos um"
						label="Público-alvo da tecnologia"
						creatable
						onCreate={(inputValue) => onCreateTerm(inputValue, 'TARGET_AUDIENCE')}
						isMulti
						validation={{ required: true }}
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
						creatable
						onCreate={(inputValue) => onCreateTerm(inputValue, 'KEYWORDS')}
						validation={{ required: true }}
						options={mapArrayOfObjectToSelect(
							taxonomies?.keywords?.terms,
							'term',
							'id',
						)}
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
							<>
								<p>
									A maturidade da tecnologia será medida utilizando a escala TRL
									(Technology Readiness Levels) em 9 níveis. Defina qual estágio
									está sua tecnologia:
								</p>
								<p>
									<strong>
										Nível 1 - Princípios básicos observados e relatados
									</strong>
								</p>
								<p>
									Neste nível estamos falando de atividades de pesquisa
									científica, do tipo acadêmica.
								</p>
								<p>
									Possíveis aplicações da tecnologia ainda estão no estágio
									inicial, sem definições conceituais.
								</p>
								<p>
									<strong>
										Nível 2 – Conceito e/ou aplicação da tecnologia formulados
									</strong>
								</p>
								<p>
									São definidos os princípios básicos estudados no nível 1 e as
									aplicações conceituais são mencionadas de forma consistente,
									porém não necessariamente comprovada.
								</p>
								<p>
									<strong>
										Nível 3 – Prova de conceito analítica e experimental de
										características e/ou funções críticas
									</strong>
								</p>
								<p>
									Envolve a prova de conceito, através de modelagem, simulação e
									experimentação. Os estudos analíticos e laboratoriais são
									essenciais para a validação do conceito. Após estas atividades a
									tecnologia avança para o próximo nível.
								</p>
								<p>
									<strong>
										Nível 4 – Verificação funcional de componente e/ou
										subsistema em ambiente laboratorial
									</strong>
								</p>
								<p>
									A tecnologia ainda se encontra na fase de prova de conceito,
									sendo necessário neste nível a construção de um protótipo em
									estágio inicial para análise da funcionalidade de todos os
									componentes envolvidos, porém, ainda não representa o desempenho
									do sistema final por estar no ambiente laboratorial.
								</p>
								<p>
									<strong>
										Nível 5 – Verificação da função crítica do componente e/ou
										subsistema em ambiente relevante
									</strong>
								</p>
								<p>
									Ao demonstrar as funções do elemento estudado em ambiente
									relevante, mas ainda em escala piloto, atingiu-se o nível 5.
									Neste nível há uma definição preliminar dos requisitos de
									desempenho do elemento e o projeto preliminar, pois testes mais
									detalhados são realizados. Uma incerteza está relacionada à
									funcionalidade do elemento após o aumento de escala.
								</p>
								<p>
									<strong>
										Nível 6 – Demonstração do modelo de protótipo de
										sistema/subsistema em ambiente relevante
									</strong>
								</p>
								<p>
									A tecnologia encontra-se no nível 6 quando o desempenho geral do
									modelo proposto está demonstrado. Neste estágio, a tecnologia
									está pronta para a realização dos testes finais, visando a
									aplicação final e comercialização.
								</p>
								<p>
									<strong>
										Nível 7 – Demonstração do protótipo de sistema/subsistema em
										ambiente operacional
									</strong>
								</p>
								<p>
									Neste nível são realizados ensaios com o protótipo, porém em
									ambiente operacional, utilizando os parâmetros reais, para
									análise da integração da tecnologia no sistema operacional.
									Neste estágio, há desenvolvimentos para a resolução de problemas
									de desempenho da tecnologia.
								</p>
								<p>
									<strong>Nível 8 – Sistema real desenvolvido e aprovado</strong>
								</p>
								<p>
									O elemento é integrado no sistema final e está pronto para
									operar.
								</p>
								<p>
									<strong>
										Nível 9 – Sistema real desenvolvido e aprovado através de
										operações bem-sucedidas
									</strong>
								</p>
								<p>
									É alcançado quando o elemento está integrado no sistema final e
									operando.
								</p>
								<p>
									<strong>ATENÇÃO:</strong>
								</p>
								<p>
									Só serão publicadas na Plataforma Sabiá as tecnologias do nível
									7 a 9, pois tratam-se de projetos que já estão nas etapas de
									disponibilidade mercadológica.
								</p>
								<p>
									Tecnologias em níveis inferiores de maturidade poderão ser
									cadastradas apenas para ter acesso ao banco de investidores e
									parceiros para o desenvolvimento do projeto. Quando atingir a
									maturidade 7 ou superior poderão ser publicadas.
								</p>
							</>
						}
						options={mapArrayOfObjectToSelect(taxonomies?.stage?.terms, 'term', 'id')}
					/>
					<SwitchField
						form={form}
						name="intellectual_property"
						label="Tem proteção intelectual?"
						help={
							<p>
								A Propriedade Intelectual é o que garante direitos em níveis
								industriais sobre aquilo que foi criado por alguém.
							</p>
						}
					/>
					<SwitchField
						form={form}
						name="patent"
						label="Tem registro de patente?"
						isHidden={!intellectualProperty}
						help={
							<p>
								A sua tecnologia tem depósito do registro de proteção intelectual
								junto ao INPI?
							</p>
						}
					/>
					<SwitchField form={form} name="public_domain" label="É de domínio público?" />
					<SelectField
						form={form}
						name="terms.classification"
						placeholder="Escolha a classificação"
						label="Classifique sua tecnologia"
						validation={{ required: true }}
						help={
							<>
								<p>
									As tecnologias podem ser classificadas quanto à sua natureza,
									que podem ser:
								</p>
								<p>
									<strong>Avanços Tecnológicos:</strong>
								</p>
								<p>
									São tecnologias que envolvem um conjunto de instrumentos,
									métodos e técnicas que visam a resolução de problemas.
								</p>
								<p>
									<strong>Tecnologia Social:</strong>
								</p>
								<p>
									São tecnologias que podem ser utilizadas como ferramenta para
									resolver desafios sociais.
								</p>
								<p>
									Não necessariamente precisa ser algo novo, mas que ajude a
									solucionar problemas da sociedade.
								</p>
								<p>
									<strong>Inovação Social:</strong>
								</p>
								<p>
									Produzem resultados que são orientados por necessidades e de
									caráter inovador, solucionando problemas da sociedade a longo
									prazo. Preocupa-se em solucionar desafios de ordem social, não
									necessariamente buscando aumento de lucro ou de competitividade.
									Podem se utilizar de tecnologias sociais como meio para solução
									dos problemas.
								</p>
							</>
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
								Em quais áreas a tecnologia contribui para o desenvolvimento
								sustentável da região: Ambiental, social, econômica, cultural ou
								política.
							</p>
						}
						options={mapArrayOfObjectToSelect(
							taxonomies?.dimension?.terms,
							'term',
							'id',
						)}
					/>

					<SelectField
						form={form}
						name="type"
						placeholder="Escolha o tipo da tecnologia"
						label="Tipo da tecnologia"
						validation={{ required: true }}
						options={typesEnum}
					/>

					<SelectField
						form={form}
						name="knowledge_area_id[0]"
						placeholder="Escolha a grande área da tecnologia"
						label="Grande área da Tecnologia"
						validation={{ required: true }}
						options={mapArrayOfObjectToSelect(greatAreas, 'name', 'knowledge_area_id')}
						onChange={([selectedOption]) => {
							setValue('knowledge_area_id[1]', null);
							setValue('knowledge_area_id[2]', null);
							setValue('knowledge_area_id[3]', null);

							return selectedOption;
						}}
					/>

					<SelectField
						form={form}
						name="knowledge_area_id[1]"
						placeholder="Escolha a área da tecnologia"
						label="Área"
						options={mapArrayOfObjectToSelect(rawAreas, 'name', 'knowledge_area_id')}
						isHidden={!greatArea}
						isLoading={isValidatingAreas}
						onChange={([selectedOption]) => {
							setValue('knowledge_area_id[2]', null);
							setValue('knowledge_area_id[3]', null);

							return selectedOption;
						}}
					/>

					<SelectField
						form={form}
						name="knowledge_area_id[2]"
						placeholder="Escolha a sub-área da tecnologia"
						label="Sub-área"
						options={mapArrayOfObjectToSelect(rawSubAreas, 'name', 'knowledge_area_id')}
						isHidden={!area}
						isLoading={isValidatingSubAreas}
						onChange={([selectedOption]) => {
							setValue('knowledge_area_id[3]', null);

							return selectedOption;
						}}
					/>

					<SelectField
						form={form}
						name="knowledge_area_id[3]"
						placeholder="Escolha a especialidade da tecnologia"
						label="Especialidade"
						options={mapArrayOfObjectToSelect(
							rawSpecialities,
							'name',
							'knowledge_area_id',
						)}
						isHidden={!subArea}
						isLoading={isValidatingSpecialities}
					/>
				</Column>
			</ColumnContainer>
		</>
	);
};

AboutTechnology.propTypes = {
	form: PropTypes.shape({
		watch: PropTypes.func,
		getValues: PropTypes.func,
		setValue: PropTypes.func,
	}),
	data: PropTypes.shape({
		taxonomies: PropTypes.shape({
			target_audience: PropTypes.shape({
				terms: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			biome: PropTypes.shape({
				terms: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			government_program: PropTypes.shape({
				terms: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			keywords: PropTypes.shape({
				terms: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			stage: PropTypes.shape({
				terms: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			classification: PropTypes.shape({
				terms: PropTypes.arrayOf(PropTypes.shape({})),
			}),
			dimension: PropTypes.shape({
				terms: PropTypes.arrayOf(PropTypes.shape({})),
			}),
		}),
		greatAreas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	}).isRequired,
};

AboutTechnology.defaultProps = {
	form: {},
};

export default AboutTechnology;
