import { useContext } from 'react';
import { TechnologyContext } from '../providers';

function useTechnology() {
	return useContext(TechnologyContext);
}

export default useTechnology;
