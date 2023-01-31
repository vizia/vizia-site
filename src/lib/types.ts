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
	order: number;
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


export interface TutorialUnparsed {
	title: string,
	dir: string,
	steps: TutorialStepUnparsed[]
}

export interface TutorialStepUnparsed {
	stepTitle: string,
	fileName: string, // Filename of the markdown of the step (in the same directory)
	codeFileName: string, // Filename of the code of the step (in the same directory)
	codeHighlight: HighlightUnprocessed[]
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
	steps: TutorialStep[];
}

export interface TutorialStep {
	stepTitle: string,
	fileName: string,
	codeFileName: string,
	codeHighlight: StepCodeHighlight[],
	markdownData: string,
	codeData: string
}

export interface StepCodeHighlight {
	highlightType: string,
	line: number,
	start: number,
	end: number
}

