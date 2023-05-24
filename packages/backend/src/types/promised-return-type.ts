export type PromisedReturnType<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer K> ? K : never;
