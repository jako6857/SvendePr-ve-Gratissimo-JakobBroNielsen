import React from "react";

//vi laver dette dropdown komponent istedet for 5 forskellige select options inde i searchbar komponentet.

export const Dropdown = ({
  options,
  name,
  value,
  onChange,
  labelKey = "name",
}) => {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">{name}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option[labelKey]}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
