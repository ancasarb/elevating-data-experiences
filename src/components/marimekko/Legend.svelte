<script lang="ts">
	export let text: Array<string>;
	export let highlight: boolean = false;
	export let x: number;
	export let y: number;

	export let padding: number = 4;
</script>

{#if highlight}
	<text class="font-bold text-base md:text-sm xl:text-xs" fill="#000000">
		{#each text as t, i}
			<tspan {x} {y} dx={3} dy={`${i * padding}%`}>{t}</tspan>
		{/each}
	</text>
{:else}
	<text class="font-semibold text-base md:text-sm xl:text-xs" text-anchor="end" fill="#999999">
		{#each text as t, i}
			<tspan {x} {y} dx={-3} dy={`${i * padding}%`}>{t}</tspan>
		{/each}</text
	>
{/if}
