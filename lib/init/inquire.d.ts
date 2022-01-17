import { PromptObject } from 'prompts';
import { Context } from './types';
/**
 * Prompt validater.
 */
export declare const validater: Record<string, (input: string) => true | string>;
/**
 * Return a prompt processor.
 * defaults & validater
 */
export declare const processor: (ctx: Context) => (item: PromptObject) => void;
declare const _default: (ctx: Context) => Promise<void>;
/**
 * Inquire template prompts.
 */
export default _default;
