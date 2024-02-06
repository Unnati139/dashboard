import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Widget1 from "./Widget1";

const GraphsWidgets = () => {
  const location = useLocation();

  const values = location?.state?.formObjectValues;
  const numRows = location?.state?.numRows;
  const numColumns = location?.state?.numCols;

  const series = [
    {
      name: "Average marks",
      data: [480, 600, 800, 550, 750],
    },
  ];

  const dummyCategories1 = ["A", "B", "C", "D", "E"];

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

  const renderWidget = (widgetType) => {
    switch (widgetType) {
      case "w1":
        return (
          <Widget1
            labels={dummyCategories1}
            chartType="bar"
            data={series}
            // horizontal={1}
            // distributed={1}
            // xaxisTitle="x-axis"
            // yaxisTitle="y-axis"
            // monochromaticEnabled={1}
            //  strokeEnabled={0}
            // zoomEnabled={1}
          />
        );
      case "w2":
        return (
          <Widget1
            labels={dummyCategories1}
            chartType="line"
            data={series}
            // monochromaticEnabled={1}
          />
        );
      case "w3":
        return (
          <Widget1
            chartTitle="Pie Chart"
            chartSubTitle="Subtitle for Pie Chart"
            labels={dummyCategories1}
            chartType="pie"
            data={series}
            strokeEnabled={0}
            // monochromaticEnabled={1}
          />
        );
      case "w4":
        return (
          <Widget1
            labels={dummyCategories1}
            chartType="donut"
            data={series}
            // fillType="pattern"
            // strokeEnabled={0}
            // monochromaticEnabled={1}
          />
        );
      case "w5":
        return (
          <Widget1
            // labels={dummyCategories}
            chartType="area"
            data={series2}
            // xaxisType="datetime"
            dataLabelsEnabled={0}
            strokeCurve="straight"
            // monochromaticEnabled={1}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="container mt-4">
      <h3 className="mb-4">GraphsWidgets Dashboard</h3>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div className="row" key={rowIndex}>
          {Array.from({ length: numColumns }).map((_, colIndex) => {
            let index = rowIndex * numColumns + colIndex;
            if (
              (rowIndex === 0 || colIndex === 0) &&
              values.length - 1 === numRows &&
              numColumns === 2
            ) {
              if (rowIndex >= 1 && rowIndex <= values.length - 2) {
                index = rowIndex + 1;
              }
              // if (rowIndex === 1) { index = 2; }
              // if (rowIndex === 2) { index = 3; }
              // if (rowIndex === 3) { index = 4; }
              const widgetType = values[index];
              return (
                <div
                  className={`col-md-${12 / numColumns} mb-4`}
                  key={widgetType}
                >
                  <div className="card">
                    <div className="card-body" style={{ minHeight: "547px" }}>
                      {renderWidget(widgetType)}
                    </div>
                  </div>
                </div>
              );
            }
            if (values.length - 1 !== numRows) {
              const widgetType = values[index];
              if (widgetType !== undefined) {
                return (
                  <div
                    className={
                      12 % numColumns === 0
                        ? `col-md-${12 / numColumns} mb-4`
                        : `col mb-4`
                    }
                    key={widgetType}
                  >
                    <div className="card">
                      <div className="card-body" style={{ minHeight: "547px" }}>
                        {renderWidget(widgetType)}
                      </div>
                    </div>
                  </div>
                );
              }
            } else {
              console.log("else the last condition is executing");
              return null; // Handle the case where there are not enough values for the specified rows and columns
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default GraphsWidgets;
