import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

const logger: Handle = async ({ event, resolve }) => {
    const requestStartTime = Date.now();
    const response = await resolve(event);

    const date = new Date(requestStartTime);
    console.log(
        event.params,
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        event.request.method,
        event.url.pathname,
        `- 🐇 ${Date.now() - requestStartTime} ms`,
        `${response.status === 200 ? '✅' : '❌'} ${response.status}`
    );
    return response;
};

export const handle: Handle = sequence(logger);