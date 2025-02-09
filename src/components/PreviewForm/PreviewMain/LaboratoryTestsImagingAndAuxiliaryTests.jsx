import PropTypes from "prop-types";
import {checkEnglishWords} from "../../../helpers/checkEnglishWords.js";

const LaboratoryTestsImagingAndAuxiliaryTests = ({data, classes, tab = 0}) => {
    const {name_category, children} = data;

    return (
        <div className={`${classes.preview_main_laboratory_tests_imaging_and_auxiliary_tests}`}>
            <p style={{paddingRight: tab * 20}}><strong>{name_category}</strong></p>
            <ul>
                {children.map((item, i) => {
                    return item.children ? (
                        <LaboratoryTestsImagingAndAuxiliaryTests data={item} classes={classes} tab={1} />
                    ) : (
                        <li key={i} style={{paddingRight: (tab + 1) * 20, direction: checkEnglishWords(item.name_category) ? "ltr" : "rtl"}}>
                            <span>{`${item.name_category}: ${item.value}`}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

LaboratoryTestsImagingAndAuxiliaryTests.propTypes = {
    data: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                name_category: PropTypes.string.isRequired,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
            })
        ).isRequired,
        name_category: PropTypes.string.isRequired,
    }).isRequired,
    tab: PropTypes.number,
    classes: PropTypes.object.isRequired,
};

export default LaboratoryTestsImagingAndAuxiliaryTests;