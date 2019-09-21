import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  placeholder,
  id,
  label,
  name,
  divClass,
  inputClass,
  labelHtmlFor,
  defaultValue,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className={divClass}>
      <label htmlFor={labelHtmlFor}>{label}</label>
      <input
        type={type}
        className={inputClass}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />{" "}
    </div>
  );
};

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  divClass: PropTypes.string.isRequired,
  inputClass: PropTypes.string.isRequired,
  labelHtmlFor: PropTypes.string,
  disabled: PropTypes.string,
  onChange: PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: "text",
  inputClass: "form-control",
  autoComplete: "off"
};

export default TextFieldGroup;
