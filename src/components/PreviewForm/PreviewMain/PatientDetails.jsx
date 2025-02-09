import PropTypes from "prop-types";

const PatientDetails = ({ patient, classes }) => {
    const { children } = patient;

    const chunkArray = (arr, size) => {
        return arr.reduce((acc, _, i) =>
            i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc, []
        );
    };

    const tableRows = chunkArray(children, 3);

    return (
        <div className={classes.preview_main_personal_information}>
            <table border={1} style={{ width: "734px" }}>
                <tbody>
                {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((col, colIndex) => (
                            <td key={colIndex}>
                                <strong>{col.name_category}:</strong> &nbsp; {col.value || "—"}
                            </td>
                        ))}
                        {row.length < 3 &&
                            Array.from({ length: 3 - row.length }).map((_, i) => (
                                <td key={`empty-${i}`} />
                            ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

PatientDetails.propTypes = {
    patient: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                name_category: PropTypes.string.isRequired,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
            })
        ).isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
};

export default PatientDetails;