import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';

const AWS_REGION = import.meta.env.VITE_AWS_REGION;
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

class S3Service {
    constructor() {
        this.client = new S3Client({
            region: AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });
        this.backetName = "ichilov-files";
    }

    async uploadFile(files, folder) {
        try {
            const readFileAsArrayBuffer = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(new Error("Error reading file"));
                    reader.readAsArrayBuffer(file);
                });
            };

            const uploadPromises = files.map(async (file) => {
                const fileContent = await readFileAsArrayBuffer(file);

                const objectKey = `${folder}/${file.name}`;

                const params = {
                    Bucket: this.backetName,
                    Key: objectKey,
                    Body: fileContent,
                    ContentType: file.type,
                };
                return await this.client.send(new PutObjectCommand(params));
            });
            return await Promise.all(uploadPromises);
        } catch (error) {
            console.error("Error uploading files:", error);
            throw error;
        }
    }
}

export default new S3Service();