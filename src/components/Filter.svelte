<script lang="ts">
	export let current: string;
	export let options: Array<string>;
	export let onSelect: (item: string) => void;
</script>

<!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
<button class="pt-4" role="group">
	{#each options as option}
		<button
			class={option === current
				? 'text-center font-medium px-4 py-2 text-sm hover:ring-2 hover:z-10 hover:ring-gray-300 border border-gray-800 bg-gray-900 text-white border-l-0 first:border-l first:rounded-l-lg last:rounded-r-lg'
				: 'text-center font-medium px-4 py-2 text-sm text-gray-900 hover:ring-2 hover:z-10 hover:ring-gray-300 border border-gray-800 focus:bg-gray-900 focus:text-white border-l-0 first:border-l first:rounded-l-lg last:rounded-r-lg'}
			on:click={(e) => {
				onSelect(e.target.innerText);
			}}>{option}</button
		>
	{/each}
</button>
