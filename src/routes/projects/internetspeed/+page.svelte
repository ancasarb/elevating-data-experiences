<script lang="ts">
	import ExtraInfo from '../../../components/ExtraInfo.svelte';
	import InternetSpeed from '../../../components/pieces/InternetSpeed.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExtraInfo currentIndex={1} />

<InternetSpeed data={{ 'internet-speed': data['internet-speed'] }} visible={true} />
