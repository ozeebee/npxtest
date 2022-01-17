"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
const core_1 = require("../core");
/**
 * Fetch remote template list
 * @param owner template owner name
 */
exports.default = async (owner) => {
    const spinner = ora_1.default('Loading available list from remote...').start();
    try {
        const url = `https://caz.vercel.app/templates?owner=${owner}`;
        const response = await core_1.http.request(url);
        const results = await response.json();
        spinner.stop();
        return results;
    }
    catch (e) {
        spinner.stop();
        throw new Error(`Failed to fetch list from remote: ${e.message}.`);
    }
};
