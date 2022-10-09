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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const imageUtil_1 = __importDefault(require("../../../utils/imageUtil"));
const request = (0, supertest_1.default)(app_1.default);
describe('Process Image API Test', () => {
    it('Test null param', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing request params');
    }));
    it('Test image is not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image?fileName=testFail.jpg&height=100&width=100');
        expect(response.status).toBe(400);
        expect(response.text).toBe('This image is not exist in server');
    }));
    it('Test endpoint image response', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageObject = {
            imageName: 'binance.jpg',
            width: 200,
            height: 130,
        };
        const fileResized = `${imageObject.imageName.replace('.jpg', '')}${imageObject.width}x${imageObject.height}.jpg`;
        const response = yield request.get(`/api/image?fileName=${imageObject.imageName}&width=${imageObject.width}&height=${imageObject.height}`);
        const isFileExist = yield imageUtil_1.default.isExistImage(fileResized, false);
        expect(isFileExist).toBe(true);
        expect(response.status).toBe(200);
    }));
});
