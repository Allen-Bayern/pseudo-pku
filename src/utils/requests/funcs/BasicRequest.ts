import { handleOptions } from '../tools/HandleOptions';
import {
    createController,
    abortRequest
} from '../tools/HandleController';

export const basicRequest = async <T extends object>(
    url: string, 
    options?: InputOptions<T>,
) => {
    const { 
        init,
        urlAppend,
        timeout,
        returnType,
    } = handleOptions(options);

    const requestedURL = urlAppend ? `${url}?${urlAppend}` : url;

    let signal: AbortSignal | null = null;
    
    const controller = createController();
    const timer = setTimeout(() => {
        abortRequest(controller);
    }, (timeout && timeout > 2000) ? timeout : 2000);
    const { signal: abortSignal } = controller;
    signal = abortSignal;
    Object.assign(init, { signal });

    const response = await fetch(requestedURL, init);
    timer && clearTimeout(timer);

    return {
        response,
        returnType
    };
}
