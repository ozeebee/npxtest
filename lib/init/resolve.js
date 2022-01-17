"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateUrl = exports.getTemplatePath = void 0;
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const ora_1 = __importDefault(require("ora"));
const core_1 = require("../core");
/**
 * Get local template dir.
 * @param input template dir
 * @example
 * 1. relative path, e.g. './foo', '../foo'
 * 2. absolute path, e.g. '/foo', 'C:\\foo'
 * 3. tildify path in windows, e.g. '~/foo'
 */
const getTemplatePath = async (input) => {
    if (!/^[./]|^[a-zA-Z]:|^~[/\\]/.test(input))
        return false;
    const dir = path_1.default.resolve(core_1.file.untildify(input));
    if (await core_1.file.exists(dir) === 'dir')
        return dir;
    throw new Error(`Local template not found: \`${input}\` is not a directory`);
};
exports.getTemplatePath = getTemplatePath;
/**
 * Get remote template url.
 * @param input template name or uri
 * @example
 * 1. short name, e.g. 'nm'
 * 2. full name, e.g. 'zce/nm'
 * 3. with branch, e.g. 'zce/nm#next'
 * 4. full url, e.g. 'https://github.com/zce/nm/archive/master.zip'
 */
const getTemplateUrl = async (input) => {
    if (/^https?:/.test(input))
        return input;
    const [fullname, maybeBranch] = input.split('#');
    const [maybeOwner, maybeName] = fullname.split('/');
    const isEmpty = (input) => input == null || input === '';
    const branch = isEmpty(maybeBranch) ? core_1.config.branch : maybeBranch;
    const name = isEmpty(maybeName) ? maybeOwner : maybeName;
    const owner = isEmpty(maybeName) ? core_1.config.official : maybeOwner;
    const data = { owner, name, branch };
    return core_1.config.registry.replace(/{(\w+)}/g, (_, key) => data[key]);
};
exports.getTemplateUrl = getTemplateUrl;
/**
 * Resolve template from remote or local.
 */
exports.default = async (ctx) => {
    // local template path
    const dir = await exports.getTemplatePath(ctx.template);
    if (dir !== false) {
        ctx.src = dir;
        return;
    }
    // fetch remote template
    const url = await exports.getTemplateUrl(ctx.template);
    // url hash (16 digit md5)
    const hash = crypto_1.default.createHash('md5').update(url).digest('hex').substr(8, 16);
    // template cache path
    ctx.src = path_1.default.join(core_1.config.paths.cache, hash);
    // template cache exist
    const exists = await core_1.file.isDirectory(ctx.src);
    if (ctx.options.offline != null && ctx.options.offline) {
        // offline mode
        if (exists) {
            // found cached template
            return console.log(`Using cached template: \`${core_1.file.tildify(ctx.src)}\`.`);
        }
        console.log(`Cache not found: \`${core_1.file.tildify(ctx.src)}\`.`);
    }
    // clear cache
    exists && await core_1.file.remove(ctx.src);
    const spinner = ora_1.default('Downloading template...').start();
    try {
        // download template zip
        const temp = await core_1.http.download(url);
        // extract template
        await core_1.file.extract(temp, ctx.src, 1);
        // clean up
        await core_1.file.remove(temp);
        spinner.succeed('Download template complete.');
    }
    catch (e) {
        spinner.stop();
        throw new Error(`Failed to pull \`${ctx.template}\` template: ${e.message}.`);
    }
};
