import PropTypes from "prop-types";

const Habits = ({habits, classes, tab = 0}) => {
    const {name_category, children} = habits;

    return (
        <div className={`${classes.preview_main_habits}`}>
            <p style={{paddingRight: tab * 20}}><strong>{name_category}</strong></p>
            <ul>
                {children.map((item, i) => {
                    return item.children ? (
                        <Habits habits={item} classes={classes} tab={i + 1} />
                    ) : (
                        <li key={i} style={{paddingRight: (tab + 1) * 20}}>
                            <span>{`${item.name_category}: ${item.value}`}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

Habits.propTypes = {
    habits: PropTypes.shape({
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

export default Habits;