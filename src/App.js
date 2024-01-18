
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GraphsWidgets from './components/GraphsWidgets';
import DropdownNew from './components/DropdownNew';

const App = () => {
  const [pageObj, setPageObj] = useState(null);

  const pageNameId = (formObject) => {
    console.log(formObject);
    setPageObj(formObject);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DropdownNew retrieveNameId={pageNameId} />} />
          {pageObj && Object.keys(pageObj).map((key) => (
            <Route
              key={key}
              path={`/Widget/${key}`}
              element={<GraphsWidgets />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
