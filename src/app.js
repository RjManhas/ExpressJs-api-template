"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./books/routes"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
const middleware = ({ name }) => (req, res, next) => {
    res.locals.name = name;
    console.log(name);
    next();
};
app.use(middleware({ name: "Rj" }));
(0, routes_1.default)(app);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
