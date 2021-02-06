import About from './About';
import Description from './Description';
import Costs from './Costs';
import Responsibles from './Responsibles';
import MapAndAttachments from './MapAndAttachments';
import History from './History';

export default [
	{ slug: 'about', label: 'Sobre a Tecnologia', component: About },
	{ slug: 'description', label: 'Caracterização', component: Description },
	{ slug: 'costs', label: 'Custos e Financiamento', component: Costs },
	{ slug: 'responsibles', label: 'Responsáveis', component: Responsibles },
	{ slug: 'mapAnAttachments', label: 'Mapas e Anexos', component: MapAndAttachments },
	{ slug: 'history', label: 'Histórico', component: History },
];
