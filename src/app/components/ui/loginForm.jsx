import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TextField from "../common/form/textField";
// import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
    const history = useHistory();
    const { singIn } = useAuth();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const handleChange = ({ name, value }) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setEnterError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await singIn(data);
            history.push("/");
        } catch (error) {
            console.log(error.message);
            setEnterError(error.message);
        }
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
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                type="submit"
                disabled={!isValid || enterError}
                className="btn btn-primary w-100 m-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
