<script lang="ts">
	import {
		interpolateViridis,
		min,
		max,
		scaleLinear,
		scaleSequential,
		select,
		selectAll,
		type BaseType
	} from 'd3';
	import textures from 'textures';
	import { legendColor } from 'd3-svg-legend';

	import Gridlines from './Gridlines.svelte';
	import ReferenceLine from '../ReferenceLine.svelte';
	import Legend from './Legend.svelte';
	import type { LegendValue, Point, Value } from './types';

	export let data: Array<Value>;
	export let legend: LegendValue;

	const width = 550;
	const height = 600;

	const margin = {
		left: 30,
		right: 50,
		top: 120,
		bottom: 30
	};

	const boundedWidth = width - margin.left - margin.right;
	const boundedHeight = (height - margin.top - margin.bottom) * 2.2;

	$: yMin = min(data, (d) => d.totalCount) || -1;
	$: yMax = max(data, (d) => d.totalCount) || -1;

	$: maxHeight = boundedHeight / data.length;
	$: yScale = scaleLinear<number, number, number>().domain([yMin, yMax]).range([3, maxHeight]);

	const xScale = scaleLinear<number, number, number>()
		.domain([0, 100])
		.range([0, boundedWidth / 2]);

	$: colorScale = scaleSequential(interpolateViridis).domain([1, 0]);

	export const nameAccessor = (d: Value) => d.name;
	export const totalCountAccessor = (d: Value) => d.totalCount;
	export const positivePercentAccessor = (d: Value) => d.positivePercent;
	export const negativePercentAccessor = (d: Value) => d.negativePercent;

	const getPoints = function (data: Array<Value>): Array<Value & Point> {
		let y = 0;
		let result: Array<Value & Point> = [];
		for (const d of data) {
			result.push({ ...d, y: y });
			y = y + yScale(totalCountAccessor(d));
		}

		return result;
	};

	$: points = getPoints(data);

	const t = textures.lines().stroke('black').orientation('3/8').lighter();

	let pattern: BaseType;

	$: {
		select(pattern).call(t);
	}

	$: gridlines = [
		{
			text: '50',
			y1: -margin.top / 2,
			y2: height,
			x1: xScale(50),
			x2: xScale(50)
		},
		{
			text: '50',
			y1: -margin.top / 2,
			y2: height,
			x1: boundedWidth / 2 + xScale(50),
			x2: boundedWidth / 2 + xScale(50)
		},
		{
			text: '100%',
			y1: -margin.top / 2,
			y2: height,
			x1: xScale(0),
			x2: xScale(0)
		},
		{
			text: '100%',
			y1: -margin.top / 2,
			y2: height,
			x1: boundedWidth / 2 + xScale(100),
			x2: boundedWidth / 2 + xScale(100)
		}
	];

	let highlighted: Value | null = null;
	let mouseX: number | null = null;
	let mouseY: number | null = null;

	const onMouseOver = function (event: MouseEvent, value: Value) {
		highlighted = value;
		mouseX = event.clientX;
		mouseY = event.clientY;
	};

	const onMouseOut = function () {
		highlighted = null;
		mouseX = null;
		mouseY = null;
	};

	let legendElement: SVGElement;

	$: {
		const colorLegend = legendColor()
			.shape('rect')
			.shapePadding(8)
			.orient('horizontal')
			.cells(data.length)
			.classPrefix('verticalcolor')
			.labels(legend.label)
			.labelAlign('start')
			.scale(colorScale);

		if (legendElement) {
			select(legendElement).call(colorLegend);
			selectAll('.verticalcolorlabel').attr('class', 'text-xs');
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, 0)`} bind:this={pattern}>
		<g bind:this={legendElement} />
	</g>

	<g transform={`translate(${margin.left}, ${margin.top + margin.top / 20})`} bind:this={pattern}>
		<Gridlines values={gridlines} />

		{#each points as item, i}
			{@const y = item.y}
			{@const height = yScale(totalCountAccessor(item))}

			{@const widthPositiveBar = xScale(positivePercentAccessor(item))}
			{@const xPositiveBar = boundedWidth / 2}

			{@const widthNegativeBar = xScale(negativePercentAccessor(item))}
			{@const xNegativeBar = boundedWidth / 2 - xScale(negativePercentAccessor(item))}

			{@const hasHighlighted = highlighted !== null}
			{@const isHighlighted = hasHighlighted && nameAccessor(item) === nameAccessor(highlighted)}
			{@const opacity = isHighlighted ? 1 : hasHighlighted ? 0.25 : 1}
			{@const negativeBarOpacity = isHighlighted ? 0.5 : hasHighlighted ? 0.25 : 0.5}
			{@const colorValue = colorScale(legend.color(item))}

			{#if hasHighlighted}
				<rect
					x={xPositiveBar}
					{y}
					width={widthPositiveBar}
					{height}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
					fill="white"
					stroke="#000000"
					stroke-width="0.5"
				/>
			{/if}
			<rect
				x={xPositiveBar}
				{y}
				width={widthPositiveBar}
				{height}
				on:mouseover={(event) => onMouseOver(event, item)}
				on:mouseout={() => onMouseOut()}
				fill={colorValue}
				stroke="#000000"
				stroke-width="0.5"
				{opacity}
			/>
			{#if hasHighlighted}
				<rect
					x={xNegativeBar}
					{y}
					width={widthNegativeBar}
					{height}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
					fill="white"
					stroke="#000000"
					stroke-width="0.5"
				/>
			{/if}
			{#each [colorValue, t.url()] as fill}
				<rect
					x={xNegativeBar}
					{y}
					width={widthNegativeBar}
					{height}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
					{fill}
					stroke="#000000"
					stroke-width="0.5"
					opacity={negativeBarOpacity}
				/>
			{/each}
		{/each}

		<ReferenceLine x1={boundedWidth / 2} x2={boundedWidth / 2} y1={-margin.top / 2} y2={height} />

		<Legend
			x={boundedWidth / 2}
			y={height - margin.top - margin.bottom / 4}
			text={legend.text.cross}
			highlight={true}
		/>
		<Legend x={boundedWidth / 2 + xScale(45)} y={-margin.top / 3} text={legend.text.positive} />
		<Legend y={-margin.top / 3} x={xScale(85)} text={legend.text.negative} />
	</g>
</svg>

{#if highlighted != null && mouseX != null && mouseY != null}
	<div
		id="tooltip"
		class="z-10 fixed bg-white"
		style="left: {mouseX - (2 * mouseX) / 3}px; top: {mouseY + 10}px"
	>
		<slot name="tooltip" item={highlighted} />
	</div>
{/if}
