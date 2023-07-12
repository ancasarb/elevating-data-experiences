<script lang="ts">
	export let current: number;
	export let handleClick: (index: number) => void;
</script>

<div class="flex justify-center items-center">
	<button
		type="button"
		class="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none disabled:opacity-25"
		on:click={() => handleClick(-1)}
		disabled={current === 0}
	>
		<span class="text-gray-400 hover:text-gray-900 group-focus:text-gray-900">
			<svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 14 10">
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 5H1m0 0 4 4M1 5l4-4"
				/>
			</svg>
			<span class="sr-only">Previous</span>
		</span>
	</button>
	<button
		type="button"
		class="flex justify-center items-center h-full cursor-pointer group focus:outline-none disabled:opacity-25"
		on:click={() => handleClick(1)}
		disabled={current === 2}
	>
		<span class="text-gray-400 hover:text-gray-900 group-focus:text-gray-900">
			<svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 14 10">
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 5h12m0 0L9 1m4 4L9 9"
				/>
			</svg>
			<span class="sr-only">Next</span>
		</span>
	</button>
</div>
