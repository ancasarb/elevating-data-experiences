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
		// type Series,
		// stack,
	} from 'd3';
	import textures from 'textures';
	import { legendColor } from 'd3-svg-legend';

	import Gridlines from './Gridlines.svelte';
	import ReferenceLine from '../ReferenceLine.svelte';
	import Legend from './Legend.svelte';
	import type { LegendValue, Point, Value } from './types';

	export let data: Array<Value>;
	export let legend: LegendValue;

	const width = 1135;
	const height = 450;

	const margin = {
		left: 10,
		right: 85,
		top: 75,
		bottom: 5
	};

	const boundedWidth = (width - margin.left - margin.right) * 2.2;
	const boundedHeight = height - margin.top - margin.bottom;

	$: xMin = min(data, (d) => d.totalCount) || -1;
	$: xMax = max(data, (d) => d.totalCount) || -1;

	$: maxWidth = boundedWidth / data.length;
	$: xScale = scaleLinear<number, number, number>().domain([xMin, xMax]).range([3, maxWidth]);

	// $: xMax = max(stackedData[stackedData.length - 1], (d) => d[1]);
	// $: xScale = scaleLinear().domain([0, xMax!]).range([0, boundedWidth]);

	const yScalePositiveBars = scaleLinear<number, number, number>()
		.domain([0, 100])
		.range([boundedHeight / 2, 0]);

	const yScaleNegativeBars = scaleLinear<number, number, number>()
		.domain([0, 100])
		.range([boundedHeight, boundedHeight / 2]);

	$: colorScale = scaleSequential(interpolateViridis).domain([1, 0]);

	export const nameAccessor = (d: Value) => d.name;
	export const totalCountAccessor = (d: Value) => d.totalCount;
	export const positivePercentAccessor = (d: Value) => d.positivePercent;
	export const negativePercentAccessor = (d: Value) => d.negativePercent;

	// const stackData = function (data: Array<Value>): Series<
	// 	{
	// 		[key: string]: number;
	// 	},
	// 	string
	// >[] {
	// 	return stack().keys(data.map(nameAccessor))([
	// 		data.reduce((o, d) => ({ ...o, [nameAccessor(d)]: totalCountAccessor(d) }), {})
	// 	]);
	// };

	const getPoints = function (data: Array<Value>): Array<Value & Point> {
		let x = 0;
		let result: Array<Value & Point> = [];
		for (const d of data) {
			result.push({ ...d, x: x });
			x = x + xScale(totalCountAccessor(d));
		}

		return result;
	};

	// $: stackedData = stackData(data);

	$: points = getPoints(data);

	const t = textures.lines().stroke('black').orientation('3/8').lighter();
	let pattern: BaseType;
	$: {
		select(pattern).call(t);
	}

	$: gridlines = [
		{
			text: '50',
			x1: 0,
			x2: width - margin.left,
			y1: yScalePositiveBars(50),
			y2: yScalePositiveBars(50)
		},
		{
			text: '50',
			x1: 0,
			x2: width - margin.left,
			y1: yScaleNegativeBars(50),
			y2: yScaleNegativeBars(50)
		},
		{
			text: '100%',
			x1: 0,
			x2: width - margin.left,
			y1: yScalePositiveBars(100),
			y2: yScalePositiveBars(100)
		},
		{
			text: '100%',
			x1: 0,
			x2: width - margin.left,
			y1: yScaleNegativeBars(0),
			y2: yScaleNegativeBars(0)
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
			.classPrefix('horizontalcolor')
			.labels(legend.label)
			.labelAlign('start')
			.title('color = year')
			.scale(colorScale);

		if (legendElement) {
			select(legendElement).call(colorLegend);
			selectAll('.horizontalcolorlabel').attr('class', 'text-xs');
			selectAll('.horizontalcolorlegendTitle').attr('class', 'text-xs fill-gray-500');
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, ${margin.top / 10})`} bind:this={pattern}>
		<g bind:this={legendElement} />
	</g>
	<g transform={`translate(${margin.left}, ${margin.top})`} bind:this={pattern}>
		<Gridlines values={gridlines} />

		<!-- {#each stackedData as d, i} -->
		{#each points as item, i}
			<!-- {@const item = data[d.index]} -->

			{@const x = item.x}
			{@const width = xScale(totalCountAccessor(item))}

			<!-- {@const x = xScale(d[0][0])}
			{@const width = xScale(d[0][1]) - xScale(d[0][0])} -->

			{@const yPositiveBar = yScalePositiveBars(positivePercentAccessor(item))}
			{@const heightPositiveBar = boundedHeight / 2 - yPositiveBar}

			{@const yNegativeBar = boundedHeight / 2}
			{@const heightNegativeBar = boundedHeight - yScaleNegativeBars(negativePercentAccessor(item))}

			{@const hasHighlighted = highlighted !== null}
			{@const isHighlighted = hasHighlighted && nameAccessor(item) === nameAccessor(highlighted)}
			{@const opacity = isHighlighted ? 1 : hasHighlighted ? 0.25 : 1}
			{@const negativeBarOpacity = isHighlighted ? 0.5 : hasHighlighted ? 0.25 : 0.5}
			{@const colorValue = colorScale(legend.color(item))}

			{#if hasHighlighted}
				<rect
					{x}
					y={yPositiveBar}
					{width}
					height={heightPositiveBar}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
					fill="white"
					stroke="#000000"
					stroke-width="0.5"
				/>
			{/if}
			<rect
				{x}
				y={yPositiveBar}
				{width}
				height={heightPositiveBar}
				on:mouseover={(event) => onMouseOver(event, item)}
				on:mouseout={() => onMouseOut()}
				fill={colorValue}
				stroke="#000000"
				stroke-width="0.5"
				{opacity}
			/>
			{#if hasHighlighted}
				<rect
					{x}
					y={yNegativeBar}
					{width}
					height={heightNegativeBar}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
					fill="white"
					stroke="#000000"
					stroke-width="0.5"
				/>
			{/if}
			{#each [colorValue, t.url()] as fill}
				<rect
					{x}
					y={yNegativeBar}
					{width}
					height={heightNegativeBar}
					on:mouseover={(event) => onMouseOver(event, item)}
					on:mouseout={() => onMouseOut()}
					{fill}
					stroke="#000000"
					stroke-width="0.5"
					opacity={negativeBarOpacity}
				/>
			{/each}
		{/each}
		<ReferenceLine x1={0} x2={width} y1={boundedHeight / 2} y2={boundedHeight / 2} />

		<Legend x={0} y={boundedHeight - 10} text={legend.text.cross} highlight={true} />
		<Legend x={width - margin.left} y={yScalePositiveBars(30)} text={legend.text.positive} />
		<Legend x={width - margin.left} y={yScaleNegativeBars(70)} text={legend.text.negative} />
	</g>
</svg>

{#if highlighted != null && mouseX != null && mouseY != null}
	<div id="tooltip" class="z-10 fixed bg-white" style="left: {mouseX + 10}px; top: {mouseY + 10}px">
		<slot name="tooltip" item={highlighted} />
	</div>
{/if}
