import { useContext } from 'react';
import { TechnologyContext } from '../providers/TechnologyProvider';

function useTechnology() {
	return useContext(TechnologyContext);
}

export default useTechnology;
