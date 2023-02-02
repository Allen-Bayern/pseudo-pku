import qs from 'qs';

export interface HandledResult {
    init: RequestInit;
    returnType: string;
    urlAppend?: string;
    timeout?: number;
}

export const handleOptions = <T extends object> (options: InputOptions<T> = {}): HandledResult => {
    const init : RequestInit = {};

    // handle method
    const { method } = options;
    const isGet = method === void 0 || method.toLowerCase() === 'get';
    init.method = isGet ? 'GET' : method.toUpperCase();

    // handle returnType
    const { returnType: returned } = options;
    let returnType : string = 'json';
    if (returned !== void 0 && [
        'arrayBuffer',
        'blob',
        'formData',
        'json',
        'text'
    ].includes(returned)) returnType = returned;

    // handle body
    const { body } = options;
    if (!isGet) init.body = body;

    /* 
        * handle params
        * NOTICE: 
        * If you have passed the 'body',
        * DO NOT provide 'params',
        * because 'params' is a prior item
        * and will cover the 'body'!!!
    */
   const { params } = options;
   let urlAppend = '';
   if (params !== void 0) {
        if (isGet) urlAppend = qs.stringify(params);
        else {
            if (['json', 'text'].includes(returnType)) {
                init.body = JSON.stringify(params);
            } else {
                const formData = new FormData();
                Object.keys(params).forEach(
                    key => {
                        let gotten = params[(key as keyof T)];
                        if (typeof gotten !== 'string' && !(gotten instanceof Blob)) {
                            (gotten as string) = String(gotten);
                        }
                        /* 
                            Because gotten can only be string or blob
                        */
                        formData.append(key, (gotten as string | Blob));
                    }
                );
                init.body = formData;
            }
        }
   }

   const doNotAdd : (keyof InputOptions<T>)[] = [
        'method',
        'body',
        'params',
        'timeout',
        'returnType',
        'signal'
   ];

   const restOptions: RequestInit = JSON.parse(
        JSON.stringify(options, Object.keys(options).filter(
            key => !doNotAdd.includes(key as keyof InputOptions<T>)
            )
        )
   );

   Object.assign(init, restOptions);

   const { timeout } = options;
   return timeout !== void 0 
            ? {
                init,
                urlAppend,
                returnType,
                timeout
            }
            : {
                init,
                urlAppend,
                returnType,
            };
}