import React from 'react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';

const mockRouter = {
	pathname: '/',
	prefetch: () => {},
};

const RouterDecorator = (storyFn) => (
	<RouterContext.Provider value={mockRouter}>{storyFn()}</RouterContext.Provider>
);

export default RouterDecorator;
