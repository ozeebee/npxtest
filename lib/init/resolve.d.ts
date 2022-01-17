import { Context } from './types';
/**
 * Get local template dir.
 * @param input template dir
 * @example
 * 1. relative path, e.g. './foo', '../foo'
 * 2. absolute path, e.g. '/foo', 'C:\\foo'
 * 3. tildify path in windows, e.g. '~/foo'
 */
export declare const getTemplatePath: (input: string) => Promise<false | string>;
/**
 * Get remote template url.
 * @param input template name or uri
 * @example
 * 1. short name, e.g. 'nm'
 * 2. full name, e.g. 'zce/nm'
 * 3. with branch, e.g. 'zce/nm#next'
 * 4. full url, e.g. 'https://github.com/zce/nm/archive/master.zip'
 */
export declare const getTemplateUrl: (input: string) => Promise<string>;
declare const _default: (ctx: Context) => Promise<void>;
/**
 * Resolve template from remote or local.
 */
export default _default;
