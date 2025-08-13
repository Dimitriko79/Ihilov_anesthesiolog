import { useCallback, useRef, useState } from 'react';
import { updateData, updateView } from "../../reducers/anesthesiaSheetReducer.js";
import { useDispatch } from "react-redux";
import S3Service from "../../services/S3Service.js";
import uploadService from "../../services/uploadService.js";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// const FOLDER = "folder-in-s3";
const COUNT_FILES = 7;

export const useApp = () => {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();

    const handleFileChange = () => {
        setIsUploading(false);
        const fileInput = fileRef.current;
        if (fileInput && fileInput.files) {
            const newFiles = Array.from(fileInput.files);

            setFiles((prevFiles) => {
                const existingFiles = prevFiles.map((file) => `${file.name}-${file.size}`);
                const uniqueFiles = newFiles.filter(
                    (file) => !existingFiles.includes(`${file.name}-${file.size}`)
                );

                const totalFilesCount = prevFiles.length + uniqueFiles.length;

                if (totalFilesCount > COUNT_FILES) {
                    setErrorMessage(`You can upload a maximum of ${COUNT_FILES} files.`);
                } else {
                    setErrorMessage('');
                }
                return [...prevFiles, ...uniqueFiles];
            });

        }
    };

    const handleFileRemove = index => {
        const tempFiles = files.filter((_, i) => i !== index);
        const totalFilesCount = tempFiles.length;
        if (totalFilesCount > COUNT_FILES) {
            setErrorMessage(`You can upload a maximum of ${COUNT_FILES} files.`);
        } else {
            setErrorMessage('');
        }
        setFiles(tempFiles);
    };

    const handleDataFromFiles = useCallback(async (names) => {
        try {
            return await axios.post("https://yjbsunrt6g.execute-api.us-east-1.amazonaws.com/test",
                { file_names: names },
                { headers: { "Content-Type": "application/json" } });
        } catch (error) {
            console.error("Error get data:", error);
        }
    }, []);

    function wrapJsonIfNeeded(jsonString) {
        const trimmedJson = jsonString.trim();

        if (trimmedJson.startsWith('{') && trimmedJson.endsWith('}')) {
            return `[${trimmedJson}]`;
        }
        return jsonString;
    }

    const handleSendFiles = useCallback(async () => {
        setIsLoading(true);
        try {
            if (files.length === 0) {
                alert("Please select files to upload!");
                return;
            }
            const fileNames = files.map((file) => {
                const guid = uuidv4();
                return `${guid}_${file.name}`;
            });
            // const results = await S3Service.uploadFile(files, FOLDER);
            const response = await uploadService.uploadFile(files, fileNames);
            if (response && response.length > 0) {
                setIsUploading(true);
                console.log("Files uploaded successfully!", response);
              //  const response = await handleDataFromFiles(fileNames);

                console.log("Getting response", response)
                if (
                    response &&
                    response.data &&
                    response.data.response &&
                    response.data.response.categories &&
                    response.data.response.categories.length &&
                    response.data.status === "success") {
                    const categories = !Array.isArray(response.data.response.categories) ? Object.values(response.data.response.categories) : response.data.response.categories;
                    await dispatch(updateData(categories));
                    await dispatch(updateView("details"));
                }
                // await dispatch(updateData(categories));
                // await dispatch(updateView("details"));
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, files]);

    console.log('Uploaded files:', files);

    return {
        fileRef,
        files,
        isLoading,
        errorMessage,
        isUploading,
        handleFileChange,
        handleFileRemove,
        handleSendFiles
    };
};
