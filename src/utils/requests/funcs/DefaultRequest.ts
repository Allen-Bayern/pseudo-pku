import { basicRequest } from './BasicRequest';
import {
    createController,
    abortRequest
} from '../tools/HandleController';

export const defaultRequest = async <T extends object = any, U = unknown>(
    url: string,
    options: InputOptions<T> = {},
    onStatusError?: (status : number) => void
) => {
    /* 
        * Give fetch API a default timeout 2000
        * 
        * To configure timeout in fetch API
        * see this article: https://dmitripavlutin.com/timeout-fetch-request/
        * 
        * 给fetch API设置timeout，详见: https://dmitripavlutin.com/timeout-fetch-request/
    */
    const { timeout } = options;

    let signal: AbortSignal | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const realTimeout = timeout && timeout > 2000 ? timeout : 2000;

    if (AbortSignal.timeout) signal = AbortSignal.timeout(realTimeout);
    else {
        const controller = createController();
        timer = setTimeout(() => { abortRequest(controller); }, realTimeout);
    }

    const { response } = await basicRequest(url, options);
    timer && clearTimeout(timer);
    const {
        status,
        json
    } = response;

    const consequence = await json();

    if (status >= 300 && status !== 304) {
        const reason = `The request meets some mistakes! The status code is ${status}`;
        onStatusError && onStatusError(status);
        return Promise.reject<{
            reason: string;
            consequence: unknown;
        }>({
            reason,
            consequence,
        });
    } else if (status === 304) {
        // Handle 304 error 处理304
        console.log(`The status code is ${status}, but the request is not an error. Try to solve the ${status} problem`);
    }
    
    return (consequence as U);
};
