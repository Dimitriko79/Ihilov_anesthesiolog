import classes from "../previewForm.module.scss";
import PropTypes from "prop-types";

const PreviewFooter = ({onPrint}) => {
    return (
        <footer className={classes.preview_footer}>
            <button className={classes.preview_button} onClick={onPrint}>
                הדפסה
            </button>
        </footer>
    )
}

PreviewFooter.propTypes = {
    onPrint: PropTypes.func.isRequired
}

export default PreviewFooter;