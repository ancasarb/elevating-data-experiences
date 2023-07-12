export type HierarchicalValue = {
	name: string;
	children: {
		name: string;
		children: {
			id: string;
			name: string;
			value: number;
			color: string;
			category: string;
		}[];
	}[];
};
