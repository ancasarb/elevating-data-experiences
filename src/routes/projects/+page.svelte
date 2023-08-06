<script lang="ts">
	import CarouselNavigation from '../../components/CarouselNavigation.svelte';
	import ExtraInfo from '../../components/ExtraInfo.svelte';
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

<ExtraInfo currentIndex={carouselCurrentIndex} />

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
