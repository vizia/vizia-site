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


export interface Tutorial {
	title: string,
	dir: string,
	steps: TutorialStep[]
}

export interface TutorialStep {
	stepTitle: string,
	fileName: string, // Filename of the markdown of the step (in the same directory)
	codeFileName: string, // Filename of the code of the step (in the same directory)
	codeHighlight: StepCodeHighlight[]
	data: string
	codeData: string
}

export interface StepCodeHighlight {
	type: string,
	line: number,
	start: number,
	end: number
}