import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const DropdownNew = ({ retrieveMappedObject }) => {
  const navigate = useNavigate();

  const [obj, setObj] = useState({ pageName: "", chartName: [] });
  const [mappedObject, setMappedObject] = useState(null);
  const [numRows, setNumRows] = useState(1); // Number of rows
  const [numCols, setNumCols] = useState(1); // Number of columns

  const options1 = [
    { id: "", value: "", label: "Select" },
    { id: "p1", value: "page 1", label: "Page 1" },
    { id: "p2", value: "page 2", label: "Page 2" },
    { id: "p3", value: "page 3", label: "Page 3" },
  ];

  const options2 = [
    { id: "w1", value: "Bar", label: "Bar" },
    { id: "w2", value: "Line", label: "Line" },
    { id: "w3", value: "Pie", label: "Pie" },
    { id: "w4", value: "Donut", label: "Donut" },
    { id: "w5", value: "Area", label: "Area" },
  ];
  const generateRowOptions = (chartLength) => {
    return Array.from({ length: chartLength }, (_, index) => ({
      value: index + 1,
      label: (index + 1).toString(),
    }));
  };

  const generateColOptions = (numRows, chartLength) => {
    const maxCols = Math.ceil(chartLength / numRows);
    const colOptions = Array.from({ length: maxCols }, (_, index) => ({
      value: index + 1,
      label: (index + 1).toString(),
    }));

    // Filter out options that are not practically possible
    return colOptions.filter((option) => option.value * numRows >= chartLength);
  };
  const handleDropdownChange = (name, value) => {
    setObj((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "chartName") {
      const chartLength = value.length;

      setNumRows(chartLength > 0 ? 1 : 0);
      setNumCols(chartLength > 0 ? 1 : 0);
    }
  };

  const findId = () => {
    const pId = options1.find((element) => obj.pageName === element.value)?.id;

    const cIds = obj.chartName.map(
      (chartValue) =>
        options2.find((element) => chartValue === element.value)?.id
    );

    if (pId !== undefined && cIds.every((cId) => cId !== undefined)) {
      // console.log("Page ID:", pId, "Chart IDs:", cIds);
      const mappedObj = {
        [pId]: cIds,
      };
      setMappedObject(mappedObj);
    }
  };

  useEffect(() => {
    if (obj.pageName !== "" && obj.chartName.length > 0) {
      findId();
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObjKeys = Object.keys(mappedObject); //key is pageid
    const formObjValues = Object.values(mappedObject); //value is chart ids
    const firstKey = formObjKeys[0];
    retrieveMappedObject({
      ...mappedObject,
      numRows,
      numCols,
    });

    navigate(`/Widget/${firstKey}`, {
      state: {
        formObjectValues: formObjValues[0],
        numRows: numRows,
        numCols: numCols,
      },
    });
    
  };
  // console.log("mappedObject : ",mappedObject)

  return (
    <div className="container mt-5 border p-4 shadow-lg">
      <h3>Dropdown</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6 shadow-sm">
            <label htmlFor="dropdown1" className="form-label">
              Select Page:
            </label>
            <Select
              id="dropdown1"
              name="pageName"
              required
              options={options1}
              onChange={(selectedOption) =>
                handleDropdownChange("pageName", selectedOption?.value || "")
              }
            />
          </div>

          <div className="col-md-6 shadow-sm">
            <label htmlFor="dropdown2" className="form-label">
              Select Charts:
            </label>
            <Select
              id="dropdown2"
              name="chartName"
              options={options2}
              isMulti
              required
              onChange={(selectedOptions) =>
                handleDropdownChange(
                  "chartName",
                  selectedOptions.map((option) => option.value)
                )
              }
            />
          </div>
        </div>

        {obj.chartName.length > 0 && (
          <div className="row g-3">
            <div className="col-md-6 shadow-sm">
              <label htmlFor="dropdownRows" className="form-label">
                Number of Rows:
              </label>
              <Select
        
                id="dropdownRows"
                name="numRows"
                options={generateRowOptions(obj.chartName.length)}
                value={{ value: numRows, label: numRows.toString() }}
                onChange={(selectedOption) =>
                 { setNumCols("")
                  setNumRows(selectedOption?.value || 1)
                }}
              />
            </div>

            <div className="col-md-6 shadow-sm">
              <label htmlFor="dropdownCols" className="form-label">
                Number of Columns:
              </label>
              <Select
         
                id="dropdownCols"
                name="numCols"
                options={generateColOptions(numRows, obj.chartName.length)}
                value={{ value: numCols, label: numCols.toString() }}
                onChange={(selectedOption) =>
                  setNumCols(selectedOption?.value || 1)
                }
              />
            </div>
          </div>
        )}

        <div className="mt-3">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DropdownNew;
