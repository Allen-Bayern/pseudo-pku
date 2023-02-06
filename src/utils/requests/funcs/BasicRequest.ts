import { handleOptions } from '../tools/HandleOptions';

export const basicRequest = async <T extends object>(
    url: string, 
    options?: InputOptions<T>,
) => {
    const { 
        init,
        urlAppend,
        returnType,
    } = handleOptions(options);

    const requestedURL = urlAppend ? `${url}?${urlAppend}` : url;
    const response = await fetch(requestedURL, init);

    return {
        response,
        returnType
    };
};
