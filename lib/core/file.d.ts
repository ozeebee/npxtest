/// <reference types="node" />
import fs from 'fs';
/**
 * Checks whether something exists on given path.
 * @param input input path
 */
export declare const exists: (input: string) => Promise<false | 'file' | 'dir' | 'other'>;
/**
 * Check input is a file.
 * @param input input path
 */
export declare const isFile: (input: string) => Promise<boolean>;
/**
 * Check input is a file.
 * @param input input path
 */
export declare const isDirectory: (input: string) => Promise<boolean>;
/**
 * Check input is empty.
 * @param input input path
 */
export declare const isEmpty: (input: string) => Promise<boolean>;
/**
 * Make directory recursive.
 * require node >= v10.12
 * @param input input path
 * @param options recursive by default
 */
export declare const mkdir: (input: string, options?: fs.MakeDirectoryOptions | undefined) => Promise<void>;
/**
 * Remove input dir or file. recursive when dir
 * require node >= v12.10
 * @param input input path
 * @todo https://github.com/sindresorhus/trash
 */
export declare const remove: (input: string, options?: fs.RmDirOptions | undefined) => Promise<void>;
/**
 * Read file as a buffer.
 * @param input file name
 */
export declare const read: (input: string) => Promise<Buffer>;
/**
 * Write file with mkdir recursive.
 * @param input file name
 * @param contents file contents
 */
export declare const write: (input: string, contents: string | Uint8Array) => Promise<void>;
/**
 * Detect buffer is binary.
 * @param input buffer
 */
export declare const isBinary: (input: Uint8Array) => boolean;
/**
 * Tildify absolute path.
 * @param input absolute path
 * @see https://github.com/sindresorhus/tildify
 */
export declare const tildify: (input: string) => string;
/**
 * Untildify tilde path.
 * @param input tilde path
 * @see https://github.com/sindresorhus/untildify
 */
export declare const untildify: (input: string) => string;
/**
 * Extract zip file.
 * @param input input path or stream
 * @param output output path
 * @param strip strip output path
 * @see https://github.com/shinnn/node-strip-dirs
 */
export declare const extract: (input: string, output: string, strip?: number) => Promise<void>;
