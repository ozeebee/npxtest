"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const fetch_1 = __importDefault(require("./fetch"));
/**
 * Show all available templates.
 */
exports.default = async (owner = core_1.config.official, options = {}) => {
    var _a, _b;
    const results = await fetch_1.default(owner);
    const isOfficial = owner === core_1.config.official;
    // json output
    if ((_a = options.json) !== null && _a !== void 0 ? _a : false) {
        return console.log(JSON.stringify(results));
    }
    // short output
    if ((_b = options.short) !== null && _b !== void 0 ? _b : false) {
        return results.forEach(i => console.log(`→ ${isOfficial ? i.name : i.fullname}`));
    }
    // full mode
    if (results.length === 0) {
        return console.log('No available templates.');
    }
    console.log(`Available ${isOfficial ? 'official' : owner}'s templates:`);
    const infos = results.map(i => [isOfficial ? i.name : i.fullname, i.description]);
    const width = Math.max(5, ...infos.map(i => i[0].length));
    const gap = (name) => ' '.repeat(width - name.length);
    infos.forEach(([name, desc]) => console.log(`  → ${name} ${gap(name)} ${desc}`));
};
