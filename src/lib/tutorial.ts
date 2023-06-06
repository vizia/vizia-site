import { error } from "@sveltejs/kit";

export const ALLOWED_CODE_EXTENSIONS = ["rs", "css", "scss"]
export const ALLOWED_IMAGE_EXTENSIONS = ["png"]
export const FILE_EXTENSION_REGEX = /.+?\.([a-z]+)$/;
export const RANGE_SIMPLIFY_DEPTH = 3

export function extensionFromName(file: string): string {
    return FILE_EXTENSION_REGEX.exec(file)?.[1] ?? ""
}

export const HIGHLIGHT_TYPES = [
    "range", "regex", "line"
]

export interface ITutorial {
    title: string,
    identifier: string,
    description: string,
    indexPath: string,
    directory: string,
    steps: TutorialStep[] | undefined
}

export class Tutorial implements ITutorial {
    title: string;
    identifier: string;
    description: string;
    indexPath: string;
    directory: string;
    steps: TutorialStep[] | undefined;

    constructor(tut: ITutorial) {
        this.title = tut.title
        this.identifier = tut.identifier
        this.description = tut.description
        this.indexPath = tut.indexPath
        this.directory = tut.directory
        this.steps = tut.steps
    }

    length(): number {
        let count = 0
        this.steps?.forEach(v => count += v.length())
        return count
    }

    stepsFlattened(): TutorialStep[] {
        let arr: TutorialStep[] = []
        this.steps?.forEach(v => arr.concat(v.stepsFlattened()))
        return arr
    }
}

export interface ITutorialStep {
    title: string,
    queryName: string,
    markdownPath: string,
    files: (string | ITutorialStepFile)[]
    steps: ITutorialStep[]
}

export class TutorialStep implements ITutorialStep {
    title: string;
    queryName: string;
    markdownPath: string;
    files: TutorialStepFile[];
    steps: TutorialStep[];

    constructor(step: ITutorialStep) {
        this.title = step.title
        this.queryName = step.queryName
        this.markdownPath = step.markdownPath
        this.files = []
        if (step.files)
            this.files = step.files.map(v => {
                if (typeof v === "string") {
                    const newV = new TutorialStepFile({
                        file: v,
                        fileData: undefined,
                        highlights: []
                    })
                    return newV
                }
                return new TutorialStepFile(v)
            })
        this.steps = []
        if (step.steps)
            this.steps = step.steps.map(v => new TutorialStep(v))
    }

    stepsFlattened(): TutorialStep[] {
        let arr: TutorialStep[] = [this]
        this.steps.forEach(v => arr.concat(v.stepsFlattened()))
        return arr
    }

    findStep(filePath: string): TutorialStep | undefined {
        if (this.queryName === filePath)
            return this
        else {
            return this.steps.map(v => v.findStep(filePath)).find(v => v !== undefined)
        }
    }

    length(): number {
        let count = 1
        this.steps.forEach(v => count += v.length())
        return count
    }

}

export interface ITutorialStepFile {
    file: string,
    fileData: string | undefined;
    highlights: string[]
}

export class TutorialStepFile implements ITutorialStepFile {
    file: string;
    fileData: string | undefined;
    highlights: string[];
    highlightData: StepHighlight[];

    isFileDataSet: boolean

    constructor(stepFile: ITutorialStepFile) {
        this.file = stepFile.file
        this.highlights = stepFile.highlights
        this.highlightData = stepFile.highlights.map(v => StepHighlight.fromString(v))
        this.fileData = undefined

        this.isFileDataSet = false
    }

    setFileData(fileData: string) {
        this.isFileDataSet = true
        this.fileData = fileData
    }

    simplifyHighlights() {

        if (!this.isFileDataSet)
            throw error(500, "File data unset")

        const hls = this.highlightData;

        for (let j = 0; j < RANGE_SIMPLIFY_DEPTH; j++) {

            for (let i = 0; i < hls.length - 1; i++) {

                const h = hls[i]
                const hn = hls[i + 1]

                // Ensure each highlight is converted to type "Range" for ease of handling
                switch (h.highlightType) {
                    case "regex":
                        this.applyRegexHighlight(h)
                        break
                    case "line":
                        this.applyLineHighlight(h)
                        break
                    case "range":
                    default:
                        break
                }

                const hd = h.data as HighlightTypeRange
                const hdn = hn.data as HighlightTypeRange

                if (hd.line == hdn.line && hd.end >= hdn.start - 1) {
                    hd.end = hdn.end;

                    hls.splice(i + 1, 1);
                    break;
                }

            }
        }


    }

    applyRegexHighlight(hl: StepHighlight) {

        const text = this.fileData ?? ""

        let lineIdx = -1;
        for (const _ of text.split('\n') ?? "") {
            lineIdx++;
            for (const match of text.matchAll(new RegExp(hl.regex()))) {
                let matchIdx = match.index as number;
                hl = new StepHighlight({
                    highlightType: hl.highlightType,
                    type: hl.type,
                    data: {
                        line: lineIdx,
                        start: matchIdx,
                        end: matchIdx + match.length,
                    }
                } as IStepHighlight)
            }
        }
    }

    applyLineHighlight(hl: StepHighlight) {

    }

    inversedRanges(): StepHighlight[] {

        this.simplifyHighlights()

        let lines = this.fileData?.split('\n') ?? []

        let invRanges: StepHighlight[] = [];

        let push_range = (range: HighlightTypeRange) => {
            if (range.end != range.start) {
                invRanges.push(new StepHighlight({
                    data: range,
                    highlightType: "range",
                    type: "disabled"
                }))
            }
        }

        for (let l = 0; l < lines.length; l++) {

            let rs = this.highlightData.filter(r => {
                const rsd = r.data as HighlightTypeRange

            });

            if (rs.length == 0) {
                push_range({ start: 0, end: lines[l].length, line: l } as HighlightTypeRange)
                continue;
            }

            // start
            if (rs[0].start() != 0) {
                push_range({ start: 0, end: rs[0].start(), line: l } as HighlightTypeRange)
            }

            // middle
            for (let i = 0; i < rs.length - 1; i++) {
                if (rs[i].end < rs[i + 1].start) {
                    push_range({ start: rs[i].end(), end: rs[i + 1].start(), line: l } as HighlightTypeRange);
                }
            }

            // end
            let last = rs[rs.length - 1];
            if (last.end() != lines[l].length) {
                push_range({ start: last.end(), end: lines[l].length, line: l } as HighlightTypeRange)
            }
        }

        return invRanges;
    }
}

export type HighlightType = "range" | "regex" | "line"
export type HighlightTypeLine = { line: number }
export type HighlightTypeRegex = { regex: string }
export type HighlightTypeRange = { line: number, start: number, end: number }

export type HighlightRenderType = "basic" | "error" | "disabled"
export const HighlightRenderTypes = ["basic", "error", "disabled"]
export const HighlightRenderTypeArr = ["b", "e", "d"]
export interface IStepHighlight {
    type: string,
    highlightType: HighlightType,
    data: HighlightTypeLine | HighlightTypeRegex | HighlightTypeRange
}

const HIGHLIGHT_PARSER = /^\[(\w)\]((l\d)|(r\/.+?\/)|(\d=\d+?-\d+?))$/
export class StepHighlight implements IStepHighlight {
    type: HighlightRenderType
    highlightType: HighlightType;
    data: HighlightTypeLine | HighlightTypeRegex | HighlightTypeRange

    static fromString(str: string): StepHighlight {

        let newStep = new StepHighlight({
            type: "basic",
            highlightType: "line",
            data: { line: 0 }
        } as IStepHighlight)

        let match = HIGHLIGHT_PARSER.exec(str)
        if (!match) {
            throw error(500, "Highlight could not be parsed: " + str)
        }

        // @ts-ignore For some reason it thinks match can be null when it cant
        let typeIdx = HighlightRenderTypeArr.indexOf(match[1])
        if (typeIdx === undefined)
            throw Error("Highlight could not be parsed: " + str)

        newStep.type = HighlightRenderTypes[typeIdx] as HighlightRenderType

        if (match[3]) {
            newStep.highlightType = "line"

            newStep.data = {
                line: parseInt(match[3].replace("l", ""))
            } as HighlightTypeLine

        } else if (match[4]) {
            newStep.highlightType = "regex"

            newStep.data = {
                regex: match[4].replaceAll("/", "").replace("r", "")
            } as HighlightTypeRegex

        } else {
            newStep.highlightType = "range"

            const [line, rest] = match[2].split('=')
            const [start, end] = rest.split('-')

            newStep.data = {
                line: parseInt(line),
                start: parseInt(start),
                end: parseInt(end)
            } as HighlightTypeRange
        }

        return newStep
    }

    constructor(step: IStepHighlight) {
        this.data = step.data
        this.highlightType = step.highlightType
        this.type = step.type as HighlightRenderType
    }

    regex(): string {
        if (this.highlightType !== "regex") {
            throw error(500, "Highlight is not of type regex")
        }
        return (this.data as HighlightTypeRegex).regex
    }

    line(): number {
        if (this.highlightType === "regex") {
            throw error(500, "Highlight is not of type range")
        }
        return (this.data as HighlightTypeRange).line
    }

    start(): number {
        if (this.highlightType !== "range") {
            throw error(500, "Highlight is not of type range")
        }
        return (this.data as HighlightTypeRange).start
    }

    end(): number {
        if (this.highlightType !== "range") {
            throw error(500, "Highlight is not of type range")
        }
        return (this.data as HighlightTypeRange).end
    }
}