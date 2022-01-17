"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.untildify = exports.tildify = exports.isBinary = exports.write = exports.read = exports.remove = exports.mkdir = exports.isEmpty = exports.isDirectory = exports.isFile = exports.exists = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const adm_zip_1 = __importDefault(require("adm-zip"));
/**
 * Checks whether something exists on given path.
 * @param input input path
 */
const exists = async (input) => {
    try {
        const stat = await fs_1.default.promises.stat(input);
        /* istanbul ignore else */
        if (stat.isDirectory()) {
            return 'dir';
        }
        else if (stat.isFile()) {
            return 'file';
        }
        else {
            return 'other';
        }
    }
    catch (err) {
        /* istanbul ignore if */
        if (err.code !== 'ENOENT') {
            throw err;
        }
        return false;
    }
};
exports.exists = exists;
/**
 * Check input is a file.
 * @param input input path
 */
const isFile = async (input) => {
    const result = await exports.exists(input);
    return result === 'file';
};
exports.isFile = isFile;
/**
 * Check input is a file.
 * @param input input path
 */
const isDirectory = async (input) => {
    const result = await exports.exists(input);
    return result === 'dir';
};
exports.isDirectory = isDirectory;
/**
 * Check input is empty.
 * @param input input path
 */
const isEmpty = async (input) => {
    const files = await fs_1.default.promises.readdir(input);
    return files.length === 0;
};
exports.isEmpty = isEmpty;
/**
 * Make directory recursive.
 * require node >= v10.12
 * @param input input path
 * @param options recursive by default
 */
const mkdir = async (input, options) => {
    await fs_1.default.promises.mkdir(input, { recursive: true, ...options });
};
exports.mkdir = mkdir;
/**
 * Remove input dir or file. recursive when dir
 * require node >= v12.10
 * @param input input path
 * @todo https://github.com/sindresorhus/trash
 */
const remove = async (input, options) => {
    const result = await exports.exists(input);
    if (result === false)
        return;
    // file or other
    if (result !== 'dir')
        return await fs_1.default.promises.unlink(input);
    // dir
    await fs_1.default.promises.rmdir(input, { recursive: true, ...options });
};
exports.remove = remove;
/**
 * Read file as a buffer.
 * @param input file name
 */
const read = async (input) => {
    return await fs_1.default.promises.readFile(input);
};
exports.read = read;
/**
 * Write file with mkdir recursive.
 * @param input file name
 * @param contents file contents
 */
const write = async (input, contents) => {
    await exports.mkdir(path_1.default.dirname(input));
    return await fs_1.default.promises.writeFile(input, contents);
};
exports.write = write;
/**
 * Detect buffer is binary.
 * @param input buffer
 */
const isBinary = (input) => {
    // Detect encoding
    // 65533 is the unknown char
    // 8 and below are control chars (e.g. backspace, null, eof, etc)
    return input.some(item => item === 65533 || item <= 8);
};
exports.isBinary = isBinary;
/**
 * Tildify absolute path.
 * @param input absolute path
 * @see https://github.com/sindresorhus/tildify
 */
const tildify = (input) => {
    const home = os_1.default.homedir();
    // https://github.com/sindresorhus/tildify/issues/3
    input = path_1.default.normalize(input) + path_1.default.sep;
    if (input.indexOf(home) === 0) {
        input = input.replace(home + path_1.default.sep, `~${path_1.default.sep}`);
    }
    return input.slice(0, -1);
};
exports.tildify = tildify;
/**
 * Untildify tilde path.
 * @param input tilde path
 * @see https://github.com/sindresorhus/untildify
 */
const untildify = (input) => {
    const home = os_1.default.homedir();
    input = input.replace(/^~(?=$|\/|\\)/, home);
    return path_1.default.normalize(input);
};
exports.untildify = untildify;
/**
 * Extract zip file.
 * @param input input path or stream
 * @param output output path
 * @param strip strip output path
 * @see https://github.com/shinnn/node-strip-dirs
 */
const extract = async (input, output, strip = 0) => await new Promise(resolve => {
    const zip = new adm_zip_1.default(input);
    strip === 0 || zip.getEntries().forEach(entry => {
        const items = entry.entryName.split(/\/|\\/);
        const start = Math.min(strip, items.length - 1);
        const stripped = items.slice(start).join('/');
        entry.entryName = stripped === '' ? entry.entryName : stripped;
    });
    zip.extractAllToAsync(output, true, err => {
        /* istanbul ignore if */
        if (err != null)
            throw err;
        resolve();
    });
});
exports.extract = extract;
