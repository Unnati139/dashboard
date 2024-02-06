import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GraphsWidgets from './components/GraphsWidgets';
import DropdownNew from './components/DropdownNew';
import BrushChart from './components/BrushChart';

const App = () => {
  const [pageObj, setPageObj] = useState(null);

  const mappedObjectApp = (formObject) => {
    const objKeys = Object.keys(formObject);
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
      {/* <BrushChart/> */}
    </div>
  );
};

export default App;

