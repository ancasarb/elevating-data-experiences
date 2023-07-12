<script lang="ts">
	// import Filter from '../Filter.svelte';
	import Source from '../Source.svelte';

	// import { NUISANCE_TYPES } from '$lib/filters';
	import { format } from 'd3';
	import type { ContentDrift, LinkRot } from '$lib/models';
	import Chart from '../marimekko/Chart.svelte';
	import VerticalChart from '../marimekko/VerticalChart.svelte';

	type Data = { 'link-rot': LinkRot[]; 'content-drift': ContentDrift[] };
	export let data: Data;

	let nuisance_type: string = 'link rot';

	// function onSelect(value: string) {
	// 	nuisance_type = value;
	// }

	const linkRotSource = 'https://dash.harvard.edu/handle/1/37367405';

	$: linkRotData = data['link-rot'].map((d) => {
		return {
			name: d.year.toString(),
			totalCount: d.intact + d.ambiguous + d.rotted,

			positivePercent: parseInt(
				format('.0%')((d.intact + d.ambiguous) / (d.intact + d.ambiguous + d.rotted)),
				10
			),
			negativePercent: parseInt(format('.0%')(d.rotted / (d.intact + d.ambiguous + d.rotted)), 10)
		};
	});

	$: linkRotLegend = {
		cross: ['Total count →'],
		positive: ['Intact &', 'Ambiguous'],
		negative: ['Rotted']
	};

	$: contentDriftData = data['content-drift'].map((d) => {
		return {
			name: d.year.toString(),
			totalCount: d.intact + d.drifted,

			positivePercent: parseInt(format('.0%')(d.intact / (d.intact + d.drifted)), 10),
			negativePercent: parseInt(format('.0%')(d.drifted / (d.intact + d.drifted)), 10)
		};
	});

	$: contentDriftLegend = {
		cross: ['Total count →'],
		positive: ['Intact'],
		negative: ['Drifted']
	};

	$: colorAccessor = (d: {
		name: string;
		totalCount: number;
		positivePercent: number;
		negativePercent: number;
	}) => (2019 - parseInt(d.name, 10)) / 21;

	$: labelAccessor = (item: { i: number }) => (item.i === 0 ? '1998' : item.i === 20 ? '2019' : '');

	$: nuisanceData = nuisance_type === 'link rot' ? linkRotData : contentDriftData;
	$: nuisanceLegend = nuisance_type === 'link rot' ? linkRotLegend : contentDriftLegend;
</script>

<div class="grid grid-cols-1 text-left">
	<div class="flex flex-col">
		<p class="text-xl font-bold px-2 pb-2">
			An examination of link rot within the New York Times website
		</p>
		<p class="text-lg px-2">
			Link rot refers to the modern nuisance when links to a resource or webpage no longer work or
			become unreachable. Links in older articles are more likely to be broken.
		</p>
		<p class="text-sm px-2 text-gray-500 py-6">Hover your mouse over a bar to explore further.</p>
		<!-- <div class="px-2">
			<Filter {onSelect} current={nuisance_type} options={NUISANCE_TYPES} />
		</div> -->
		<div class="hidden md:block">
			<Chart
				data={nuisanceData}
				legend={{ text: nuisanceLegend, color: colorAccessor, label: labelAccessor }}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{item.name + (item.name === '2019' ? '*' : '')}</u></strong> <br />
					<p class="tooltip-body">
						<span><strong>Total: </strong></span>{format(',')(item.totalCount)}
					</p>
					<p class="tooltip-body">
						<span class="tooltip-highlight">Intact & Ambiguous: </span>{item.positivePercent}%
					</p>
					<p class="tooltip-body">
						<span class="tooltip-highlight">Rotted: </span>{item.negativePercent}%
					</p>
					{#if item.name === '2019'}
						<p class="tooltip-note">*mid-year only</p>
					{/if}
				</div>
			</Chart>
		</div>
		<div class="block md:hidden">
			<VerticalChart
				data={nuisanceData}
				legend={{ text: nuisanceLegend, color: colorAccessor, label: labelAccessor }}
			>
				<div slot="tooltip" let:item class="tooltip">
					<strong><u>{item.name + (item.name === '2019' ? '*' : '')}</u></strong> <br />
					<p class="tooltip-body">
						<span><strong>Total: </strong></span>{format(',')(item.totalCount)}
					</p>
					<p class="tooltip-body">
						<span class="tooltip-highlight">Intact & Ambiguous: </span>{item.positivePercent}%
					</p>
					<p class="tooltip-body">
						<span class="tooltip-highlight">Rotted: </span>{item.negativePercent}%
					</p>
					{#if item.name === '2019'}
						<p class="tooltip-note">*mid-year only</p>
					{/if}
				</div>
			</VerticalChart>
		</div>
		<div class="text-xs pt-5 px-2">
			<p class="text-sm text-gray-500">
				All websites are affected by link rot, and this analysis focused on the NYT website.
			</p>
			<p class="text-sm text-gray-500">
				The dataset consisted of 553,693 articles, representing 1,627,612 unique links.
			</p>
			<p class="text-sm text-gray-500 pb-2">
				72% of the links were deep links that included a path to a specific page and those were the
				ones examined.
			</p>
		</div>
		<div class="text-xs px-2">
			<Source content={linkRotSource} />
		</div>
	</div>
</div>

<style>
	.tooltip {
		border-radius: 5px;
		padding: 10px;
		background-color: white;
		filter: drop-shadow(rgba(0, 0, 0, 0.3) 0 2px 10px);
	}

	.tooltip-note {
		font-size: 0.5rem;
		inline-size: 20rem;
	}

	.tooltip-body {
		inline-size: 20rem;
		font-size: 0.85rem;
	}

	.tooltip-highlight {
		color: #999999;
		font-weight: 600;
		/* text-decoration: underline; */
		text-decoration-color: #999999;
		text-decoration-thickness: 0.15rem;
		text-decoration-skip-ink: none;
	}
</style>
