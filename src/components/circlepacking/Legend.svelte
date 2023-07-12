<script lang="ts">
	import { legendColor, legendSize } from 'd3-svg-legend';
	import { scaleSqrt, select, selectAll, type ScaleOrdinal } from 'd3';

	export let visible: boolean;
	export let margin: { left: number; right: number; top: number; bottom: number };

	export let source: string[];

	export let colorScale: ScaleOrdinal<string, string, string>;

	export let colorLegendTitle: string;
	export let sizeLegendTitle: string;

	let colorLegendElement: SVGElement;

	$: {
		const colorLegend = legendColor()
			.shape('rect')
			.shapePadding(52)
			.shapeWidth(16)
			.shapeHeight(16)
			.orient('horizontal')
			.cells(colorScale.domain().length)
			.labelAlign('start')
			.labelOffset(20)
			.title(colorLegendTitle)
			.classPrefix('color')
			.scale(colorScale);

		if (colorLegendElement) {
			select(colorLegendElement).call(colorLegend);
			selectAll('.colorlabel').attr('class', 'text-xs');
			selectAll('.colorlegendTitle').attr('class', 'text-xs fill-gray-500');
			select('.colorlegendCells').attr('transform', 'translate(10, 10)');
		}
	}

	let sizeLegendElement: SVGElement;

	$: {
		const circleSizeScale = scaleSqrt<number, number, number>().domain([0, 100]).range([10, 30]);

		const sizeLegend = legendSize()
			.shape('circle')
			.shapePadding(50)
			.cells(2)
			.labels(() => '')
			.orient('horizontal')
			.title(sizeLegendTitle)
			.classPrefix('size')
			.scale(circleSizeScale);

		if (sizeLegendElement) {
			select(sizeLegendElement).call(sizeLegend);
			selectAll('.sizelegendTitle').attr('class', 'text-xs fill-gray-500');
			selectAll('.sizeswatch').attr('fill', 'none').attr('stroke', 'black');
			select('.sizelegendCells').attr('transform', 'translate(10, 40)');
		}
	}
</script>

{#if visible}
	<g transform={`translate(${margin.left / 5}, ${margin.top})`}>
		<g bind:this={colorLegendElement} />
	</g>
	<g transform={`translate(${margin.left / 5}, ${margin.top * 3})`}>
		<g bind:this={sizeLegendElement} />
	</g>
	<g transform={`translate(${margin.left / 5}, ${margin.top * 6 - margin.top / 3})`}>
		<text class="text-xs fill-gray-500">click to reveal</text>
		<text class="text-xs fill-gray-500" dy={16}>further details</text>
	</g>
	<g transform={`translate(${margin.left / 5}, ${margin.top * 15})`} class="text-xs fill-gray-500">
		{#each source as s, i}
			<g>
				<text dy={i * 16}>{s}</text>
			</g>
		{/each}
	</g>
{/if}
