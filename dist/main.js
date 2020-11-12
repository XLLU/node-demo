"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_config_1 = require("./app/app.config");
const mysql_1 = require("./app/database/mysql");
app_1.default.listen(app_config_1.APP_PORT, () => {
    console.log(`App is running on port ${app_config_1.APP_PORT}.`);
});
mysql_1.connection.connect((error) => {
    if (error) {
        console.log('Error: ', error.message);
        return;
    }
    console.log('Database connected successfully.');
});
//# sourceMappingURL=main.js.map