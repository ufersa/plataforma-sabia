/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connectRange } from 'react-instantsearch-dom';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { formatMoney } from '../../utils/helper';
import Panel from './panel';

const StyledSlider = styled(Slider)`
	${({ theme: { colors }, disabled }) => css`
		.slider-rail {
			background-color: rgba(65, 66, 71, 0.08);
			border-radius: 3px;
			cursor: pointer;
			height: 3px;
			position: absolute;
			width: 100%;
		}

		.slider-track {
			background-color: ${colors.secondary};
			border-radius: 3px;
			cursor: pointer;
			height: 3px;
			position: absolute;
		}

		.slider-tick {
			cursor: grab;
			display: flex;
			font-size: 1.2rem;
			font-weight: 500;
			position: absolute;
			text-align: center;
			top: -28px;
			transform: translateX(-50%);
			user-select: none;
		}

		.slider-handle {
			background-image: linear-gradient(to top, #f5f5fa, #fff);
			border-radius: 50%;
			border: 2px solid ${colors.secondary};
			box-shadow: 0 4px 11px 0 rgba(37, 44, 97, 0.15), 0 2px 3px 0 rgba(93, 100, 148, 0.2);
			cursor: grab;
			height: 16px;
			outline: none;
			position: absolute;
			transform: translate(calc(-50% + 2px), calc(-50% + 2px));
			width: 16px;
			z-index: 1;
		}

		@media (max-width: 899px) {
			.slider-handle {
				height: 1.5rem;
				width: 1.5rem;
			}
		}

		${disabled &&
			css`
				opacity: 0.5;

				.slider-rail,
				.slider-track,
				.slider-tick,
				.slider-handle {
					cursor: not-allowed;
				}
			`}
	`}
`;

function Handle({ domain: [min, max], handle: { id, value, percent }, disabled, getHandleProps }) {
	return (
		<>
			{/* Dummy element to make the tooltip draggable */}
			<div
				style={{
					position: 'absolute',
					left: `${percent}%`,
					top: '3.2rem',
					width: 40,
					height: 25,
					transform: 'translate(-50%, -100%)',
					cursor: disabled ? 'not-allowed' : 'grab',
					zIndex: 1,
				}}
				aria-hidden
				{...getHandleProps(id)}
			/>
			<div
				role="slider"
				className="slider-handle"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				style={{
					left: `${percent}%`,
					cursor: disabled ? 'not-allowed' : 'grab',
				}}
				{...getHandleProps(id)}
			/>
		</>
	);
}

Handle.propTypes = {
	domain: PropTypes.arrayOf(PropTypes.number).isRequired,
	handle: PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.number,
		percent: PropTypes.number,
	}).isRequired,
	disabled: PropTypes.bool,
	getHandleProps: PropTypes.func.isRequired,
};

Handle.defaultProps = {
	disabled: false,
};

const RangeSliderWithPanel = ({ min, max, refine, currentRefinement, canRefine, header }) => {
	const [ticksValues, setTicksValues] = useState([currentRefinement.min, currentRefinement.max]);

	useEffect(() => {
		setTicksValues([currentRefinement.min, currentRefinement.max]);
	}, [currentRefinement]);

	const onChange = (values) => {
		refine({ min: values[0] || min, max: values[1] || max });
	};

	if (!canRefine || ticksValues[0] === undefined || ticksValues[1] === undefined) {
		return null;
	}

	const disabledSlider = !canRefine || min === max;

	return (
		<Panel header={header}>
			<StyledSlider
				mode={2}
				step={1}
				domain={[min, max]}
				values={[currentRefinement.min, currentRefinement.max]}
				disabled={disabledSlider}
				onChange={onChange}
				onUpdate={setTicksValues}
				rootStyle={{
					position: 'relative',
					margin: '1.5rem 0.5rem 0',
					paddingBottom: '4.8rem',
				}}
				className="ais-RangeSlider"
			>
				<Rail>
					{({ getRailProps }) => <div className="slider-rail" {...getRailProps()} />}
				</Rail>

				<Tracks left={false} right={false}>
					{({ tracks, getTrackProps }) => (
						<div>
							{tracks.map(({ id, source, target }) => (
								<div
									key={id}
									className="slider-track"
									style={{
										left: `${source.percent}%`,
										width: `${target.percent - source.percent}%`,
									}}
									{...getTrackProps()}
								/>
							))}
						</div>
					)}
				</Tracks>

				<Handles>
					{({ handles, getHandleProps }) => (
						<div>
							{handles.map((handle) => (
								<Handle
									key={handle.id}
									handle={handle}
									domain={[min, max]}
									getHandleProps={getHandleProps}
									disabled={disabledSlider}
								/>
							))}
						</div>
					)}
				</Handles>

				<Ticks values={ticksValues}>
					{({ ticks }) => (
						<div>
							{ticks.map(({ id, value, percent }, index) => (
								<div
									// eslint-disable-next-line react/no-array-index-key
									key={`${id}_${index}`}
									className="slider-tick"
									style={{
										left: `${percent}%`,
										top: '1.6rem',
										whiteSpace: 'nowrap',
									}}
								>
									{formatMoney(value)}
								</div>
							))}
						</div>
					)}
				</Ticks>
			</StyledSlider>
		</Panel>
	);
};

RangeSliderWithPanel.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	refine: PropTypes.func.isRequired,
	currentRefinement: PropTypes.shape({
		min: PropTypes.number,
		max: PropTypes.number,
	}).isRequired,
	canRefine: PropTypes.bool.isRequired,
	header: PropTypes.string.isRequired,
};

RangeSliderWithPanel.defaultProps = {
	min: 0,
	max: 0,
};

export default connectRange(RangeSliderWithPanel);
