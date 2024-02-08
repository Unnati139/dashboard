import React from "react";
import { useLocation } from "react-router-dom";
import Widget from "./Widget";

const GraphsWidgets = () => {
  const location = useLocation();
  console.log(location.state.ColumnLayout)
  const graphIds = location?.state?.formObjectValues;
  const selectedLayout = location?.state.ColumnLayout;//2

    const series = [
      {
        name: 'Average marks',
        data: [480, 600, 800, 550, 750],
      },
    ];
    const series2 = [
      {
        name: "Total Enrolled",
        data: [
          {
            x: "Dec 23 2017",
            y: null,
          },
          {
            x: "Dec 24 2017",
            y: 44,
          },
          {
            x: "Dec 25 2017",
            y: 31,
          },
          {
            x: "Dec 26 2017",
            y: 38,
          },
          {
            x: "Dec 27 2017",
            y: null,
          },
          {
            x: "Dec 28 2017",
            y: 32,
          },
          {
            x: "Dec 29 2017",
            y: 55,
          },
          {
            x: "Dec 30 2017",
            y: 51,
          },
          {
            x: "Dec 31 2017",
            y: 67,
          },
          {
            x: "Jan 01 2018",
            y: 22,
          },
          {
            x: "Jan 02 2018",
            y: 34,
          },
          {
            x: "Jan 03 2018",
            y: null,
          },
          {
            x: "Jan 04 2018",
            y: null,
          },
          {
            x: "Jan 05 2018",
            y: 11,
          },
          {
            x: "Jan 06 2018",
            y: 4,
          },
          {
            x: "Jan 07 2018",
            y: 15,
          },
          {
            x: "Jan 08 2018",
            y: null,
          },
          {
            x: "Jan 09 2018",
            y: 9,
          },
          {
            x: "Jan 10 2018",
            y: 34,
          },
          {
            x: "Jan 11 2018",
            y: null,
          },
          {
            x: "Jan 12 2018",
            y: null,
          },
          {
            x: "Jan 13 2018",
            y: 13,
          },
          {
            x: "Jan 14 2018",
            y: null,
          },
        ],
      },
    ];
    const dummyCategories1 = ['A', 'B', 'C', 'D', 'E'];
  
    const generateResult = (layout) => {
      const result = [];
      let currentRow = [];
      let counter = 0;
  
      let customCss = {
        boxShadow: '0 4px 8px rgba(0,0,0,0.9)',
        height: selectedLayout === 1 ? '50vh' : selectedLayout === 2 ? '50vh' : selectedLayout === 3 ? '50vh' :selectedLayout === 4 ? '45vh' :'450px',
        width: selectedLayout === 1 ? '50vw' : selectedLayout === 2 ? '50vh' : selectedLayout === 3 ? '50vh' :selectedLayout === 4 ? '45vh' :'450px',
      }
      for (let i = 0; i < graphIds.length; i++) {
        const widgetType = graphIds[i];
        console.log("line 35:",widgetType)
  
        switch (widgetType) {
          case 'w1':
            currentRow.push(
              <div  key={i} className="m-2" style={customCss} >
                <Widget labels={dummyCategories1} chartType="bar" data={series} />
              </div>
            );
            break;
          case 'w2':
            currentRow.push(
              <div key={i} className="m-2" style={customCss} >
                <Widget labels={dummyCategories1} chartType="line" data={series} />
              </div>
            );
            break;
          case 'w3':
            currentRow.push(
              <div key={i} className="m-2" style={customCss} >
                <Widget 
                  chartTitle="Pie Chart"
                  chartSubTitle="Subtitle for Pie Chart"
                  labels={dummyCategories1}
                  chartType="pie"
                  data={series}
                  strokeEnabled={0}
                />
              </div>
            );
            break;
          case 'w4':
            currentRow.push(
              <div key={i} className="m-2" style={customCss} >
                <Widget labels={dummyCategories1} chartType="donut" data={series} />
              </div>
            );
            break;
          case 'w5':
            currentRow.push(
              <div key={i} className="m-2" style={customCss} >
                <Widget chartType="area" data={series2} dataLabelsEnabled={0} strokeCurve="straight" />
              </div>
            );
            break;
          default:
            break;
        }
  
        counter++;
  
        if (counter === layout || i === graphIds.length - 1) {
          result.push([...currentRow]);
          currentRow = [];
          counter = 0;
        }
      }
  
      return result;
    };
  
    console.log(selectedLayout);

  return (
    <div className="container mt-4">

      <div className="mt-3">
        {generateResult(selectedLayout).map((row, rowIndex) => (
          <div key={rowIndex} className="mb-3 d-flex justify-content-evenly">
            {row.map((card, colIndex) => (
              <div key={colIndex} className="mb-2">
                {card}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphsWidgets;
