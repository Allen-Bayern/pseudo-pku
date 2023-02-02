import { defaultRequest } from "./funcs/DefaultRequest";

/**
 * 统一发起请求
 * @param url {string} 请求接口的URL
 * @param options {InputOptions} 请求的options
 * @param expectedType 只有五值: arrayBuffer, blob, formData, json, text
 * @returns Promise包装后的
 */
export async function request<T extends object = any, U = unknown>(
    url: string,
    options: InputOptions<T> = {},
    otherConfig: {
        expectedType?: string;
        onStatusError?: (status: number) => void,
    } = {
        expectedType: 'json',
    }
) {
    const { onStatusError } = otherConfig;
    return defaultRequest<T, U>(url, options, onStatusError);
}
