"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fallback = void 0;
/**
 * Fallback complete hook
 */
const fallback = async (ctx) => {
    console.log(`Created a new project in \`${ctx.project}\` by the \`${ctx.template}\` template.\n`);
    ctx.files.map(i => i.path).sort((a, b) => a > b ? +1 : -1).forEach(i => console.log('- ' + i));
    console.log('\nHappy hacking :)');
};
exports.fallback = fallback;
/**
 * Apply template complete hook.
 */
exports.default = async (ctx) => {
    if (ctx.config.complete == null) {
        return await exports.fallback(ctx);
    }
    if (typeof ctx.config.complete === 'string') {
        return console.log(ctx.config.complete);
    }
    const result = await ctx.config.complete(ctx);
    if (result == null)
        return;
    console.log(result);
};
