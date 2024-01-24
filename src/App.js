import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GraphsWidgets from './components/GraphsWidgets';
import DropdownNew from './components/DropdownNew';

const App = () => {
  const [pageObj, setPageObj] = useState(null);

  const mappedObjectApp = (formObject) => {
    // console.log("formObject: ",formObject)
    const objKeys = Object.keys(formObject);
    // console.log(objKeys);
    // console.log(objKeys[0]);
    setPageObj(objKeys[0]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DropdownNew retrieveMappedObject={mappedObjectApp} />} />
          {pageObj && <Route
              path={`/Widget/${pageObj}`}
              element={<GraphsWidgets />}
            />
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

