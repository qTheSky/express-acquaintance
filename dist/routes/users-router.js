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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_service_1 = require("../domain/users-service");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield users_service_1.usersService.createUser(req.body.login, req.body.email, req.body.password);
    res.status(201).send(newProduct);
}));
