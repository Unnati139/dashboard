import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

const BrushChart = () => {
  const [options, setOptions] = useState({});
  const [optionsLine, setOptionsLine] = useState({});
  const [series, setSeries] = useState([{}]);

  useEffect(() => {
    const exampleDataset = [
      {
        x: new Date('2022-01-01').getTime(),
        y: 25,
      },
      {
        x: new Date('2022-02-02').getTime(),
        y: 38,
      },
      {
        x: new Date('2022-03-03').getTime(),
        y: 45,
      },
      {
        x: new Date('2022-04-03').getTime(),
        y: 50,
      },
      {
        x: new Date('2022-05-03').getTime(),
        y: 65,
      },
      {
        x: new Date('2022-06-03').getTime(),
        y: 49,
      },
      {
        x: new Date('2022-07-03').getTime(),
        y: 45,
      },
      {
        x: new Date('2022-08-03').getTime(),
        y: 95,
      },
      {
        x: new Date('2022-09-03').getTime(),
        y: 25,
      },
      {
        x: new Date('2022-10-03').getTime(),
        y: 45,
      },
      {
        x: new Date('2022-11-03').getTime(),
        y: 45,
      },
      // Add more data points as needed
    ];

  

    const chartOptions = {
      chart: {
        id: 'chart2',
        type: 'line',
        height: 230,
        toolbar: {
          autoSelected: 'pan',
          show: false
        }
      },
      colors: ['#546E7A'],
      stroke: {
        width: 3
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      }
    };

    const lineOptions = {
      chart: {
        id: 'chart1',
        height: 130,
        type: 'area',
        brush: {
          target: 'chart2',
          enabled: true
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date('2022-01-01').getTime(),
            max: new Date('2022-01-03').getTime()
          }
        },
      },
      colors: ['#008FFB'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        }
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        tickAmount: 2
      }
    };

    setOptions(chartOptions);
    setOptionsLine(lineOptions);
    setSeries([{ data: exampleDataset }]);
  }, []);

  return (
    <>
      {/* Render the Chart components */}
      <Chart options={options} series={series} type="line" height={230} />
      <Chart options={optionsLine} series={series} type="area" height={130} />
    </>
  );
};

export default BrushChart;