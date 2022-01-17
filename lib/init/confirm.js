"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const core_1 = require("../core");
/**
 * Confirm destination.
 */
exports.default = async (ctx) => {
    // resolve dest path
    ctx.dest = path_1.default.resolve(ctx.project);
    // exist
    const exists = await core_1.file.exists(ctx.dest);
    // dist not exists
    if (exists === false)
        return;
    // force mode
    if (ctx.options.force != null && ctx.options.force) {
        return await core_1.file.remove(ctx.dest);
    }
    // destination is file
    if (exists !== 'dir')
        throw new Error(`Cannot create ${ctx.project}: File exists.`);
    // is empty dir
    if (await core_1.file.isEmpty(ctx.dest))
        return;
    // is current working directory
    const isCurrent = ctx.dest === process.cwd();
    // // require node >= v8.3.0
    // console.clear()
    // confirm & choose next
    const { choose } = await prompts_1.default([
        {
            name: 'sure',
            type: 'confirm',
            message: isCurrent ? 'Create in current directory?' : 'Target directory already exists. Continue?'
        },
        {
            name: 'choose',
            type: (prev) => prev ? 'select' : null,
            message: `${isCurrent ? 'Current' : 'Target'} directory is not empty. How to continue?`,
            hint: ' ',
            choices: [
                { title: 'Merge', value: 'merge' },
                { title: 'Overwrite', value: 'overwrite' },
                { title: 'Cancel', value: 'cancel' }
            ]
        }
    ]);
    // Otherwise is cancel task
    if (choose == null || choose === 'cancel')
        throw new Error('You have cancelled this task.');
    // Overwrite require empty dest
    if (choose === 'overwrite')
        await core_1.file.remove(ctx.dest);
    // Merge not require any action
};
