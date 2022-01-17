"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const core_1 = require("../core");
/**
 * Render file if template.
 */
exports.default = async (ctx) => {
    // interpolate
    // https://github.com/lodash/lodash/blob/master/.internal/reEvaluate.js
    const regexp = /<%([\s\S]+?)%>/;
    const imports = {
        ...ctx.config.metadata,
        ...ctx.config.helpers
    };
    ctx.files.forEach(item => {
        // ignore binary files
        if (core_1.file.isBinary(item.contents))
            return;
        const text = item.contents.toString();
        // ignore files without interpolate
        if (!regexp.test(text))
            return;
        const compiled = lodash_1.default.template(text, { imports });
        const newContents = compiled(ctx.answers);
        item.contents = Buffer.from(newContents);
    });
};
