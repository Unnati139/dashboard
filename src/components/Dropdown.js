import React, { useState } from "react";

const Dropdown = ({ onPageSelect, onChartSelect }) => {
  // State object to manage the selected values of the dropdowns
  const [selectedValues, setSelectedValues] = useState({
    page: "",
    chart: "",
  });

  // Options for page
  const options1 = [
    { id: "", value: "", label: "Select" },
    { id: "p1", value: "page 1", label: "Page 1" },
    { id: "p2", value: "page 2", label: "Page 2" },
    { id: "p3", value: "page 3", label: "Page 3" },
  ];

  // Options for charts
  const options2 = [
    { id: "", value: "", label: "Select" },
    { id: "w1", value: "Bar", label: "Bar" },
    { id: "w2", value: "Line", label: "Line" },
    { id: "w3", value: "Area", label: "Area" },
    { id: "w4", value: "Pie", label: "Area" },
    { id: "w5", value: "Donut", label: "Donut" },
  ];

  // Function to handle changes in the dropdown selection
  const handleDropdownChange = (fieldId, event) => {
    const selectedValue = event.target.value;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldId]: selectedValue,
    }));

    if (fieldId === "page") {
        const selectedPageId = options1.find(
          (option) => option.value === selectedValue
        )?.id;
        onPageSelect(selectedPageId);
      } else if (fieldId === "chart") {
        const selectedChartId = options2.find(
          (option) => option.value === selectedValue
        )?.id;
        onChartSelect(selectedChartId);
      }
  };
 

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dropdown for Field 1 */}
        <div
          style={{
            margin: 50,
            padding: "18px",
            width: "40%",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <label style={{ marginBottom: "8px" }} htmlFor="dropdown1">
            Select Page:
          </label>
          <select
            id="dropdown1"
            value={selectedValues.page}
            onChange={(e) => handleDropdownChange("page", e)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          >
            {options1.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for Field 2 */}
        <div
          style={{
            margin: "50px",
            padding: "18px",
            width: "40%",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <label style={{ marginBottom: "8px" }} htmlFor="dropdown2">
            Select Charts :
          </label>
          <select
            id="dropdown2"
            value={selectedValues.chart}
            onChange={(e) => handleDropdownChange("chart", e)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          >
            {options2.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display selected values */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          Selected value for Page: {selectedValues.page} (
          {options1.find((option) => option.value === selectedValues.page)?.id})
        </p>
        <p>
          Selected value for Chart: {selectedValues.chart} (
          {options2.find((option) => option.value === selectedValues.chart)?.id}
          )
        </p>
      </div>
    </>
  );
};

export default Dropdown;
