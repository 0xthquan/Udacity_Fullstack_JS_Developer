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
const imageUtil_1 = __importDefault(require("../../utils/imageUtil"));
describe('Process Image API Test', () => {
    it('Test resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageObject = {
            imageName: 'binance.jpg',
            width: 200,
            height: 130,
        };
        const imageResizedBuffer = yield imageUtil_1.default.resizeImage(imageObject);
        expect(imageResizedBuffer).not.toBeNull;
    }));
});
