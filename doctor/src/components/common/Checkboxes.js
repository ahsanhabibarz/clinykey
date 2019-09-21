import React from "react";
import { FormCheckbox } from "shards-react";
import PropTypes from "prop-types";

const Checkboxes = ({ name, label, onClick, checked }) => {
  let element;

  if (checked) {
    element = (
      <div className="form-group col-md-3">
        <fieldset>
          <FormCheckbox name={name} onChange={onClick} checked>
            {label}
          </FormCheckbox>
        </fieldset>
      </div>
    );
  } else {
    element = (
      <div className="form-group col-md-3 ">
        <fieldset>
          <FormCheckbox name={name} onClick={onClick} checked={false}>
            {label}
          </FormCheckbox>
        </fieldset>
      </div>
    );
  }

  return element;
};
Checkboxes.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool
};

export default Checkboxes;
