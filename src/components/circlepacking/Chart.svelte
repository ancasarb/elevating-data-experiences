<script lang="ts">
	import {
		hierarchy,
		interpolateZoom,
		pack,
		scaleOrdinal,
		type HierarchyNode,
		type HierarchyCircularNode,
		type ZoomView
	} from 'd3';

	import lodash from 'lodash';
	const filter = lodash.filter;

	import { tweened } from 'svelte/motion';

	import Legend from './Legend.svelte';
	import Label from './Label.svelte';
	import Circle from './Circle.svelte';
	import type { HierarchicalValue } from './types';

	export let data: HierarchicalValue;

	export let colorMapping: { [key: string]: string };

	export let labelThreshold: number;

	export let colorLegendTitle: string;
	export let sizeLegendTitle: string;

	export let source: string[];

	const width = 932;
	const height = 932;

	const margin = {
		left: 150,
		right: 100,
		top: 40,
		bottom: 0
	};

	$: boundedWidth = width - margin.left - margin.right;
	$: boundedHeight = height - margin.top - margin.bottom;

	$: colorScale = scaleOrdinal<string, string, string>()
		.domain(Object.keys(colorMapping))
		.range(Object.values(colorMapping));

	const packMargin = 10;

	let root: HierarchyNode<HierarchicalValue>;
	let focus: HierarchyNode<HierarchicalValue>;

	let nodes: HierarchyCircularNode<HierarchicalValue>[];
	let orderedNodes: HierarchyCircularNode<HierarchicalValue>[];

	$: {
		const packLayout = pack<HierarchicalValue>()
			.size([boundedHeight - packMargin, boundedWidth - packMargin])
			.padding(3);

		root = hierarchy(data)
			.sum((d) => d.value)
			.sort((a, b) => b.value - a.value);

		focus = root;
		nodes = packLayout(root).descendants();

		zoomTo([root.x, root.y, root.r * 2 + packMargin]);
	}

	$: {
		orderedNodes =
			focus === root
				? [...filter(nodes, (node) => !node.children), ...filter(nodes, (node) => node.children)]
				: [...filter(nodes, (node) => node.children), ...filter(nodes, (node) => !node.children)];
	}

	let view = tweened<ZoomView>(undefined);

	function zoomTo(v: ZoomView) {
		view.set(v, { interpolate: interpolateZoom });
	}

	function zoom(node: HierarchyNode<HierarchicalValue>) {
		highlighted = null;
		focus = node;
		zoomTo([focus.x, focus.y, focus.r * 2]);
	}

	let highlighted: HierarchyNode<HierarchicalValue> | null = null;

	const onMouseOver = function (value: HierarchyNode<HierarchicalValue>) {
		highlighted = value;
	};

	const onMouseOut = function () {
		highlighted = null;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svg viewBox={`0 0 ${width} ${height}`} on:click={(event) => zoom(root)}>
	<Legend
		visible={focus === root}
		{margin}
		{source}
		{colorScale}
		{colorLegendTitle}
		{sizeLegendTitle}
	/>

	<g transform={`translate(${margin.left}, ${margin.top})`}>
		<g transform={`translate(${boundedWidth / 2}, ${boundedWidth / 2})`}>
			{#each orderedNodes as node}
				<g
					transform={'translate(' +
						(node.x - $view[0]) * (boundedWidth / $view[2]) +
						',' +
						(node.y - $view[1]) * (boundedWidth / $view[2]) +
						')'}
				>
					<Circle
						{node}
						width={boundedWidth / $view[2]}
						{colorScale}
						highlighted={highlighted === node}
						inFocus={focus === node.parent}
						onClick={(event) => focus !== node && (zoom(node), event.stopPropagation())}
						onMouseOver={(event) => focus !== root && onMouseOver(node)}
						onMouseOut={() => focus !== root && onMouseOut()}
					/>
				</g>
			{/each}

			{#each orderedNodes as node}
				<g
					style="pointer-events: none;"
					text-anchor="middle"
					transform={'translate(' +
						(node.x - $view[0]) * (boundedWidth / $view[2]) +
						',' +
						(node.y - $view[1]) * (boundedWidth / $view[2]) +
						')'}
				>
					<Label
						{node}
						highlighted={highlighted === node}
						inFocus={focus === node.parent}
						isLeaf={node.parent !== root}
						show={(focus === root && node.parent === root) ||
							(node.parent === focus && node.data.value > labelThreshold)}
					/>
				</g>
			{/each}
		</g>
	</g>
</svg>

<style>
	svg {
		cursor: pointer;
	}
</style>
