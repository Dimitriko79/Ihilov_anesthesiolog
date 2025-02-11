import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateData, updateView} from "../../reducers/anesthesiaSheetReducer.js";

export const useForm = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.data);

    // const [dataUser, setDataUser] = useState(null);

    // useEffect(() => {
    //     setDataUser(data);
    // }, [data]);

    function updateValueByPath(obj, path, newValue) {
        const newObj = JSON.parse(JSON.stringify(obj));
        let temp = newObj;

        for (let i = 0; i < path.length - 1; i++) {
            temp = temp[path[i]];
            if (temp.children) temp = temp.children;
            else if (temp.rows) temp = temp.rows;
            else if (temp.values) temp = temp.values;
        }

        temp[path[path.length - 1]].value = newValue;
        return newObj;
    }

    function addNewRowTable(obj, path) {
        const newObj = JSON.parse(JSON.stringify(obj));
        let temp = newObj;

        for (let i = 0; i < path.length - 1; i++) {
            temp = temp[path[i]];
        }

        if (temp.rows && temp.rows.length > 0) {
            const newRow = JSON.parse(JSON.stringify(temp.rows[0]));

            if (newRow.values && Array.isArray(newRow.values)) {
                newRow.values.forEach(valueObj => {
                    if (valueObj.hasOwnProperty('value')) {
                        valueObj.value = "";
                    }
                });
            }

            temp.rows.push(newRow);
        }
        return newObj;
    }

    function removeRowTable(obj, path) {
        const newObj = JSON.parse(JSON.stringify(obj));
        let temp = newObj;

        for (let i = 0; i < path.length - 1; i++) {
            temp = temp[path[i]];
        }

        if (temp.rows && temp.rows.length > 1) {
            const indexToRemove = path[path.length - 1];

            if (indexToRemove >= 0 && indexToRemove < temp.rows.length) {
                temp.rows.splice(indexToRemove, 1);
            }
        }

        return newObj;
    }

    async function handleDataUser(path, e) {
        e.preventDefault();
        const newData = await updateValueByPath(data, path, e.target.value);
        await dispatch(updateData(newData));
    }

    async function handleNewRow(path, e) {
        e.preventDefault();
        const newData = await addNewRowTable(data, path);
        await dispatch(updateData(newData));
    }

    async function handleRemoveRow(path, e) {
        e.preventDefault();
        const newData = await removeRowTable(data, path);
        await dispatch(updateData(newData));
    }

    const onSubmit = useCallback( async event => {
        event.preventDefault();
        try {
            await dispatch(updateView('preview'));
        } catch (err) {
            console.error('Error uploading files:', err);
        }
    }, [dispatch]);

    return {
        dataUser: data,
        handleDataUser,
        handleNewRow,
        handleRemoveRow,
        onSubmit
    };
};