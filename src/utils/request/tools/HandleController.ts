const createController = () => new AbortController();

const abortRequest = (controller: AbortController): void => {
    const { signal } = controller;
    !signal.aborted && controller.abort();
};

export {
    createController,
    abortRequest,
};