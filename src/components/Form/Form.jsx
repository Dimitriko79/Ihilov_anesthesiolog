import classes from './form.module.scss';
import { useForm } from "./useForm.js";
import Fields from "./Fields.jsx";
import Table from "./Table.jsx";

const Form = () => {
    const { dataUser, handleDataUser, handleNewRow, handleRemoveRow, onSubmit } = useForm();
    console.log(7777, dataUser)
    const renderFields = (items, step, parentPath = []) => {
        if (!items) return null;
        if (!Array.isArray(items)) items = Object.values(items);
        return items.map((item, index) => {
            const { name_category, children, rows, type_field } = item;
            const currentPath = [...parentPath, index];
            let content;

            if (type_field === "table" && Array.isArray(rows)) {
                content = (
                    <Table
                        items={rows}
                        classes={classes}
                        handleDataUser={handleDataUser}
                        handleNewRow={handleNewRow}
                        handleRemoveRow={handleRemoveRow}
                        path={currentPath}
                    />
                );
            } else if (Array.isArray(children) && children.length) {
                content = renderFields(children, 2, currentPath);
            } else {
                content = (
                    <Fields
                        classes={classes}
                        data={{
                            field: name_category,
                            fieldType: type_field || 'text',
                            readonly: item.readonly || false,
                            options: item.options || [],
                            value: item.value || "",
                        }}
                        handleDataUser={handleDataUser}
                        path={currentPath}
                    />
                );
            }

            return (
                <div key={`${name_category}-${index}`} className={classes.form_group}>
                    <section className={classes.row}>
                        <div className={classes.row_title}>
                            <h3>{name_category}</h3>
                        </div>
                        <div className={classes.column}>
                            {content}
                        </div>
                    </section>
                    {step === 1 && <div className={classes.divider} />}
                </div>
            );
        });
    };

    return (
        <form className={classes.form} onSubmit={onSubmit} noValidate>
            <h1>גליון לרופא המרדים</h1>
            {dataUser && (
                <div className={classes.container}>
                    {renderFields(dataUser, 1)}
                </div>
            )}
            <div className={classes.form_button}>
                <button className={classes.form_button_submit} type="submit">
                    צפיה מקדימה בגליון
                </button>
            </div>
        </form>
    );
};

export default Form;