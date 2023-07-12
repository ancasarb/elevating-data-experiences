export type Value = {
	name: string;
	totalCount: number;
	positivePercent: number;
	negativePercent: number;
};

export type Point = {
	x?: number;
	y?: number;
};

export type LegendValue = {
	text: { cross: Array<string>; positive: Array<string>; negative: Array<string> };
	color: (d: Value) => number;
	label: (item: { i: number }) => string;
};
