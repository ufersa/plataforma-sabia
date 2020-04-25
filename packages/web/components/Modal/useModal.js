import { useContext } from 'react';
import { ModalContext } from './ModalProvider';

function useModal() {
	return useContext(ModalContext);
}

export default useModal;
