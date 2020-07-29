import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTechnology } from '..';
import { TechnologyProvider } from '../../components/Technology';

const testTechnology = {
	id: 1,
	title: 'My technology',
	slug: 'my-technology',
	description: 'Ebvirko fugadu esumuwlib.',
	private: 1,
	likes: 2,
};

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
	<TechnologyProvider technology={testTechnology}>{children}</TechnologyProvider>
);

describe('useTechnology', () => {
	it('can set technology', () => {
		const { result } = renderHook(() => useTechnology(), { wrapper });

		expect(result.current.technology).toEqual(testTechnology);
	});
});
