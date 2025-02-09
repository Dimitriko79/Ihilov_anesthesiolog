import PropTypes from "prop-types";
import React, { useState } from "react";

const Fields = (props) => {
    const { classes, data, handleDataUser, path } = props;
    const { field, fieldType, readonly, options = [], value } = data;
    const [isFieldOpen, setIsFieldOpen] = useState(false);
    const [otherFieldValue, setOtherFieldValue] = useState('');

    const formatDateToISO = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}`;
    };

    function detectDateType(dateString) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            return dateString;
        } else if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
            return formatDateToISO(dateString);
        } else if (/^\d{2}:\d{2}$/.test(dateString) || /^\d{4}$/.test(dateString)) {
            return "time";
        } else {
            return "unknown";
        }
    }

    const valueParse = fieldType === "date" && detectDateType(value) !== "time" && value !== '' ? detectDateType(value) : value ? value : "";

    return (
        <React.Fragment>
            {options && options.length ? (
                <>
                    <select
                        className={value === 0 || value === "" ? classes.field : classes.field_valid}
                        onChange={(e) => {
                            if (e.target.value === "other") {
                                setIsFieldOpen(true);
                                setOtherFieldValue('');
                                handleDataUser(path, e);
                            } else {
                                setIsFieldOpen(false);
                                handleDataUser(path, e);
                            }
                        }}
                        value={value}
                        name={field}
                        aria-placeholder={field}
                    >
                        {!value && value === '' ? (
                            <option disabled key={`ללא_${options.length}`} name="ללא" label="ללא" />
                        ) : null}
                        {options.map((option, index) => (
                            <option key={`${option}_${index}`} name={option} value={option} label={option} />
                        ))}
                    </select>
                    {isFieldOpen && (
                        <input
                            className={classes.field}
                            type="text"
                            onChange={(e) => setOtherFieldValue(e.target.value)}
                            readOnly={readonly || false}
                            name={field}
                            value={otherFieldValue}
                        />
                    )}
                </>
            ) : (
                <input
                    className={value === 0 || value === "" ? classes.field : classes.field_valid}
                    type={fieldType === "date" && detectDateType(value) !== "time" ? "date" : "text"}
                    onChange={(e) => handleDataUser(path, e)}
                    readOnly={readonly || false}
                    name={field}
                    value={valueParse}
                    placeholder={field}
                />
            )}
        </React.Fragment>
    );
};

Fields.propTypes = {
    classes: PropTypes.shape({
        label: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        field_valid: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.shape({
        readonly: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([undefined])]),
        options: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        ),
        field: PropTypes.string.isRequired,
        fieldType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
    }).isRequired,
    handleDataUser: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired,
};

export default Fields;