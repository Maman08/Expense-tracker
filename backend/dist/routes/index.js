"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../controllers/auth/signup"));
const signin_1 = __importDefault(require("../controllers/auth/signin"));
const logout_1 = require("../controllers/auth/logout");
const router = express_1.default.Router();
router.post('/signup', signup_1.default);
router.post('/signin', signin_1.default);
router.post('/logout', logout_1.logout);
exports.default = router;
