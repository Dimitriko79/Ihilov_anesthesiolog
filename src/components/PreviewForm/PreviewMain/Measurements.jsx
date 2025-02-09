import PropTypes from "prop-types";

const Measurements = ({ measurements, classes }) => {
    const { name_category, rows } = measurements;

    if (!rows.length) return null;
    return (
        <div className={classes.preview_main_vital_signs}>
            <p><strong>{name_category}</strong></p>
            <table className={classes.measurementsTable}>
                <thead>
                <tr>
                    {rows[0].values.map((cell, cellIndex) => (
                        <th key={cellIndex}><span>{cell.name_category}</span></th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.values.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                                <span>{cell.value !== null && cell.value !== "" ? cell.value : "-"}</span>
                            </td>
                        ))}
                    </tr>

                ))}
                </tbody>
            </table>
        </div>
    );
};

Measurements.propTypes = {
    measurements: PropTypes.shape({
        name_category: PropTypes.string.isRequired,
        type_field: PropTypes.string,
        rows: PropTypes.arrayOf(
            PropTypes.shape({
                values: PropTypes.arrayOf(
                    PropTypes.shape({
                        name_category: PropTypes.string.isRequired,
                        readonly: PropTypes.bool,
                        type_field: PropTypes.string,
                        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
                    })
                ).isRequired
            })
        ).isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
};

export default Measurements;