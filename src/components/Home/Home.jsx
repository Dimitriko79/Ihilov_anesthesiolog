import classes from './home.module.scss';
import deleteIcon from "../../assets/delete.svg";
import successIcon from "../../assets/success.svg";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader.jsx";

const Home = props => {
    const {
        fileRef,
        files,
        isUploading,
        isLoading,
        errorMessage,
        handleFileChange,
        handleFileRemove,
        handleSendFiles
    } = props;

    return (
        <div className={classes.home}>
            <div className={classes.home_container}>
                <h3 className={classes.home_title}>מחולל הגליון לרופא המרדים</h3>
                <div className={classes.home_actions}>
                    <label className={classes.home_actions_upload_button}>
                        העלאת מסמכי מטופל
                        <input ref={fileRef} multiple type="file" accept="image/*,application/pdf"
                               onChange={handleFileChange}/>
                    </label>
                    <button
                        onClick={handleSendFiles}
                        className={classes.home_upload_send_button}
                        disabled={files.length === 0 || errorMessage !== ''}
                        type="button"
                    >
                        יצירת גליון לרופא המרדים
                    </button>
                </div>
                {errorMessage && <span className={classes.home_upload_button_error}>{errorMessage}</span>}
                {files.length > 0 && (
                    <ul className={classes.home_upload_button_list_files}>
                        {files.map((item, index) => (
                            <li key={index}>
                                <p>{item.name}</p>
                                <span>{` ${(item.size / 1024).toFixed(2)}Kb`}</span>
                                <button type="button" onClick={() => handleFileRemove(index)}>
                                    <img src={isUploading ? successIcon : deleteIcon} alt="action"/>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {isLoading && <Loader/>}
        </div>
    )
};

Home.propTypes = {
    fileRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    files: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            size: PropTypes.number.isRequired,
        })
    ).isRequired,
    isUploading: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    handleFileChange: PropTypes.func.isRequired,
    handleFileRemove: PropTypes.func.isRequired,
    handleSendFiles: PropTypes.func.isRequired,
};

export default Home;