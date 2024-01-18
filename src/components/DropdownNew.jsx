import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const DropdownNew = ({ retrieveNameId }) => {
  const navigate = useNavigate();

  const [obj, setObj] = useState({ pageName: '', chartName: [] });
  const [mappedObject, setMappedObject] = useState(null);

  const options1 = [
    { id: '', value: '', label: 'Select' },
    { id: 'p1', value: 'page 1', label: 'Page 1' },
    { id: 'p2', value: 'page 2', label: 'Page 2' },
    { id: 'p3', value: 'page 3', label: 'Page 3' },
  ];

  const options2 = [
    { id: 'w1', value: 'Bar', label: 'Bar' },
    { id: 'w2', value: 'Line', label: 'Line' },
    { id: 'w3', value: 'Pie', label: 'Pie' },
    { id: 'w4', value: 'Donut', label: 'Donut' },
    { id: 'w5', value: 'Area', label: 'Area' },
  ];

  const handleDropdownChange = (name, value) => {
    setObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const findId = () => {
    const pId = options1.find((element) => obj.pageName === element.value)?.id;

    const cIds = obj.chartName.map((chartValue) =>
      options2.find((element) => chartValue === element.value)?.id
    );

    if (pId !== undefined && cIds.every((cId) => cId !== undefined)) {
      console.log('Page ID:', pId, 'Chart IDs:', cIds);
      const mappedObj = {
        [pId]: cIds,
      };
      setMappedObject(mappedObj);
    }
  };

  useEffect(() => {
    if (obj.pageName !== '' && obj.chartName.length > 0) {
      findId();
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    findId();
    console.log(mappedObject);

    const formObjKeys = Object.keys(mappedObject);
    const formObjValues = Object.values(mappedObject);
    const firstKey = formObjKeys[0];

    retrieveNameId(mappedObject);

    navigate(`/Widget/${firstKey}`, { state: { formObjectValues: formObjValues[0] } });
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
              options={options1}
              onChange={(selectedOption) => handleDropdownChange('pageName', selectedOption?.value || '')}
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
              onChange={(selectedOptions) =>
                handleDropdownChange('chartName', selectedOptions.map((option) => option.value))
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

export default DropdownNew;
