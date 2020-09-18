import React from "react";
import PropTypes from "prop-types";

class Select extends React.Component {
  makeOption = option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  );

  handleChange = event => {
    this.props.onChange(event.target.id, event.target.value);
    event.preventDefault();
  };

  handleBlur = event => {
    this.props.onBlur(this.props.id, true);
    event.preventDefault();
  };

  render() {
    const { id, name, options, onBlur } = this.props;
    return (
      <div>
        <select
          class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={id}
          name={name}
          component="select"
          onChange={this.handleChange}
          onBlur={onBlur && this.handleBlur}
          value={this.props.value}
        >
          {options.map(this.makeOption)}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(String)
};

Select.defaultValue = {
  options: []
};

export default Select;
