import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, fireEvent, screen } from '@testing-library/react';

import useVisibleComponent from '../useVisibleComponent';

describe('useVisibleComponent', () => {
	it('should return the default values if initialState is not provided and the user did not click anywhere', () => {
		const { result } = renderHook(() => useVisibleComponent());

		expect(result.current[0].current).toBeNull();
		expect(result.current[1]).toBe(false);

		act(() => {
			result.current[2](true);
		});

		expect(result.current[1]).toBe(true);
	});

	it('should return the state as false only if the user clicks outside the component', () => {
		const { result } = renderHook(() => useVisibleComponent(true));

		expect(result.current[0].current).toBeNull();
		expect(result.current[1]).toBe(true);

		const onClickBtn1 = jest.fn();
		const onClickBtn2 = jest.fn();
		render(
			<>
				<button type="button" onClick={onClickBtn1} ref={result.current[0]}>
					WithRefButton
				</button>
				<button type="button" onClick={onClickBtn2}>
					WithoutRefButton
				</button>
			</>,
		);

		fireEvent.click(screen.getByText('WithRefButton'));
		expect(onClickBtn1).toHaveBeenCalled();
		expect(result.current[1]).toBe(true);

		act(() => {
			fireEvent.click(screen.getByText('WithoutRefButton'));
		});
		expect(onClickBtn2).toHaveBeenCalled();
		expect(result.current[1]).toBe(false);
	});
});
