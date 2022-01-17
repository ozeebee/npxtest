import { RequestInfo, RequestInit, Response } from 'node-fetch';
/**
 * Send a http request.
 * @param url url
 * @param init init
 */
export declare const request: (url: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
/**
 * Download remote resource to temporary file.
 * @param url remote url
 * @returns temporary filename
 */
export declare const download: (url: string) => Promise<string>;
