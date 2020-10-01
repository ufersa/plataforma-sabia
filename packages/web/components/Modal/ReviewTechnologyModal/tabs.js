import React from 'react';

import Identification from './Identification';
import Objectives from './Objectives';
import LegalAspects from './LegalAspects';
import Application from './Application';
import DevelopmentStage from './DevelopmentStage';
import Funding from './Funding';
import Contribution from './Contribution';
import Costs from './Costs';
import Risks from './Risks';

export default [
	{ slug: 'identification', label: 'Identificação', component: Identification },
	{ slug: 'objectives', label: 'Objetivos', component: Objectives },
	{ slug: 'legal-aspects', label: 'Aspectos legais', component: LegalAspects },
	{ slug: 'application', label: 'Aplicação', component: Application },
	{
		slug: 'development-stage',
		label: 'Estágio de desenvolvimento',
		component: DevelopmentStage,
	},
	{ slug: 'funding', label: 'Financiamento', component: Funding },
	{ slug: 'contribution', label: 'Contribuição', component: Contribution },
	{ slug: 'costs', label: 'Custos', component: Costs },
	{ slug: 'risks', label: 'Riscos', component: Risks },
	{ slug: 'maps', label: 'Mapas', component: () => <span>Teste</span> },
	{ slug: 'documents', label: 'Documentos', component: () => <span>Teste</span> },
];
