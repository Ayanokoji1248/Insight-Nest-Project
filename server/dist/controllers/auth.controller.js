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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const zod_1 = require("zod");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUserSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(5, "Atleast 5 character"),
    username: zod_1.z.string().min(5, "Atleast 5 character"),
    email: zod_1.z.string().email("Not Valid Email"),
    password: zod_1.z.string().min(8, "Atleast 8 character")
});
const loginUserSchema = registerUserSchema.pick({
    email: true,
    password: true
});
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, username, email, password } = req.body;
        const Validated = registerUserSchema.safeParse(req.body);
        if (!Validated.success) {
            res.status(400).json({
                errors: Validated.error.flatten().fieldErrors
            });
            return;
        }
        const userExisted = yield user_model_1.default.findOne({ email });
        if (userExisted) {
            res.status(400).json({
                message: "Username taken"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_model_1.default.create({
            fullName,
            username,
            email,
            password: hashedPassword
        });
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        const token = jsonwebtoken_1.default.sign({
            id: user._id, username
        }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie("token", token, {
            httpOnly: true
        });
        res.status(201).json({
            message: "User created",
            user: userData,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validate = loginUserSchema.safeParse(req.body);
        if (!validate.success) {
            res.status(400).json({
                errors: validate.error.flatten().fieldErrors
            });
            return;
        }
        const user = yield user_model_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            res.status(400).json({
                message: "Credentials Invalid"
            });
            return;
        }
        const passCompare = yield bcrypt_1.default.compare(password, user.password);
        if (!passCompare) {
            res.status(400).json({
                message: "Invalid Credentials"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.cookie("token", token, {
            httpOnly: true
        });
        const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
        res.status(200).json({
            user: userData,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.loginUser = loginUser;
