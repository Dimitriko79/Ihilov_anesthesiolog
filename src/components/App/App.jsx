import classes from './App.module.scss';
import Form from "../Form/Form.jsx";
import PreviewForm from "../PreviewForm/PreviewForm.jsx";
import Home from "../Home/Home.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updateView} from "../../reducers/anesthesiaSheetReducer.js";
import {useApp} from "./useApp.js";

function App() {
    const { view } = useSelector(state => state.data);
    const {
        fileRef,
        files,
        isUploading,
        errorMessage,
        handleFileChange,
        handleFileRemove,
        handleSendFiles,
        isLoading
    } = useApp();
    const dispatch = useDispatch();
    let content;

    switch (view) {
        case "home":
            content = (
                <Home
                    fileRef={fileRef}
                    files={files}
                    isUploading={isUploading}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    handleFileChange={handleFileChange}
                    handleFileRemove={handleFileRemove}
                    handleSendFiles={handleSendFiles}
                />
            )
            break;
        case "details":
            content = <Form/>;
            break;
        case "preview":
            content = <PreviewForm/>;
            break;
        default:
            return null;
    }

    async function handleBackToPage(){
        switch (view) {
            case "details":
                await dispatch(updateView('home'));
                break;
            case "preview":
                await dispatch(updateView('details'));
                break;
            default:
                return null;
        }
    }
    return (
        <div className={classes.main}>
            {content}
            {view !== "home" && (
                <button className={classes.main_back_button} onClick={handleBackToPage}/>
            )}
        </div>
    )
}

export default App;


