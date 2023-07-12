<script lang="ts">
	import type { HierarchyNode, ScaleOrdinal } from 'd3';
	import type { HierarchicalValue } from './types';

	export let node: HierarchyNode<HierarchicalValue>;
	export let width: number;

	export let onClick;
	export let onMouseOver;
	export let onMouseOut;

	export let colorScale: ScaleOrdinal<string, string, string>;
	export let highlighted: boolean;
	export let inFocus: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{#if node.children}
	<circle r={node.r * width} on:click={onClick} fill-opacity="0" stroke="black" stroke-width="1" />
{:else}
	<circle
		r={node.r * width}
		fill={colorScale(node.data.color)}
		stroke="#6b7280"
		stroke-width={inFocus && highlighted ? '1' : '0'}
		on:mouseover={onMouseOver}
		on:mouseout={onMouseOut}
	/>
{/if}
