"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/promise-function-async */
const child_process_1 = require("child_process");
/**
 * Execute a command.
 * @param command command name
 * @param args command arguments
 * @param options command options
 */
exports.default = (command, args, options) => new Promise((resolve, reject) => {
    child_process_1.spawn(command, args, options)
        .on('error', reject)
        .on('exit', code => {
        if (code === 0)
            return resolve();
        reject(new Error(`Failed to execute ${command} command.`));
    });
});
