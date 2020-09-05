import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

function useAuth() {
	return useContext(UserContext);
}

export default useAuth;
