export interface Result {
    name: string;
    owner: string;
    fullname: string;
    description: string;
    updated: string;
}
declare const _default: (owner: string) => Promise<Result[]>;
/**
 * Fetch remote template list
 * @param owner template owner name
 */
export default _default;
