import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from "react";

const Table = ({ items, classes, handleDataUser, handleNewRow, handleRemoveRow, path }) => {
    const tableRef = useRef(null);
    const [columnWidth, setColumnWidth] = useState(0);

    useEffect(() => {
        if (tableRef.current) {
            const tableWidth = tableRef.current.offsetWidth;
            const columns = items && items.length && items[0]?.values?.length ? items[0].values.length :  0;
            if (columns > 0) {
                setColumnWidth(tableWidth / columns);
            }
        }
    }, [items]);

    const tableItems = items.map((item, index) => {
        const currentPath = [...path, index];
        const { values } = item;

        return (
            <>
                <tr key={index}>
                    {
                        values.map((item, i) => {

                            const {value, name_category, readonly, type_field} = item;
                            return (
                                <td key={i} style={{width: columnWidth ? `${columnWidth.toFixed(0)}px` : "auto"}}>
                                    <input
                                        className={value === 0 || value === "" ? classes.field : classes.field_valid}
                                        type={type_field}
                                        onChange={(e) => handleDataUser([...currentPath, i], e)}
                                        readOnly={readonly || false}
                                        name={name_category}
                                        value={type_field === 'boolean' ? value ? "true" : "false" : value ? value : ""}
                                    />
                                </td>
                            )

                        })
                    }
                    <td>
                        <button className={classes.removeRow} type="button" title="למחוק שורה"
                                onClick={e => handleRemoveRow(currentPath, e)}><span>-</span></button>
                    </td>
                </tr>
                {index === items.length - 1 && (
                    <button className={classes.addRow} type="button" title="להוסיף שורה"
                            onClick={e => handleNewRow(currentPath, e)}><span>+</span></button>
                )}
            </>
        );
    });

    return (
        <div className={classes.table_container}>
            <table ref={tableRef} className={classes.table}>
                <thead>
                <tr>
                    {items && items.length && items[0].values.map((item, i) => (
                        <th key={i} style={{width: columnWidth ? `${columnWidth.toFixed(0)}px` : "auto"}}>
                            {item.name_category}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tableItems}
                </tbody>
            </table>
        </div>
);
};

Table.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            values: PropTypes.arrayOf(
                PropTypes.shape({
                    name_category: PropTypes.string.isRequired,
                    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
                    readonly: PropTypes.bool,
                    type_field: PropTypes.string,
                })
            ).isRequired,
        })
    ).isRequired,
    classes: PropTypes.shape({
        table: PropTypes.string.isRequired,
        table_container: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        field_valid: PropTypes.string.isRequired,
    }).isRequired,
    handleDataUser: PropTypes.func.isRequired,
    handleNewRow: PropTypes.func.isRequired,
    handleRemoveRow: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired,
};

export default Table;