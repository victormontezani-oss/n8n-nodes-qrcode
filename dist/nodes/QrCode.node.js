"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QrCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
class QrCode {
    constructor() {
        this.description = {
            displayName: 'QR Code',
            name: 'qrCode',
            group: ['transform'],
            version: 1,
            description: 'Generate QR Code',
            defaults: {
                name: 'QR Code',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Conteúdo',
                    name: 'content',
                    type: 'string',
                    default: '',
                    required: true,
                },
                {
                    displayName: 'Nome do Arquivo',
                    name: 'fileName',
                    type: 'string',
                    default: 'qrcode.png',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnItems = [];
        for (let i = 0; i < items.length; i++) {
            const content = this.getNodeParameter('content', i);
            const fileName = this.getNodeParameter('fileName', i);
            const buffer = await qrcode_1.default.toBuffer(content, {
                errorCorrectionLevel: 'H',
                margin: 4,
                scale: 12,
            });
            const binaryData = await this.helpers.prepareBinaryData(buffer, fileName, 'image/png');
            returnItems.push({
                json: {},
                binary: {
                    qrcode: binaryData,
                },
            });
        }
        return [returnItems];
    }
}
exports.QrCode = QrCode;
//# sourceMappingURL=QrCode.node.js.map