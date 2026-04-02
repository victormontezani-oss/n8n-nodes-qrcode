import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import QRCode from 'qrcode';

export class QrCode implements INodeType {
	description: INodeTypeDescription = {
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnItems: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const content = this.getNodeParameter('content', i) as string;
			const fileName = this.getNodeParameter('fileName', i) as string;

			// 🔥 QR robusto (industrial)
			const buffer = await QRCode.toBuffer(content, {
				errorCorrectionLevel: 'H',
				margin: 4,
				scale: 12,
			});

			const binaryData = await this.helpers.prepareBinaryData(
				buffer,
				fileName,
				'image/png'
			);

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