import axios from 'axios';

const BASE_URL = 'https://yjbsunrt6g.execute-api.us-east-1.amazonaws.com/test';

const uploadFile = async (files, fileNames, userId = 'test-user-123') => {
    const results = [];

    if (!userId || !files?.length || !fileNames?.length) {
        throw new Error('Missing userId or files');
    }

    try {

        // שלב 2 - העלאה לכל קובץ
        for (const file of files) {
            let i = 0;
            try {
                const { data: { uploadUrl, key, contentType } } = await axios.get(
                    `${BASE_URL}/get_s3_url?key=${encodeURIComponent(fileNames[i])}`
                );

                await axios.put(uploadUrl, file,
                    {
                        headers: {
                            'Content-Type': contentType
                        }
                    }
                );

                results.push({
                    fileName: file.name,
                    status: 'success',
                });
            } catch (err) {
                console.error(err);
                console.error('xxxxxx:', err.response?.status, err.response?.data);
                results.push({
                    fileName: file.name,
                    status: 'error',
                    error: err.message,
                });
            }
            i++;
        }
        const processBody = {
            httpMethod: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                file_names: fileNames,
            }),
        };

        await axios.post(`${BASE_URL}/l-process`, processBody);
    } catch (err) {
        console.error('שגיאה בשלב l-process:', err);
        throw err;
    }

    return results;
};

export default {
    uploadFile,
};
