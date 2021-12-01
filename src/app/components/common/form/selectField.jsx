import React from "react";
import PropTypes from "prop-types";

const SelectFiedl = ({
    label,
    value,
    onChange,
    defaultOptions,
    options,
    error,
    name
}) => {
    const getInputClasses = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOptions}
                </option>
                {options &&
                    options.map((prof) => {
                        return (
                            <option key={prof._id} value={prof._id}>
                                {prof.name}
                            </option>
                        );
                    })}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectFiedl.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    defaultOptions: PropTypes.string.isRequired,
    professions: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default SelectFiedl;
