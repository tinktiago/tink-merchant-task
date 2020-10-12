import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import PropTypes from "prop-types";

export const BasicDropdown = ({ items, name, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(items[0]);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
    onSelect(value);
  }, [value, onSelect]);

  const dropdownItems = items.map(item => (
    <DropdownItem onClick={(e) => setValue(item)} key={item}>
      {item}
    </DropdownItem>
  ));

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret block>{name}</DropdownToggle>
      <DropdownMenu>{dropdownItems}</DropdownMenu>
    </Dropdown>
  );
};

Dropdown.PropTypes = {
  items: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Dropdown;
