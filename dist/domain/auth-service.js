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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const users_repository_1 = require("../repositories/users-repository");
const emails_manager_1 = require("../managers/emails-manager");
const uuid_1 = require("uuid");
const add_1 = __importDefault(require("date-fns/add"));
exports.authService = {
    createUser(login, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield this._generateHash(password);
            const newUser = {
                _id: new mongodb_1.ObjectId(),
                accountData: {
                    userName: login,
                    email,
                    passwordHash,
                    createdAt: new Date().toISOString(),
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: (0, add_1.default)(new Date(), {
                        hours: 1,
                        minutes: 3,
                    }),
                    sentEmails: [],
                    isConfirmed: false
                },
            };
            const createResult = users_repository_1.usersRepository.createUser(newUser);
            try {
                yield emails_manager_1.emailsManager.sendEmailConfirmationMessage(newUser);
            }
            catch (e) {
                console.error(e);
                // await usersRepository.deleteUser(newUser._id)
                return null;
            }
            return createResult;
        });
    },
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.findByLoginOrEmail(loginOrEmail);
            if (!user)
                return null;
            if (!user.emailConfirmation.isConfirmed) {
                return null;
            }
            const isHashesEquals = yield this._isPasswordCorrect(password, user.accountData.passwordHash);
            if (isHashesEquals) {
                return user;
            }
            else {
                return null;
            }
        });
    },
    _generateHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, 10);
        });
    },
    _isPasswordCorrect(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEqual = yield bcrypt_1.default.compare(password, hash);
            return isEqual;
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_repository_1.usersRepository.findUserById(id);
        });
    },
    confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.findUserByConfirmationCode(code);
            if (!user)
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            if (user.emailConfirmation.confirmationCode !== code)
                return false;
            if (user.emailConfirmation.expirationDate < new Date())
                return false;
            const result = yield users_repository_1.usersRepository.updateConfirmation(user._id);
            return result;
        });
    },
};
