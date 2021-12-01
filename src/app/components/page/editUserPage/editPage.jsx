import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import * as yup from "yup";
import SelectFiedl from "../../common/form/selectField";
import API from "../../../api";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";

const EditUserPage = () => {
    const params = useParams();
    const { userId } = params;
    const history = useHistory();

    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const getProfessionsById = (id) => {
        return professions.find((prof) => prof._id.toString() === id);
    };

    const getQualities = (elements) => {
        const arrQualities = [];
        for (const iterator of elements) {
            qualities.find((qualitie) =>
                iterator.value === qualitie._id
                    ? arrQualities.push(qualitie)
                    : null
            );
        }
        return arrQualities;
    };

    const handleChange = ({ name, value }) => {
        console.log(errors);
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;

        API.users.update(userId, {
            ...data,
            profession: getProfessionsById(data.profession),
            qualities: getQualities(data.qualities)
        });
        history.replace(`/users/${userId}`);
    };

    //-------------------- VALIDATION --------------------------------
    const validateSchema = yup.object().shape({
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно"),
        name: yup
            .string()
            .required("Имя обязательна для заполнения")
            .min(8, "Это поле должно иметь 8 и более символов")
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

    //----------------------USEEFFECTS----------------------------
    useEffect(() => {
        setIsLoading(true);
        API.users.getById(userId).then(({ profession, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id
            }))
        );

        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, [userId]);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

    //------------------------RENDER------------------------

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
                                value={data.name}
                                onChange={(e) => handleChange(e)}
                                error={errors.name}
                            />

                            <TextField
                                label="Email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => handleChange(e)}
                                error={errors.email}
                            />
                            <SelectFiedl
                                name={"profession"}
                                label={"Choose your profession"}
                                value={data.profession}
                                onChange={(e) => handleChange(e)}
                                defaultOptions={"Choose..."}
                                options={professions}
                                error={errors.profession}
                            />

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
