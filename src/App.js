import React, { useEffect, useState,useId  } from "react";
import Widget1_Bar from './components/Widget1_Bar';
import Widget2_Line from "./components/Widget2_Line";
import Dropdown from "./components/Dropdown";

function App() {
  const [result, setResult] = useState({
    followers: [],
    following: [],
    labelName: [],
  });
  const id = useId();
  console.log("line 12- ",id)
  useEffect(() => {
    const url = "https://dummyapi.online/api/social-profiles";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
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
    // console.log(res);

    fetchData();
  }, []);

  const myData = [
    { name: "FollowersCount", data: result.followers },
    { name: "FollowingCount", data:  result.following},
    // Add more datasets as needed
  ];
  const formatDataLabel = (value) => {
    return `$${value}`;
  };
  const handlePageSelection = (selectedPageId) => {
    // selectedPageId in the parent component
    console.log("Selected Page ID in Parent Component:", selectedPageId);
  };

  const handleChartSelection = (selectedChartId) => {
    // selectedChartId in the parent component
    console.log("Selected Chart ID in Parent Component:", selectedChartId);
  };
  return (
    <div className="App">
       <Dropdown onPageSelect={handlePageSelection} onChartSelect={handleChartSelection} />
      <Widget1_Bar
         title="jsdbcdsbcd"
        subtitle="hfiuehfuie"
        labels={result.labelName}
        type="bar"
        data={myData}
        width="1500"
        height="800"
        fsize="6"
        xaxisTitle = " hreiufrehiu"
        yaxisTitle = " urgfurieguifre"
      />


      <Widget2_Line
         title="jsdbcdsbcd"
        subtitle="hfiuehfuie"
        labels={result.labelName}
        type="line"
        data={myData}
        width="1500"
        height="800"
        fsize="6"
        // tickPlacement="on"
        curve="smooth"
      />

    </div>
  );
}

export default App;
