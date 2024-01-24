
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = () => {
  const chartRef = useRef();


  useEffect(() => {
    const data = [30, 40, 60, 20, 50, 35, 25, 45, 55, 30, 40, 60, 20, 50, 35, 25, 45, 55, 30, 40, 60, 20, 50, 35, 25, 45, 55, 30, 40, 60]; // Example data for thirty segments
    const height = 600;
    const width = 800;
    const radius = Math.min(width, height) / 3;
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeCategory10);
      // .range(['#ff8080', '#80ff80', '#8080ff', '#ff80ff', '#80ffff', '#ffff80', '#ff0080', '#ffcc80', '#80ffcc', '#cc80ff', '#ff9999', '#99ff99', '#9999ff', '#ff99ff', '#99ffff', '#ffff99', '#ff3399', '#ffcc33', '#33ffcc', '#cc33ff', '#ff6666', '#66ff66', '#6666ff', '#ff66ff', '#66ffff', '#ffff66', '#ff3366', '#ffcc66', '#66ffcc', '#cc66ff']);


    const pie = d3.pie()
      .value(d => d);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data));

    const lineOffset = 1.3 * radius; // Set the line length as a multiple of the radius

    arcs.append('polyline')
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', d => {
        const centroid = arc.centroid(d);
        const midAngle = Math.atan2(centroid[1], centroid[0]);
        const x = Math.cos(midAngle) * lineOffset;
        const y = Math.sin(midAngle) * lineOffset;
        return `${arc.centroid(d)},${[x, y]},${[x, y]}`;
      });

    arcs.append('text')
    .attr('transform', d => {
      const centroid = arc.centroid(d);
      const midAngle = Math.atan2(centroid[1], centroid[0]);
      const x = Math.cos(midAngle) * (lineOffset + 10) + 10; // Adjust x position
      const y = Math.sin(midAngle) * (lineOffset + 10); // Adjust y position
      return `translate(${x}, ${y})`;
    })
      .attr('text-anchor', (d) => {
        const midAngle = (d.startAngle + d.endAngle) / 2;
        return (midAngle <= Math.PI ? 'start' : 'end');
      })
      .attr('dy', '0.35em')
      .text(d => d.data)
      .call(wrapText, 80); // Wrap labels if needed with a maximum width of 80 pixels

  });

function wrapText(text, width) {
    text.each(function () {
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.1; // Adjust line height as needed
      const x = text.attr('x');
      const y = text.attr('y');
      const dy = parseFloat(text.attr('dy'));
      let tspan = text.text(null)
        .append('tspan')
        .attr('x', x)
        .attr('y', y)
        .attr('dy', dy + 'em');
  
      let word;
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word);
        }
      }
    });
  }
  return <div ref={chartRef} style={{border:"1px solid red",margin:"10px",paddingLeft:"10px"}}></div>;
};
  export default PieChart;