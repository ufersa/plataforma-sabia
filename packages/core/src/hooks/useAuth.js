import { useContext } from 'react';
import { UserContext } from '../providers';

function useAuth() {
	return useContext(UserContext);
}

export default useAuth;
