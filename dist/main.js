"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_config_1 = require("./app/app.config");
const post_router_1 = __importDefault(require("./app/post/post.router"));
app_1.default.listen(app_config_1.APP_PORT, () => {
    console.log(`App is listening on port:${app_config_1.APP_PORT}`);
});
app_1.default.use(post_router_1.default);
//# sourceMappingURL=main.js.map