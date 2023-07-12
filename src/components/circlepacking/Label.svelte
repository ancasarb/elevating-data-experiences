<script lang="ts">
	import type { HierarchyNode } from 'd3';
	import type { HierarchicalValue } from './types';

	export let node: HierarchyNode<HierarchicalValue>;

	export let highlighted: boolean;
	export let inFocus: boolean;
	export let show: boolean;

	export let isLeaf: boolean;
</script>

{#if inFocus && highlighted}
	<g class="text-[0.75rem] font-bold">
		<text x={0} y={0}>{`'${node.data.name}' used`}</text>
		<text x={0} y={0} dy={12}>{`${node.data.value} times`}</text>
	</g>
{:else}
	<text
		x={0}
		y={0}
		fill-opacity={show ? 1 : 0}
		class={isLeaf ? 'text-base font-light' : 'text-[0.65rem] font-bold'}>{node.data.name}</text
	>
{/if}
