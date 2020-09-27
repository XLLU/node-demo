"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
const data = [
    {
        id: 1,
        name: "lucas",
        gender: "male",
    },
    {
        id: 2,
        name: "nancy",
        gender: "female",
    },
];
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
app.get("/", (req, res) => {
    res.send(data);
});
app.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send(data.filter((item) => item.id == parseInt(id, 10)));
});
//# sourceMappingURL=main.js.map