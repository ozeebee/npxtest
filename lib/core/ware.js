"use strict";
// ref: https://github.com/zce/mwa
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ware = void 0;
/**
 * Middleware Async.
 * @template S state type
 */
class Ware {
    constructor() {
        this.middlewares = [];
    }
    /**
     * Use the given middleware.
     * @param middleware middleware func
     */
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    // /**
    //  * Use the given middleware.
    //  * @param middleware middleware func
    //  */
    // use (middleware: Middleware<S> | Array<Middleware<S>>): Ware<S> {
    //   if (typeof middleware === 'function') {
    //     this.middlewares.push(middleware)
    //   } else {
    //     this.middlewares.push(...middleware)
    //   }
    //   return this
    // }
    /**
     * Run all middlewares.
     * @param state initial state
     */
    run(state) {
        return this.middlewares.reduce((prev, current) => prev.then(() => current(state)), Promise.resolve());
    }
}
exports.Ware = Ware;
