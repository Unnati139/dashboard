import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Dropdown = ({ retrieveMappedObject }) => {
  const navigate = useNavigate();

  const [obj, setObj] = useState({ pageName: "", chartName: [] });
  const [mappedObject, setMappedObject] = useState(null);
const columnLayout = 4;
  const options1 = [
    // { id: "", value: "", label: "Select" },
    { id: "p1", value: "page 1", label: "Page 1" },
    { id: "p2", value: "page 2", label: "Page 2" },
    { id: "p3", value: "page 3", label: "Page 3" },
  ];
  // const options2 = [
  //   { id: "w1", value: "Bar", label: "Bar" },
  //   { id: "w2", value: "Line", label: "Line" },
  //   { id: "w3", value: "Pie", label: "Pie" },
  //   { id: "w4", value: "Donut", label: "Donut" },
  //   { id: "w5", value: "Area", label: "Area" },
  // ];
  const handleDropdownChange = (name, value) => {
    setObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
console.log("line 24: " ,mappedObject);
  const generateGraphData = () => {
    const pId = options1.find((element) => obj.pageName === element.value)?.id;

    switch (pId) {
      case "p1":
        setMappedObject({ [pId]: ["w1", "w2"] });
        break;
      case "p2":
        setMappedObject({ [pId]: ["w1", "w2", "w3", "w4"] });
        break;
      case "p3":
        setMappedObject({ [pId]: ["w1", "w2", "w3", "w4", "w5"] });
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (obj.pageName !== "") {
      generateGraphData();
    }
  }, [obj]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formObjKeys = Object.keys(mappedObject); //key is pageid
    const formObjValues = Object.values(mappedObject); //value is chart ids
    const firstKey = formObjKeys[0];
    retrieveMappedObject({
      ...mappedObject,
    });

    navigate(`/Widget/${firstKey}`, {
      state: {
        formObjectValues: formObjValues[0],
        ColumnLayout:(columnLayout > 2 ? columnLayout : 2),

      },
    });
  };

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
        </div>        

        <div className="mt-3">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dropdown;
