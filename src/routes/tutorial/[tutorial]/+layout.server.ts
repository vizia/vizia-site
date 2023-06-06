import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { base } from "$app/paths";
import { Tutorial, type ITutorialStep, type TutorialStep, type ITutorial } from "$lib/tutorial";

const TUTORIAL_BASE_PATH = base + "/docs/tutorial/"

export const load = (async ({ params, parent, fetch }) => {

    const assertExists = (x: any) => { if (!x) { throw error(404, 'Not Found') } }

    const parentData = await parent();
    assertExists(parentData)

    const tutorial = parentData.tutorials.find(tutorial => tutorial.identifier === params.tutorial)
    if (!tutorial)
        throw error(404, 'Not found')

    const tutorialResponse = await fetch(TUTORIAL_BASE_PATH + tutorial.indexPath)

    const tutorialSteps = await tutorialResponse.json() as TutorialStep[]

    const tut = new Tutorial(tutorial);

    return {
        tutorial: tutorial as ITutorial,
        tutorialSteps: tutorialSteps as ITutorialStep[],
        tutorialStepsFlattened: tut.stepsFlattened() as TutorialStep[],
        maxTutorialSteps: tut.length(),
    }

}) satisfies LayoutServerLoad