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
exports.updateUserProfilePic = exports.getUserProfile = exports.getMeProfile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const getMeProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid Id"
            });
            return;
        }
        const user = yield user_model_1.default.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        res.status(200).json({
            message: "Current User Profile",
            user
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.getMeProfile = getMeProfile;
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid Id" });
            return;
        }
        const user = yield user_model_1.default
            .findById(id)
            .select("-password")
            .populate({
            path: "Blog",
            populate: { path: "user", select: "_id username avatar" }
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({
            message: "User Found",
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfilePic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { avatar } = req.body;
        const userId = req.user;
        const user = yield user_model_1.default.findByIdAndUpdate(userId, { avatar }, { new: true });
        res.status(200).json({
            user,
            message: "Profile image uploaded"
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
        return;
    }
});
exports.updateUserProfilePic = updateUserProfilePic;
