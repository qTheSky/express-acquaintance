"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_router_1 = require("./routes/products-router");
const db_1 = require("./repositories/db");
const users_router_1 = require("./routes/users-router");
const auth_router_1 = require("./routes/auth-router");
const email_router_1 = require("./routes/email-router");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const parserMiddleware = body_parser_1.default.json();
app.use(parserMiddleware);
app.use('/products', products_router_1.productsRouter);
app.use('/users', users_router_1.usersRouter);
app.use('/auth', auth_router_1.authRouter);
app.use('/email', email_router_1.emailRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
