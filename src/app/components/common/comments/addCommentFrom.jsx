import React, { useEffect, useState } from "react";
import API from "../../../api";
import SelectFiedl from "../form/selectField";
import * as yup from "yup";
import TextAreaField from "../form/textAreaField";
const initialData = { userId: "", content: "" };

const AddCommentFrom = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = ({ name, value }) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateSchema = yup.object().shape({
        content: yup.string().required("Оставьте ваш комментарий"),
        userId: yup.string().required("Выберите пользователся")
    });

    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((errors) => setErrors({ [errors.path]: errors.message }));

        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    useEffect(() => {
        API.users.fetchAll().then((users) => setUsers(users));
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <h2>New comment</h2>
            <SelectFiedl
                value={data.userId}
                name={"userId"}
                label=""
                onChange={handleChange}
                options={users}
                defaultOptions={"Выберите пользователя..."}
                error={errors.userId}
            />
            <TextAreaField
                label={"Сообщение"}
                name={"content"}
                value={data.content}
                onChange={handleChange}
                error={errors.content}
            />

            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" disabled={!isValid}>
                    Опубликовать
                </button>
            </div>
        </form>
    );
};

export default AddCommentFrom;
