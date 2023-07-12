export type LinkRot = {
	year: string;
	intact: number;
	ambiguous: number;
	rotted: number;
};

export type ContentDrift = {
	year: string;
	intact: number;
	drifted: number;
};

export type InternetSpeed = {
	internetType: string;
	internetSpeed: string;
	name: string;
	rank: string;
	value: number;
};

export type Password = {
	year: string;
	rank: string;
	password: string;
	count: number;
	timeToCrack: string;
	timeToCrackCategory: string;
};

export type MetricName = 'link-rot' | 'content-drift' | 'internet-speed' | 'password';

export type Metric = LinkRot | ContentDrift | InternetSpeed | Password;
