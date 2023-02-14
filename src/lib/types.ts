export interface PostMeta {
	date: string;
	title: string;
	landing_image: string;
}

export interface Post {
	path: string;
	meta?: PostMeta;
}

export interface FileMeta {
	title: string;
	show?: boolean;
}

export const fileMetaAttrs = [
	"order", "title", "show"
]

export interface File {
	file_name: string;
	path: string;
	link: string;
	is_dir: boolean;
	meta?: FileMeta;
	files: File[];
}


export const highlightTypes = [
	"range", "regex", "line"
]

export interface HighlightUnprocessed {
	type: string,
	highlightType: string,
	line?: number,
	start?: number,
	end?: number,
	regex?: string
}

export interface Tutorial {
	title: string,
	dir: string,
	items: Item[];
}


export interface Item {
	title: string,
	markdownFileName: string,
	codeFileName?: string,
	codeHighlight?: HighlightUnprocessed[],
	processedCodeHighlight?: StepCodeHighlight[]
	markdownData?: string,
	codeData?: string
	items: Item[]
}

export interface StepCodeHighlight {
	highlightType: string,
	line: number,
	start: number,
	end: number
}

export interface DropdownItem {
	name: string,
	link?: string,
	indexStack?: number[],
	items: DropdownItem[]
}