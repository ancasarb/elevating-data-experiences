<script lang="ts">
	import lodash from 'lodash';
	const groupBy = lodash.groupBy;
	const filter = lodash.filter;

	import type { Password } from '$lib/models';
	import Chart from '../circlepacking/Chart.svelte';

	export let data: { password: Password[] };

	$: year = '2022';

	$: filtered = filter(data.password, (d) => d.year === year);
	$: grouped = groupBy(filtered, (d) => d.timeToCrack);
	$: processed = {
		name: 'root',
		children: Object.keys(grouped).map((name) => {
			const values = grouped[name];
			const children = values.map((v) => {
				return {
					id: v.rank,
					name: v.password,
					value: v.count,
					color: v.timeToCrackCategory,
					category: v.timeToCrack
				};
			});
			return { name, children };
		})
	};

	const colorMapping = {
		seconds: '#f7f0d9',
		minutes: '#d7c568',
		hours: '#d59f9e',
		days: '#8f8e85'
	};

	const colorLegendTitle = 'color = time to crack';
	const sizeLegendTitle = 'size = times used';

	const labelThreshold = 150000;

	const source = ['Source: NordPass', 'Research 2022 -', '', 'Top 200', 'most common', 'passwords'];
</script>

<div class="flex flex-col text-left px-2">
	<p class="text-xl font-bold pb-2">
		Even with increasing awareness about cybersecurity, it's a struggle to overcome old habits.
	</p>
	<p class="text-lg">
		Examine the top 200 most common passwords in 2022 and the time it takes to crack them.
	</p>

	<!-- <div class="rounded-lg p-4" style="max-width:300px;">
		<div class="p-4">
			<span class="text-sm">Year</span>
			<input
				class="w-full"
				type="range"
				value="2022"
				min="2019"
				max="2022"
				on:input={(event) => {
					year = event.target.value;
				}}
			/>
			<div class="-mt-2 flex w-full justify-between">
				<span class="text-sm text-gray-500">2019</span>
				<span class="text-sm text-gray-500">2022</span>
			</div>
		</div>
	</div> -->

	<div class="grid grid-cols-1 text-left md:px-16 lg:px-32 xl:px-64 w-screen">
		<div class="cols-span-1">
			<Chart
				data={processed}
				{colorMapping}
				{labelThreshold}
				{colorLegendTitle}
				{sizeLegendTitle}
				{source}
			/>
		</div>
	</div>
</div>
