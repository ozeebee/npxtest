"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rename file if necessary.
 */
exports.default = async (ctx) => {
    const regexp = /{(\w+)}/g;
    ctx.files.forEach(item => {
        if (!regexp.test(item.path))
            return;
        // maybe windows path: \
        // rename it by replace
        item.path = item.path.replace(regexp, (_, key) => ctx.answers[key]);
    });
};
