import React, { useEffect, useRef, useState } from 'react';

import { useTechnology } from '../../../../hooks';
import { Container, Marker } from './styles';
import { normalizeTrl } from '../../../../utils/technology';

const LEVELS = 9;

const ReadinessLevel = () => {
	const imgRef = useRef();
	const [imageHeight, setImageHeight] = useState(0);
	const [levelHeight, setLevelHeight] = useState(0);

	const { technology: { terms = [] } = {} } = useTechnology();
	const { slug } = normalizeTrl(terms);
	const currentLevel = Number(slug.split('-', 2)[1]);

	useEffect(() => {
		let timerId = null;
		const debouncedResize = () => {
			clearTimeout(timerId);
			timerId = setTimeout(() => setImageHeight(imgRef.current?.clientHeight), 250);
		};

		window.addEventListener('resize', debouncedResize);

		return () => {
			window.removeEventListener('resize', debouncedResize);
		};
	}, []);

	useEffect(() => {
		setLevelHeight(Math.floor(imageHeight / LEVELS));
	}, [imageHeight]);

	return (
		<Container
			levelHeight={levelHeight}
			markerSize={levelHeight / 2}
			imageHeight={imageHeight}
			currentLevel={currentLevel}
		>
			{!!currentLevel && !!levelHeight && !!imageHeight && <Marker />}
			<img
				ref={imgRef}
				src="/technology-readiness-level.svg"
				alt="Imagem representando a escala com os estágios de desenvolvimento da tecnologia"
				onLoad={() => setImageHeight(imgRef.current?.clientHeight)}
			/>
		</Container>
	);
};

export default ReadinessLevel;
