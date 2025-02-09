import classes from "../previewForm.module.scss";
import Logo from "../../../assets/ftrlogo.svg";
import {formatDate} from "../../../utils.js";
import PropTypes from "prop-types";


const PreviewHeader = ({ nowDate }) => {
    const formattedDate = `${formatDate(nowDate)} 
        :תאריך ושעה הדפסה`;

    return (
        <header className={classes.preview_header}>
            <span className={classes.preview_header_date}>{formattedDate}</span>
            <p className={classes.preview_header_name}>חסוי רפואי</p>
            <div className={classes.preview_header_container}>
                <div className={classes.preview_header__abbr}>
                    <span>THE STATE OF ISRAEL</span>
                    <span>MINISTRY OF HEALTH</span>
                    <span>TEL AVIV SOURASKY MEDICAL CENTER</span>
                    <span>Affiliated with Tel-Aviv University Faculty of Medicine</span>
                    <span>6 Weizmann St. Tel-Aviv 6423906</span>
                    <span>Tel: 03-6974444</span>
                </div>
                <div className={classes.preview_header__logo}>
                    <img src={Logo} alt="logo" />
                </div>
                <div className={classes.preview_header__abbr}>
                    <span>מדינת ישראל</span>
                    <span>משרד הבריאות</span>
                    <span>המרקז הרפואי תל-אביב ע״ש סוראסקי</span>
                    <span>מסונף לפקולטה לרפואה באוניברסיטה תל-אביב</span>
                    <span>רח׳ ויזמן 6, תל-אביב 6423906</span>
                    <span>טל: 03-6974444</span>
                </div>
            </div>
        </header>
    );
};

PreviewHeader.propTypes = {
    nowDate: PropTypes.instanceOf(Date).isRequired,
};

export default PreviewHeader;
