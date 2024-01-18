import React from "react";
import Chart from "react-apexcharts";
const Widget3_PieDonut = (id) => {
  const {
    fontSize = 20,
    title,
    subtitle,
    theme = "light",
    labels,
    colour = "black",
    type,
    data,
    width = 1000,
    height = 500,
    dataLabelsEnabled=false,
    dataLabelFormatter,
    ...other
  } = id;
  // console.log('Other props:', other);
  console.log("line 20", data);

  let series = [];
  if ( data && data.length > 0) {
    // For a pie chart, extract numerical data from the 'data' prop
    series = data.map((item) => item.data).flat(); // Get all numerical values into a single array
  }

  console.log("line 29", series);

  let plotOptions = {};
  if (type === "donut") {
    plotOptions = {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              fontSize: 25,
              color: "#f90000",
            },
          },
        },
      },
    };
  }
  const options = {
    plotOptions: {
      ...plotOptions,
    },
    fill: {
      type: 'gradient',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 350
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
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
      enabled: dataLabelsEnabled,
      formatter: dataLabelFormatter || ((val) => `${val}`),
      textAnchor: "middle",
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
  );
};

export default Widget3_PieDonut;
