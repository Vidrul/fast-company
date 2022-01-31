import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import * as yup from "yup";
import SelectFiedl from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessionsList,
    getProfessionsLoadStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUserData } from "../../../store/users";

const EditUserPage = () => {
    const dispatch = useDispatch();

    const professions = useSelector(getProfessionsList());
    const professionsLoading = useSelector(getProfessionsLoadStatus());

    const currentUser = useSelector(getCurrentUserData());

    const [isLoading, setLoading] = useState(true);

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const [errors, setErrors] = useState({});

    const [data, setData] = useState();

    const handleChange = ({ name, value }) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const getQualitiesListByIds = (qualitiesIds) => {
        const arrQualities = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) arrQualities.push(quality);
            }
        }
        return arrQualities;
    };

    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));

        return result;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(updateUserData(newData));
    };

    const validateSchema = yup.object().shape({
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно"),
        name: yup
            .string()
            .required("Имя обязательна для заполнения")
            .min(3, "Это поле должно иметь 8 и более символов")
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
    };

    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [currentUser, data, professionsLoading, qualitiesLoading]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                type="text"
                                id="name"
                                name="name"
                                value={data.name || ""}
                                onChange={(e) => handleChange(e)}
                                error={errors.name}
                            />

                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                value={data.email || ""}
                                onChange={(e) => handleChange(e)}
                                error={errors.email}
                            />
                            {professions && (
                                <SelectFiedl
                                    name={"profession"}
                                    label={"Choose your profession"}
                                    value={data.profession || ""}
                                    onChange={(e) => handleChange(e)}
                                    defaultOptions={"Choose..."}
                                    options={professions}
                                    error={errors.profession}
                                />
                            )}

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={(e) => handleChange(e)}
                                label="Choose your sex"
                            />

                            {qualities && (
                                <MultiSelectField
                                    onChange={(e) => handleChange(e)}
                                    options={qualities}
                                    name="qualities"
                                    label="Choose your qualities"
                                    defaultValue={data.qualities}
                                />
                            )}

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 m-auto"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
