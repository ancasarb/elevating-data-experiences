<script lang="ts">
	import ExtraInfo from '../../../components/ExtraInfo.svelte';
	import Passwords from '../../../components/pieces/Passwords.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExtraInfo currentIndex={2} />

<Passwords data={{ password: data['password'] }} />
