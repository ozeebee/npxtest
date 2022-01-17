"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const _1 = __importStar(require("."));
const package_json_1 = require("../package.json");
const cli = cac_1.default(package_json_1.name);
cli
    .command('<template> [project]', 'Create new project from a template')
    .option('-f, --force', 'Overwrite if the target exists')
    .option('-o, --offline', 'Try to use an offline template')
    .option('-t, --tpldeps', 'Install template dependencies')
    // .option('-d, --debug', 'Output detailed exception when exception occurs')
    .allowUnknownOptions() // for prompts override.
    .example('  # with an official template')
    .example(`  $ ${package_json_1.name} <template> [project]`)
    .example('  # with a custom github repo')
    .example(`  $ ${package_json_1.name} <owner>/<repo> [project]`)
    .action(_1.default);
cli
    .command('list [owner]', 'Show all available templates')
    .alias('ls')
    .option('-j, --json', 'Output with json format')
    .option('-s, --short', 'Output with short format')
    .action(_1.list);
cli.help().version(package_json_1.version).parse();
// https://github.com/cacjs/cac#error-handling
/* istanbul ignore next */
const onError = (err) => {
    // output details when exception occurs
    cli.options.debug && console.error(err);
    console.error('Exception occurred: ' + err.message);
    process.exit(1);
};
process.on('uncaughtException', onError);
process.on('unhandledRejection', onError);
