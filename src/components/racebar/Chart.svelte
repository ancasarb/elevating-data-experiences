<script lang="ts">
	import { scaleBand } from 'd3';
	import RaceBar from './RaceBar.svelte';
	import type { Value } from './types';

	export let data: Array<Value>;
	export let target: string;
	export let visible: boolean;

	const labelAccessor = (d: Value) => d.name;
	const durationAccessor = (d: Value) => d.rawDuration;

	const width = 400;
	const height = 420;

	const margin = {
		left: 135,
		right: 10,
		top: 20,
		bottom: 5
	};

	$: boundedWidth = width - margin.left - margin.right;
	$: boundedHeight = height - margin.top - margin.bottom;

	$: yScale = scaleBand<string>()
		.domain(data.map(labelAccessor))
		.range([0, boundedHeight])
		.paddingInner(0.15);

	let replay: boolean = false;
</script>

<div class="flex flex-wrap justify-end">
	<button
		class="mx-5 my-2 text-center font-small px-2 py-1 text-sm text-gray-900 hover:ring-2 hover:z-10 hover:ring-gray-300 border border-gray-800 active:bg-gray-100 border-l-0 first:border-l first:rounded-l-lg last:rounded-r-lg"
		on:click={(e) => {
			replay = !replay;
		}}>replay</button
	>
</div>
<svg viewBox={`0 0 ${width} ${height}`}>
	<g transform={`translate(${margin.left}, ${margin.top})`}>
		{#each data as dt}
			<RaceBar
				width={boundedWidth}
				height={yScale.bandwidth()}
				y={yScale(labelAccessor(dt))}
				annotation={labelAccessor(dt)}
				rawDuration={durationAccessor(dt)}
				{replay}
				{visible}
			/>
		{/each}
	</g>
	<g transform={`translate(${margin.left}, 0)`}>
		<line
			x1={boundedWidth}
			x2={boundedWidth}
			y1={0}
			y2={height}
			stroke="black"
			stroke-dasharray="5"
		/>
		<text
			x={boundedWidth}
			dx={-5}
			dy={-5}
			y={margin.top}
			text-anchor="end"
			fill="black"
			class="text-xs">{target}</text
		>
	</g>
</svg>
