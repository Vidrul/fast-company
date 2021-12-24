import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
    onChange,
    options,
    name,
    label,
    defaultValue = []
}) => {
    const optionsArray = options.map((option) => ({
        label: option.name,
        value: option._id
    }));

    const optionsDefaultArray = defaultValue.map((option) => ({
        label: option.name,
        value: option._id
    }));

    const handleChange = (value) => {
        onChange({ name: name, value: value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                className="basic-multi-select"
                classNamePrefix="select"
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                onChange={handleChange}
                name={name}
                defaultValue={optionsDefaultArray}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired
};

export default MultiSelectField;
