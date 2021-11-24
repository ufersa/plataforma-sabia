import { useState, useEffect, useCallback } from 'react';

export default function useMediaQuery(width) {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback((e) => {
		if (e.matches) {
			setTargetReached(true);
		} else {
			setTargetReached(false);
		}
	}, []);

	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${width}px)`);
		media.addEventListener('change', (e) => updateTarget(e));

		// Check on mount (callback is not called until a change occurs)
		if (media.matches) {
			setTargetReached(true);
		}

		return () => media.removeEventListener('change', (e) => updateTarget(e));
	}, [updateTarget, width]);

	return targetReached;
}
