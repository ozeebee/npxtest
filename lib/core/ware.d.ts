export declare type Middleware<S> = (state: S) => Promise<void> | void;
/**
 * Middleware Async.
 * @template S state type
 */
export declare class Ware<S> {
    private readonly middlewares;
    /**
     * Use the given middleware.
     * @param middleware middleware func
     */
    use(middleware: Middleware<S>): Ware<S>;
    /**
     * Run all middlewares.
     * @param state initial state
     */
    run(state: S): Promise<void>;
}
