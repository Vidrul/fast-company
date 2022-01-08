import React, { useState, useEffect } from "react";
import { validator } from "./../../utils/validator";
import TextField from "./../common/form/textField";
import SelectFiedl from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "./../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getQualities } from "../../store/qualities";
import { getProfessionsList } from "../../store/professions";
import { singUp } from "../../store/users";


const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        license: false
    });

    const qualities = useSelector(getQualities());
    const professions = useSelector(getProfessionsList());
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
        const newData = {
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        };
        dispatch(singUp(newData));
    };

    const isValid = Object.keys(errors).length === 0;

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },

            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязательна для заполнения"
            },

            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состаять минимум из 8 символов",
                value: 8
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состаять минимум из 3-х символов",
                value: 2
            }
        },
        profession: {
            isRequired: {
                message: "Профессия обязательна для заполнения"
            }
        },

        license: {
            isRequired: {
                message: "Подтвердите лицензионное соглашение"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

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
                label="Имя"
                id="name"
                name="name"
                value={data.named}
                onChange={handleChange}
                error={errors.name}
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
            <SelectFiedl
                label={"Choose your profession"}
                value={data.profession}
                onChange={handleChange}
                defaultOptions={"Choose..."}
                options={professions}
                error={errors.profession}
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Choose your sex"
            />
            {qualities && (
                <MultiSelectField
                    onChange={handleChange}
                    options={qualities}
                    name="qualities"
                    label="Choose your qualities"
                />
            )}

            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить лицензионное соглашение
            </CheckBoxField>

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

export default RegisterForm;
