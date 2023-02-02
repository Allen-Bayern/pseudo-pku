import { MockMethod } from 'vite-plugin-mock';

export const login: MockMethod[] = [
    {
        url: '/pku/login',
        method: 'post',
        response: {
            ret: 0,
            state: 'success',
            data: {}
        }
    },
];
