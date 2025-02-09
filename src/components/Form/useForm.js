import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateData, updateView} from "../../reducers/anesthesiaSheetReducer.js";

export const useForm = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.data);

    const [dataUser, setDataUser] = useState(null);

    useEffect(() => {
        setDataUser(data);
    }, [data]);

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
//TODO
    function addNewRowTable(obj, path) {
        const newObj = JSON.parse(JSON.stringify(obj));
        let temp = newObj;

        for (let i = 0; i < path.length - 1; i++) {
            temp = temp[path[i]];
        }

        if (temp.rows && temp.rows.length > 0) {
            temp.rows.push(JSON.parse(JSON.stringify(temp.rows[0])));
        }
        return newObj;
    }

    function handleDataUser(path, e) {
        e.preventDefault();
        setDataUser(prevData => updateValueByPath(prevData, path, e.target.value));
    }

    function handleNewRow(path, e) {
        e.preventDefault();
        setDataUser(prevData => addNewRowTable(prevData, path));
    }

    const onSubmit = useCallback( async event => {
        event.preventDefault();
        try {
            await dispatch(updateData(dataUser));
            await dispatch(updateView('preview'));
        } catch (err) {
            console.error('Error uploading files:', err);
        }
    }, [dataUser, dispatch]);

    return {
        dataUser,
        handleDataUser,
        handleNewRow,
        onSubmit
    };
};