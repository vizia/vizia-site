import { StepHighlight, type HighlightTypeRegex, type HighlightTypeLine, type HighlightTypeRange } from '../lib/tutorial';
import { describe, expect, it } from 'vitest';

describe("Highlight Test Block", () => {
    it("highlight test range", () => {
        const highlight = StepHighlight.fromString("[b]0=0-5")

        expect(highlight.type).toStrictEqual("basic")
        expect(highlight.highlightType).toStrictEqual("range")
        expect(highlight.data).toStrictEqual({
            line: 0,
            start: 0,
            end: 5,
        } as HighlightTypeRange)
    })

    it("highlight test regex", () => {
        const highlight = StepHighlight.fromString("[b]r/hello/")

        expect(highlight.type).toStrictEqual("basic")
        expect(highlight.highlightType).toStrictEqual("regex")
        expect(highlight.data).toStrictEqual({
            regex: "hello"
        } as HighlightTypeRegex)
    })

    it("highlight test line", () => {
        const highlight = StepHighlight.fromString("[b]l5")

        expect(highlight.type).toStrictEqual("basic")
        expect(highlight.highlightType).toStrictEqual("line")
        expect(highlight.data).toStrictEqual({
            line: 5
        } as HighlightTypeLine)
    })
})