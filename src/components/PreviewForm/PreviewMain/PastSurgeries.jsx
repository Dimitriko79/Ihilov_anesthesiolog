import PropTypes from "prop-types";

const PastSurgeries = ({data, classes}) => {
    const { rows, name_category } = data;

    if (!rows.length) return null;

    return (
        <div className={`${classes.preview_main_approved_for_surgery}`}>
            <p><strong>{name_category}</strong></p>
            <table>
                <thead>
                <tr>
                    {rows[0].values.map((cell, cellIndex) => (
                        <th key={cellIndex}><span>{cell.name_category}</span></th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {row.values.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell.type_field === "boolean" ? cell.value ? "true" : "false" : cell.value}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

PastSurgeries.propTypes = {
    data: PropTypes.shape({
        name_category: PropTypes.string.isRequired,
        rows: PropTypes.arrayOf(
            PropTypes.shape({
                values: PropTypes.arrayOf(
                    PropTypes.shape({
                        name_category: PropTypes.string.isRequired,
                        type_field: PropTypes.string.isRequired,
                        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
                    })
                ).isRequired,
            })
        ).isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
}

export default PastSurgeries;