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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const originalImagePath = `${path_1.default.resolve(__dirname, '../../assets/original/')}` + '/';
const thumbImagePath = `${path_1.default.resolve(__dirname, '../../assets/thumb/')}` + '/';
function isFileExist(fileName, isOriginal) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (isOriginal) {
                yield fs_1.promises.access(originalImagePath + fileName);
            }
            else {
                yield fs_1.promises.access(thumbImagePath + fileName);
            }
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function getBufferImage(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const buffer = yield fs_1.promises.readFile(originalImagePath + fileName);
            return buffer;
        }
        catch (error) {
            return String(error);
        }
    });
}
function saveImageToServer(imageObject, bufferFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = `${imageObject.imageName.replace('.jpg', '')}${imageObject.width}x${imageObject.height}.jpg`;
        try {
            yield fs_1.promises.writeFile(`${thumbImagePath}${fileName}`, bufferFile);
            return fileName;
        }
        catch (error) {
            return String(error);
        }
    });
}
exports.default = {
    getBufferImage,
    isFileExist,
    saveImageToServer,
};
