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
exports.usersService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const users_repository_1 = require("../repositories/users-repository");
const emails_manager_1 = require("../managers/emails-manager");
const uuid_1 = require("uuid");
const add_1 = __importDefault(require("date-fns/add"));
exports.usersService = {
    createUser(login, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const newUser = {
                _id: new mongodb_1.ObjectId(),
                accountData: {
                    userName: login,
                    email,
                    passwordHash,
                    passwordSalt,
                    createdAt: new Date().toISOString(),
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: (0, add_1.default)(new Date(), {
                        hours: 1,
                        minutes: 3,
                    }),
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
            const passwordHash = yield this._generateHash(password, user.accountData.passwordSalt);
            if (user.accountData.passwordHash === passwordHash) {
                return user;
            }
            return null;
        });
    },
    _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, salt);
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_repository_1.usersRepository.findUserById(id);
        });
    }
};
