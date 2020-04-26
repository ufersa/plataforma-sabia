import { useContext } from 'react';
import { UserContext } from '../components/User';

function useAuth() {
	return useContext(UserContext);
}

export default useAuth;
