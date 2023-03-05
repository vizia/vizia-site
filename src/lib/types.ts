export interface BlogPost {
	date: string;
	title: string;
	description: string;
	author: string;
	image: string;
	type: string;
	markdown?: string;
	path: string;
}

export interface FileMeta {
	title: string;
	show?: boolean;
}

export const FILE_META_ATTRS = [
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


export const HIGHLIGHT_TYPES = [
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
	description: string,
	dir: string,
	items: Item[];
}

export interface UnparsedTutorial {
	title: string,
	description: string,
	dir: string,
	items: UnparsedItem[];
}

export interface Item {
	title: string,
	markdownFile: string,
	markdownFileData: string,
	files: FileItem[],
	items: Item[]
}

export interface FileItem {
	file: string,
	fileData: string,
	highlights: StepCodeHighlight[]
}

export interface UnparsedItem {
	title: string,
	markdownFile: string,
	files: UnparsedFileItem[],
	items: UnparsedItem[]
}

export interface UnparsedFileItem {
	file: string,
	highlights?: HighlightUnprocessed[]
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