import React from "react";
import Chart from "react-apexcharts";

const Widget1 = (id) => {
  const {
    labels,
    chartType,
    data,

    chartTitle = " ",
    chartSubTitle = "",
    width = "100%",
    height = "100%",
    xaxisTitle = " ",
    yaxisTitle = " ",

    fontSize = 20,
    fontColour = "black",
    legendShow = 1,
    dataLabelsEnabled = 1,
    strokeEnabled = 1,
    tooltipEnabled = 1,
    gridShow = 1,
    gridShowXaxis = 0,
    gridShowYaxis = 1,
    zoomEnabled = 1,
    strokeCurve = "smooth",
    markersSize = 5,
    forecastDataPoints = undefined,
    responsive = 1,
    monochromaticEnabled = 0,
    fillType='gradient',

    tickPlacement = "on",

    horizontal = 0,
    distributed = 0,

    format = undefined,
    dataLabelFormatter,
    theme = "light",

    ...other
  } = id;

  

  let series = [];
  if (
    (chartType === "pie" || chartType === "donut") &&
    data &&
    data.length > 0
  ) {
    // For a pie chart, extract numerical data from the 'data' prop
    series = data.map((item) => item.data).flat(); // Get all numerical values into a single array
  } else {
    series = data;
  }
 

  const options = {
    plotOptions:
      chartType === "bar"
        ? {
            bar: {
              horizontal: horizontal,
              columnWidth: "75%",
              barHeight: "70%",
              borderRadiusApplication: "end",
              borderRadius: 4,
              distributed: distributed,
              dataLabels: {
                position: "center",
              },
            },
          }
        : chartType === "pie" || chartType === "donut"
        ? {
            pie: {
              startAngle: -90,
              endAngle: 270,
              donut:
                chartType === "pie"
                  ? {}
                  : {
                      labels: {
                        show: true,
                        total: {
                          showAlways: true,// for total in donut chart
                          show: true,
                        },
                      },
                    },
            },
          }
        : {},

    labels: labels,

    theme: {
      mode: theme,
      monochrome: {
        enabled: monochromaticEnabled,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },

    series: data,

    // colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],

    fill:
      chartType === "line"
        ? {
            colors: ["#1A73E8"],
            type: fillType,
            gradient: {
              shade: "light",
              gradientToColors: ["#FDD835"],
              shadeIntensity: 1,
              type: "horizontal",
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          }
        : chartType === "area"
        ? {
            type: fillType,
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100],
            },
          }
        : chartType === "pie" || chartType === "donut"
        ? {
            type: fillType, //image,pattern,gradient
            opacity: 1,
            pattern: {
              enabled: true,
              style: [
                "verticalLines",
                "squares",
                "horizontalLines",
                "circles",
                "slantedLines",
              ],
            },
          }
        : {},

    stroke: {
      show: strokeEnabled,
      curve: strokeCurve,
      lineCap: "butt",
      colors: undefined,
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
      width: 3,
      dashArray: 0,
    },

    title: {
      text: chartTitle,
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,

      style: {
        fontSize: fontSize,
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },

    subtitle: {
      text: chartSubTitle,
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 20,

      style: {
        fontSize: fontSize,
        fontWeight: "normal",
        fontFamily: undefined,
        color: "#9699a2",
      },
    },

    legend: {
      show: legendShow,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 400,
    },

    tooltip: {
      enabled: tooltipEnabled,
      hideEmptySeries: true,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      // y: {
      //     formatter: function (val) {
      //         return formatter(val, points);
      //     }
      // }
    },

    dataLabels: {
      enabled: dataLabelsEnabled,
      formatter:
       ( chartType === "pie" || chartType === "donut")
          ? (val) => `${val.toFixed(2)}%`
          : (val) => `${val}`,
      textAnchor: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "12px",
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
    states: {
      hover: {
        filter: {
          type: "lighten", //dark,none
          value: 0.15,
        },
      },
    },
    chart: {
      zoom: {
        enabled: zoomEnabled,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    forecastDataPoints: {
      count: forecastDataPoints,
    },
    xaxis: {
      // min: xaxisMin,
      // max: xaxisMax,
      tickPlacement: tickPlacement, //Whether to draw the ticks in between the data-points or on the data-points.
      // categories: name, //or we can give the labels
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        // formatter: function (val) {
        //   return Math.abs(Math.round(val)) + `${format}`
        // }
      },
      title: {
        text: xaxisTitle,
        style: { color: fontColour, fontSize: fontSize },
      },
    },
    yaxis: {
      labels: {
        show: true,
        // formatter: (val) => {
        //   return `${val}`;
        // },
        style: { fontSize: "15", colors: fontColour },
      },
      title: {
        text: yaxisTitle,
        style: { color: fontColour, fontSize: fontSize },
      },
      // min: yaxisMin,
      // max: yaxisMax,
      // reversed: true,//for bar chart, but not working
    },
    grid: {
      show: gridShow,
      borderColor: "#d1d1d1",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: gridShowXaxis,
        },
      },
      yaxis: {
        lines: {
          show: gridShowYaxis,
        },
        axisTicks: {
          show: true,
        },
      },
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    noData: {
      text: "Empty Data",
    },
    markers: {
      size: markersSize,
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={series}
        type={chartType}
        width={width}
        height={height}
      />
    </>
  );
};

export default Widget1;
