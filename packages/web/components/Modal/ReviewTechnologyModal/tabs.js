import React from 'react';

import Identification from './Identification';
import Objectives from './Objectives';
import LegalAspects from './LegalAspects';
import Application from './Application';

export default [
	{ slug: 'identification', label: 'Identificação', component: Identification },
	{ slug: 'objectives', label: 'Objetivos', component: Objectives },
	{ slug: 'legal-aspects', label: 'Aspectos legais', component: LegalAspects },
	{ slug: 'application', label: 'Aplicação', component: Application },
	{
		slug: 'development-stage',
		label: 'Estágio de desenvolvimento',
		component: () => <span>Teste</span>,
	},
	{ slug: 'funding', label: 'Financiamento', component: () => <span>Teste</span> },
	{ slug: 'contribution', label: 'Contribuição', component: () => <span>Teste</span> },
	{ slug: 'costs', label: 'Custos', component: () => <span>Teste</span> },
	{ slug: 'risks', label: 'Riscos', component: () => <span>Teste</span> },
	{ slug: 'maps', label: 'Mapas', component: () => <span>Teste</span> },
	{ slug: 'documents', label: 'Documentos', component: () => <span>Teste</span> },
];
