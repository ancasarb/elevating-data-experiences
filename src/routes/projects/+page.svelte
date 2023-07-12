<script lang="ts">
	import CarouselNavigation from '../../components/CarouselNavigation.svelte';
	import InternetSpeed from '../../components/pieces/InternetSpeed.svelte';
	import Linkrot from '../../components/pieces/Linkrot.svelte';
	import Passwords from '../../components/pieces/Passwords.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	let carouselCurrentIndex: number = 0;

	const handleClick = function (value: number) {
		carouselCurrentIndex = carouselCurrentIndex + value;
	};
</script>

<div class="hidden md:flex">
	<input type="checkbox" id="drawer-toggle" class="relative sr-only peer mt-16 mx-2" />
	<label
		for="drawer-toggle"
		class="absolute mt-16 mx-2 top-0 left-0 inline-block p-2 transition-all rounded-sm duration-500 bg-stone-950 peer-checked:rotate-180 peer-checked:left-64"
	>
		<div><p class="text-white text-lg align-middle">...</p></div>
	</label>
	<div
		class="fixed mt-16 mx-2 top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0"
	>
		<div class="px-6 py-4">
			<h2 class="text-lg font-semibold">Tools</h2>
			<p class="text-gray-500 text-sm">Svelte</p>
			<p class="text-gray-500 text-sm">D3.js</p>
			{#if carouselCurrentIndex === 0}
				<p class="text-gray-500 text-sm">Textures.js</p>
			{/if}
			<p class="text-gray-500 text-sm">Tailwind CSS</p>
			<p class="text-gray-500 text-sm">Python (pandas, numpy for data processing)</p>
		</div>
		<div class="px-6 py-4">
			<h2 class="text-lg font-semibold">Lessons</h2>
			<p class="text-gray-500 text-sm">
				{carouselCurrentIndex === 0
					? 'Learned how to show data horizontally on large screens, but vertically on small screens.'
					: carouselCurrentIndex === 1
					? 'Learned how to use animation duration as a visual channel to communicate the data.'
					: 'Learned how to zoom in and out to different levels of detail.'}
			</p>
		</div>
	</div>
</div>

<div id="portfolio-carousel-gallery" class="relative w-full">
	<div class="relative h-[100vh]">
		<div>
			<CarouselNavigation {handleClick} current={carouselCurrentIndex} />
		</div>
		<div class={(carouselCurrentIndex === 0 ? '' : 'hidden') + ' absolute block max-w-full'}>
			<Linkrot data={{ 'link-rot': data['link-rot'], 'content-drift': data['content-drift'] }} />
		</div>
		<div class={(carouselCurrentIndex === 1 ? '' : 'hidden') + ' absolute block max-w-full'}>
			<InternetSpeed
				data={{ 'internet-speed': data['internet-speed'] }}
				visible={carouselCurrentIndex === 1}
			/>
		</div>
		<div class={(carouselCurrentIndex === 2 ? '' : 'hidden') + ' absolute block max-w-full'}>
			<Passwords data={{ password: data['password'] }} />
		</div>
	</div>
</div>
