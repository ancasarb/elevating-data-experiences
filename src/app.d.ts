// See https://kit.svelte.dev/docs/types#app

import type { Metric, MetricName } from '$lib/models';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface Platform {}

		interface PageData {
			[metric: MetricName]: Array<Metric>;
		}
	}
}

export {};
