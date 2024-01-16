import React from 'react'
import Chart from "react-apexcharts";

const Widget2_Line = (props) => {
    const {
        fontSize = 20,
        title,
        subtitle,
        xaxisTitle = " ",
        yaxisTitle = " ",
        theme = "light",
        labels,
        colour ="black",
        type,
        data,
        width = 2000,
        height = 500,
        dataLabelFormatter,
        tickPlacement="between",
        curve='smooth',
        ...other
      } = props;

      let series = [];
      if (data && data.length > 0) {
        series = data.map((item) => ({
          name: item.name,
          data: item.data,
        }));
      }
      const options = {   
        plotOptions :{
            // bar: {
            //   horizontal: horizontal,
            //   columnWidth: "55%",
            //   endingShape: "rounded",
            // },
        },
    
        colors: ['#77B6EA', '#545454'],
        title: {
          text: title,
          style: { fontSize: fontSize },
        },
    
        subtitle: {
          text: subtitle,
          style: { fontSize: fontSize },
        },
    
        theme: { mode: theme },
    
        labels: labels,
    
        xaxis: {
          tickPlacement: tickPlacement,//Whether to draw the ticks in between the data-points or on the data-points.
          // categories: name, //or we can give the labels
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            formatter: undefined,
          },
          title: {
            text: xaxisTitle,
            style: { color: colour, fontSize: fontSize },
          },
        //   tooltip:{
        //     enabled:true,
        //   }
        },
    
        yaxis: {
          labels: {
            formatter: (val) => {
              return `${val}`;
            },
            style: { fontSize: "15", colors: colour },
          },
          title: {
            text: yaxisTitle,
            style: { color: colour, fontSize: fontSize },
          },
        },
    
        legend: {
          show: true,
          position: "bottom",
          // onItemHover: {
          //   highlightDataSeries: true,
          // },
          // onItemClick: {
          //   toggleDataSeries: true,
          // },
          // markers: {
          //   width: 12,
          //   height: 12,
          //   strokeWidth: 0,
          //   strokeColor: "#fff",
          //   fillColors: undefined,
          //   radius: 12,
          // },
        },
    
        dataLabels: {
          enabled:true ,
          formatter: dataLabelFormatter || ((val) => `${val}`),
          // formatter: (val) => {
          //   return `$${val}`;
          // },
          textAnchor: "middle",
          // distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: "10px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: undefined,
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#fff",
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: "#000",
              opacity: 0.45,
            },
          },
        },
        stroke: {
            show: true,
            curve: curve,//In line / area charts, whether to draw smooth lines or straight lines
            lineCap: 'butt',
            // colors: [ "blue","green"],
            width: 1,
            dashArray: 0, //Creates dashes in borders
        },
        markers:{
            size:5
        },
       grid:{
        borderColor: '#e7e7e7',
        row:{
            colors:['#f3f3f3', 'transparent'],
            opacity: 0.5
        }
       },
        noData: {
          text: "Empty Data",
        },
      };
  return (
    <>
    <Chart
      options={options}
      series={series}
      type={type}
      width={width}
      height={height}
    />
  </>
  )
}

export default Widget2_Line