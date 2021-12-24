import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ onChange, children, name, value, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    const getInputClasses = () => {
        return "form-check-input " + (error ? "is-invalid" : "is-valid");
    };

    return (
        <div className="form-check mb-4">
            <input
                checked={value}
                className={getInputClasses()}
                type="checkbox"
                id={name}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckBoxField;
