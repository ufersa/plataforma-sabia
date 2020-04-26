import { useContext } from 'react';
import UserContext from '../components/User/UserContext';

function useAuth() {
	return useContext(UserContext);
}

export default useAuth;
