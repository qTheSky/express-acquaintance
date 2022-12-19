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
exports.authRouter = void 0;
const express_1 = require("express");
const jwt_service_1 = require("../application/jwt-service");
const auth_service_1 = require("../domain/auth-service");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter
    .post('/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.createUser(req.body.login, req.body.email, req.body.password);
    if (user) {
        res.status(201).send();
    }
    else {
        res.status(400).send({});
    }
}))
    .post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.checkCredentials(req.body.loginOrEmail, req.body.password);
    if (user) {
        const token = yield jwt_service_1.jwtService.createJWT(user);
        res.status(201).send(token);
    }
    else {
        res.sendStatus(401);
    }
}))
    .post('/confirm-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authService.confirmEmail(req.body.code);
    if (result) {
        res.status(201).send();
    }
    else {
        res.sendStatus(400);
    }
}));
