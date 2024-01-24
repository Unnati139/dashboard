import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Widget1_Bar from "./Widget1_Bar";
import Widget2_Line from "./Widget2_Line";
import Widget3_PieDonut from "./Widget3_PieDonut";
//import Widget3_PieDonut from './Widget3_PieDonut';
import Widget5_Area from "./Widget5_Area";

const GraphsWidgets = () => {
  const location = useLocation();

  const values = location?.state?.formObjectValues;
  const numRows = location?.state?.numRows;
  const numColumns = location?.state?.numCols;

  const [result, setResult] = useState({
    followers: [],
    following: [],
    labelName: [],
  });

  const myData = [
    { name: "FollowersCount", data: result.followers },
    { name: "FollowingCount", data: result.following },
  ];
  const myData1 = [
    { name: "FollowersCount", data: result.followers },
    // Add more datasets as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dummyapi.online/api/social-profiles"
        );
        const res = await response.json();
        const followers = [];
        const following = [];
        const labelName = [];

        for (const obj of res) {
          followers.push(obj.followersCount);
          following.push(obj.followingCount);
          labelName.push(obj.fullName);
        }

        setResult((prev) => ({
          ...prev,
          followers: [...prev.followers, ...followers],
          following: [...prev.following, ...following],
          labelName: [...prev.labelName, ...labelName],
        }));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const renderWidget = (widgetType) => {
    switch (widgetType) {
      case "w1":
        return (
          <Widget1_Bar
            title="Bar Chart"
            subtitle="Subtitle for Bar Chart"
            labels={result.labelName}
            type="bar"
            data={myData}
            width="100%"
            height="500"
            fsize="6"
            xaxisTitle="Profiles"
            yaxisTitle="Count"
          />
        );
      case "w2":
        return (
          <Widget2_Line
            title="Line Chart"
            subtitle="Subtitle for Line Chart"
            labels={result.labelName}
            type="line"
            data={myData}
            width="100%"
            height="500"
            fsize="6"
            curve="smooth"
          />
        );
      case "w3":
        return (
          <Widget3_PieDonut
            title="Pie Chart"
            subtitle="Subtitle for Pie Chart"
            labels={result.labelName}
            type="pie"
            data={myData1}
            width="100%"
            height="500"
          // dataLabelsEnabled
          />
        );
      case "w4":
        return (
          <Widget3_PieDonut
            title="Donut Chart"
            subtitle="Subtitle for Donut Chart"
            labels={result.labelName}
            type="donut"
            data={myData1}
            width="100%"
            height="500"
          // dataLabelsEnabled
          />
        );
      case "w5":
        return (
          <Widget5_Area
            title="Area Chart"
            subtitle="Subtitle for Area Chart"
            labels={result.labelName}
            type="area"
            data={myData}
            width="100%"
            height="500"
            // dataLabelsEnabled
            curve="smooth"
          // stacked
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
            if ((rowIndex === 0 || colIndex === 0) && values.length - 1 === numRows && numColumns === 2 ) {
            if(rowIndex >=1 && rowIndex <= (values.length-2) ){ index = rowIndex + 1 ;}
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
            if (values.length - 1 !== numRows) {const widgetType = values[index];
              if (widgetType !== undefined) {
                return (
                  <div
                    className={12 % numColumns === 0 ? `col-md-${12 / numColumns} mb-4`: `col mb-4`}
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
