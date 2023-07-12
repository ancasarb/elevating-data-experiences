import { csv, type DSVRowArray } from 'd3';
import type { PageLoad } from './$types';
import type { ContentDrift, InternetSpeed, LinkRot, Password } from '$lib/models';

export const load = (async ({ fetch }) => {
	async function loadJson<T>(path: string): Promise<T[]> {
		const result = await fetch(path);
		const data = (await result.json()) as T[];
		return data;
	}

	async function loadCsv<T>(
		path: string,
		mapper: (rows: DSVRowArray<string>) => T[]
	): Promise<T[]> {
		const result = await csv(path);
		const data = mapper(result);
		return data;
	}

	return {
		'link-rot': await loadJson<LinkRot>(
			`https://raw.githubusercontent.com/ancasarb/pixel-on-canvas/main/data/link_rot.json`
		),
		'content-drift': await loadJson<ContentDrift>(
			`https://raw.githubusercontent.com/ancasarb/pixel-on-canvas/main/data/content_drift.json`
		),
		'internet-speed': await loadCsv<InternetSpeed>(
			`https://raw.githubusercontent.com/ancasarb/pixel-on-canvas/main/data/internet_speed.csv`,
			(data: DSVRowArray<string>) =>
				data.map((d) => {
					return {
						internetType: String(d['internet_type']),
						internetSpeed: String(d['internet_speed']),
						name: String(d['name']),
						rank: String(d['rank']),
						value: parseFloat(String(d['value']))
					};
				})
		),
		password: await loadCsv<Password>(
			`https://raw.githubusercontent.com/ancasarb/pixel-on-canvas/main/data/passwords.csv`,
			(data: DSVRowArray<string>) =>
				data.map((d) => {
					return {
						year: String(d['year']),
						rank: String(d['rank']),
						password: String(d['password']),
						timeToCrack: String(d['time_to_crack_cleaned']),
						count: parseInt(String(d['count']), 10),
						timeToCrackCategory: String(d['category'])
					};
				})
		)
	};
}) satisfies PageLoad;
