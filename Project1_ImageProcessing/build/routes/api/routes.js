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
const express_1 = __importDefault(require("express"));
const imageUtil_1 = __importDefault(require("../../utils/imageUtil"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('api route');
});
routes.get('/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileName = req.query['fileName'];
        const width = req.query['width'];
        const height = req.query['height'];
        if (!fileName || !height || !width) {
            res.status(400).send('Missing request params');
            return;
        }
        const imageObject = {
            imageName: fileName,
            width: parseInt(width),
            height: parseInt(height),
        };
        const isExistImage = yield imageUtil_1.default.isExistImage(fileName, true);
        if (!isExistImage) {
            res.status(400).send('This image is not exist in server');
            return;
        }
        const resizedImageBuffer = yield imageUtil_1.default.resizeImage(imageObject);
        res.status(200).contentType('jpg').send(resizedImageBuffer);
    }
    catch (error) {
        res.status(400).send('Something went wrong');
        console.log(error);
    }
}));
exports.default = routes;
