import { useContext } from 'react';
import { TechnologyContext } from '../components/Technology';

function useTechnology() {
	return useContext(TechnologyContext);
}

export default useTechnology;
