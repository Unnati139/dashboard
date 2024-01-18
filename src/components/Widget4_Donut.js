import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const Widget4_Donut = ({ width, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [44, 55, 41, 17, 15],
      chart: {
        type: 'donut',
        height: height || 300, // Use the provided height or default to 300
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: width || 200, // Adjust the width for the responsive breakpoint
              height: height || 200, // Adjust the height for the responsive breakpoint
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Clean up when the component is unmounted
      return () => {
        chart.destroy();
      };
    }
  }, [width, height]);

  return <div id="chart" ref={chartRef} />;
};

export default Widget4_Donut;
