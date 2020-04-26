import { useContext } from 'react';
import ModalContext from '../components/Modal/ModalContext';

function useModal() {
	return useContext(ModalContext);
}

export default useModal;
