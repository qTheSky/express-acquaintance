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
exports.feedbackRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../midlewares/auth-middleware");
const feedbacks_service_1 = require("../domain/feedbacks-service");
exports.feedbackRouter = (0, express_1.Router)({});
exports.feedbackRouter
    .post('/', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield feedbacks_service_1.feedbacksService.sendFeedback(req.body.comment, req.user._id);
    res.status(201).send(newProduct);
}))
    .get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield feedbacks_service_1.feedbacksService.allFeedbacks();
    res.send(users);
}));
