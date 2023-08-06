<script lang="ts">
	import ExtraInfo from '../../../components/ExtraInfo.svelte';
	import Linkrot from '../../../components/pieces/Linkrot.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExtraInfo currentIndex={0} />

<Linkrot data={{ 'link-rot': data['link-rot'], 'content-drift': data['content-drift'] }} />
