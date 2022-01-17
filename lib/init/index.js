"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const confirm_1 = __importDefault(require("./confirm"));
const resolve_1 = __importDefault(require("./resolve"));
const load_1 = __importDefault(require("./load"));
const inquire_1 = __importDefault(require("./inquire"));
const setup_1 = __importDefault(require("./setup"));
const prepare_1 = __importDefault(require("./prepare"));
const rename_1 = __importDefault(require("./rename"));
const render_1 = __importDefault(require("./render"));
const emit_1 = __importDefault(require("./emit"));
const install_1 = __importDefault(require("./install"));
const init_1 = __importDefault(require("./init"));
const complete_1 = __importDefault(require("./complete"));
const creator = new core_1.Ware();
creator.use(confirm_1.default);
creator.use(resolve_1.default);
creator.use(load_1.default);
creator.use(inquire_1.default);
creator.use(setup_1.default);
creator.use(prepare_1.default);
creator.use(rename_1.default);
creator.use(render_1.default);
creator.use(emit_1.default);
creator.use(install_1.default);
creator.use(init_1.default);
creator.use(complete_1.default);
exports.default = async (template, project = '.', options = {}) => {
    // required arguments
    if (template == null || template === '') {
        throw new Error('Missing required argument: `template`.');
    }
    // create context
    const context = {
        template,
        project,
        options,
        src: '',
        dest: '',
        config: Object.create(null),
        answers: Object.create(null),
        files: []
    };
    // running creator
    await creator.run(context);
};
