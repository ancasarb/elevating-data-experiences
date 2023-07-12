<script lang="ts">
	export let values: Array<{ x1: number; x2: number; y1: number; y2: number; text: string }>;
	const color = '#e2e2e2';
</script>

{#each values as { x1, x2, y1, y2, text }}
	{@const isHorizontal = y1 === y2}
	<line {x1} {x2} {y1} {y2} stroke={color} />
	<text
		x={x2}
		y={y1}
		text-anchor={isHorizontal ? 'end' : 'middle'}
		dy={-3}
		dx={-3}
		class={isHorizontal ? 'md:text-sm lg:text-xs' : ''}>{text}</text
	>
{/each}
