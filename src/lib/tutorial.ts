import type { StepCodeHighlight } from "./types";

export const ALLOWED_CODE_EXTENSIONS = ["rs", "css", "scss"]

export const ALLOWED_IMAGE_EXTENSIONS = ["png"]

export const FILE_EXTENSION_REGEX = /.+?\.([a-z]+)$/;

export function extensionFromName(file: string): string {
    return FILE_EXTENSION_REGEX.exec(file)?.[1] ?? ""
}

export function simplify_ranges(ranges: StepCodeHighlight[]): StepCodeHighlight[] {
    while (true) {
        let changed = false;

        for (let i = 0; i < ranges.length - 1; i++) {
            if (ranges[i].line == ranges[i + 1].line && ranges[i].end >= ranges[i + 1].start - 1) {
                ranges[i].end = ranges[i + 1].end;

                ranges.splice(i + 1, 1);
                changed = true;
                break;
            }

        }

        if (!changed || ranges.length == 1) {
            break;
        }
    }

    return ranges;
}

export function inverse_ranges(ranges: StepCodeHighlight[], text: string): StepCodeHighlight[] {

    ranges = simplify_ranges(ranges)

    let lines = text.split('\n')

    let inv_ranges = [];

    for (let l = 0; l < lines.length; l++) {

        let rs = ranges.filter(r => r.line == l);

        if (rs.length == 0) {
            inv_ranges.push({ start: 0, end: lines[l].length, line: l } as StepCodeHighlight)
            continue;
        }

        // start
        if (rs[0].start != 0) {
            inv_ranges.push({ start: 0, end: rs[0].start, line: l } as StepCodeHighlight)
        }

        // middle
        for (let i = 0; i < rs.length - 1; i++) {
            if (rs[i].end < rs[i + 1].start) {
                inv_ranges.push({ start: rs[i].end, end: rs[i + 1].start, line: l } as StepCodeHighlight);
            }
        }

        // end
        let last = rs[rs.length - 1];
        if (last.end != lines[l].length) {
            inv_ranges.push({ start: last.end, end: lines[l].length, line: l } as StepCodeHighlight)
        }
    }

    return inv_ranges;
}