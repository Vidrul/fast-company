import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logIn, getAuthError } from "../../store/users";

const LoginForm = () => {
    const history = useHistory();
    let loginError = useSelector(getAuthError());
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = ({ name, value }) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/users";
        dispatch(
            logIn({
                payload: data,
                redirect: () => {
                    history.push(redirect);
                }
            })
        );
    };

    const isValid = Object.keys(errors).length === 0;

    const validateSchema = yup.object().shape({
        password: yup.string().required("Пароль обязателен для заполнения"),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
    });

    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => {
                setErrors({});
            })
            .catch((err) => {
                setErrors({ [err.path]: err.message });
            });

        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Login"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 m-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
