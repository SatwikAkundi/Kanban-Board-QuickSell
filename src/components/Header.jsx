import React, { useState } from "react";
import "./Header.css";
import Icon from "../assets/svg/Display.svg"
const Header = ({ onGroupingChange, onOrderingChange }) => {
  const [displayType, setDisplayType] = useState("default");
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  

  const handleDisplayTypeChange = (e) => {
    const newDisplayType = e.target.value;
    setDisplayType(newDisplayType);
  };

  const handleGroupingChange = (e) => {
    const sortGrouping = e.target.value;
    setGrouping(sortGrouping);
    onGroupingChange(sortGrouping);
  };

  const handleOrderingChange = (e) => {
    const newOrdering = e.target.value;
    setOrdering(newOrdering);
    onOrderingChange(newOrdering);
  };

  const groupingOptions = [
    { value: "status", label: "Status" },
    { value: "user", label: "User" },
    { value: "priority", label: "Priority" },
  ];

  const displayOptions = [
    { value: "default", label: "Display" },
    { value: "custom", label: "Custom" },
  ];

  const orderingOptions = [
    { value: "priority", label: "Priority" },
    { value: "title", label: "Title" },
  ];

  return (
    <div className="navbar">
      <div className="dropdown">
        {/* <label htmlFor="displayDropdown">Display:</label> */}
        <label htmlFor="displayDropdown" className="dropdown-label">
          <img src={Icon} alt="icon" className="dropdown-icon" />
          {/* Add the icon here */}
        </label>
        <select
          id="displayDropdown"
          value={displayType}
          onChange={handleDisplayTypeChange}
          className="dropdown-select"
        >
          {displayOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {displayType === "custom" && (
        <div className="dropdown">
          <label htmlFor="groupingDropdown">Grouping:</label>
          <select
            id="groupingDropdown"
            value={grouping}
            onChange={handleGroupingChange}
          >
            {groupingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {displayType === "custom" && (
        <div className="dropdown">
          <label htmlFor="orderingDropdown">Ordering:</label>
          <select
            id="orderingDropdown"
            value={ordering}
            onChange={handleOrderingChange}
          >
            {orderingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Header;
