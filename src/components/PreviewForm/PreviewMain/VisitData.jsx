import PropTypes from "prop-types";

const VisitData = ({visit, classes}) => {
    const {children, name_category} = visit;

    return (
        <div className={classes.preview_main_visit_data}>
            <p><strong>{name_category}</strong></p>
            <div className={classes.content}>
                {children.map((cell, cellIndex) => (
                    <span key={cellIndex}>
                    &nbsp;
                        {cell.name_category}
                        :
                        &nbsp;
                        <strong>{cell.value}</strong>
                </span>
                ))}
            </div>
        </div>
    )
}

VisitData.propTypes = {
    visit: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                name_category: PropTypes.string.isRequired,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
            })
        ).isRequired,
        name_category: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired,
};

export default VisitData;