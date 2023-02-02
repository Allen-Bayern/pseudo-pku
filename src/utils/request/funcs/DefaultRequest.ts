import { basicRequest } from "./BasicRequest";

export const defaultRequest = async <T extends object, U = unknown>(
    url: string,
    options: InputOptions<T> = {},
    onResponseError?: (status : number) => void
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
    !timeout && Object.assign(options, {
        timeout: 2000,
    });

    const { response } = await basicRequest(url, options);
    const {
        status,
        json
    } = response;

    const consequence = json();

    if (status >= 300 && status !== 304) {
        const reason = `The request meets some mistakes! The status code is ${status}`;
        onResponseError && onResponseError(status);
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
    
    return await (consequence as U);
}