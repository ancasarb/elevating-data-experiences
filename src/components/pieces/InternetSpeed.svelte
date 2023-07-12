<script lang="ts">
	import { INTERNET_SPEED_TYPES, INTERNET_TYPES } from '$lib/filters';
	import type { InternetSpeed } from '$lib/models';

	import lodash from 'lodash';
	const filter = lodash.filter;

	import Filter from '../Filter.svelte';
	import Source from '../Source.svelte';
	import Chart from '../racebar/Chart.svelte';

	export let data: { 'internet-speed': InternetSpeed[] };
	export let visible: boolean;

	let internetType = 'fixed broadband';
	let internetSpeedType = 'download';

	function onSelect(assignee: string, value: string) {
		switch (assignee) {
			case 'internet_type':
				internetType = value;
				break;
			case 'internet_speed_type':
				internetSpeedType = value;
				break;
			default:
				break;
		}
	}

	const internetSpeedSource =
		'Speedtest Global Index - calculations are based on median country speeds from May 2023.';
	const transferTarget = 100;

	$: internetSpeedData = filter(
		data['internet-speed'],
		(d) => d.internetType === internetType && d.internetSpeed === internetSpeedType
	).map((d) => {
		return { name: d.name, rawDuration: transferTarget / (d.value / 8) };
	});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center gap-4">
	<div class="flex flex-col md:col-span-1 lg:col-span-2 items-center justify-center">
		<p class="text-xl lg:text-lg pb-8 font-semibold">
			Digital use still varies meaningfully around the world.
		</p>
		<p class="text-xl lg:text-lg">Consider the accessibility and inclusiveness of the internet,</p>
		<p class="text-lg pb-10">by examining the internet speed performance.</p>
		<div class="hidden md:block">
			<Filter
				onSelect={(value) => onSelect('internet_type', value)}
				current={internetType}
				options={INTERNET_TYPES}
			/>
		</div>
		<div class="hidden md:block">
			<Filter
				onSelect={(value) => onSelect('internet_speed_type', value)}
				current={internetSpeedType}
				options={INTERNET_SPEED_TYPES}
			/>
		</div>
		<div class="hidden md:block md:text-xs md:pt-10">
			<Source content={internetSpeedSource} />
		</div>
	</div>
	<div class="md:col-span-1 lg:col-span-1">
		<p class="font-bold text-xl text-left px-2">Time to transfer 100MB</p>
		<p class="text-left pt-2 px-2">
			How long it takes to transfer 100MB, in the ten countries with the fastest and slowest
			internet and the overall global performance.
		</p>
		<p class="text-left text-xs text-gray-500 px-2 py-2">
			100MB is roughly equivalent to 100-250 photos or approximately 25 songs.
		</p>
		<div class="md:hidden">
			<Filter
				onSelect={(value) => onSelect('internet_type', value)}
				current={internetType}
				options={INTERNET_TYPES}
			/>
		</div>
		<div class="md:hidden">
			<Filter
				onSelect={(value) => onSelect('internet_speed_type', value)}
				current={internetSpeedType}
				options={INTERNET_SPEED_TYPES}
			/>
		</div>
		<Chart data={internetSpeedData} target={`${transferTarget} MB`} {visible} />

		<div class="text-xs text-left py-4 px-2 md:hidden">
			<Source content={internetSpeedSource} />
		</div>
	</div>
</div>
