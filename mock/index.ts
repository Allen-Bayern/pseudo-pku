import { MockMethod } from 'vite-plugin-mock';
import { login } from './module/login';

const allMocks: MockMethod[] = [
    ...login,
];

export default allMocks;
