"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Apply template setup hook.
 */
exports.default = async (ctx) => {
    if (ctx.config.setup == null)
        return;
    await ctx.config.setup(ctx);
};
