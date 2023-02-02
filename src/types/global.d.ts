interface UserInfoLogin {
    username: string;
    password: string;
}

interface InputOptions <T extends object> extends RequestInit {
    params?: T;
    timeout?: number;
    returnType?: string;
}