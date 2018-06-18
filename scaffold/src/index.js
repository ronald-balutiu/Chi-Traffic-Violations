import {scaleLinear} from 'd3-scale';
import {scaleBand} from 'd3-scale';
import {select} from 'd3-selection';
import {axisBottom} from 'd3-axis';
import {axisLeft} from 'd3-axis';
import {pie} from 'd3-shape';
import {arc} from 'd3-shape';
import {line} from 'd3-shape';
import MY_DATA from '../app/data/example.json';

const domReady = require('domready');

domReady(() => {
  myVis(MY_DATA);
});

function myVis(data) {

  const height = 5000;
  const width = 24 / 36 * height;
  const margin = {top: 20, left: 20, right: 20, bottom: 20};
  const useWidth = width - margin.left;
  const useHeight = (height - margin.top) / 3;
  const color = [
    'rgb(86,226,207)',
    'rgb(86,104,226)',
    'rgb(207,86,226)',
    'rgb(226,86,174)',
    'rgb(223,135,85)',
    'rgb(224,205,85)',
    'rgb(104,226,86)',
    'rgb(86,104,226)'
  ];

  const xScaleM = scaleBand().rangeRound([useWidth / 5.7, useWidth - margin.right]).paddingInner(0.2)
        .domain(['January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December']);

// RLV refers to red light violations per day
  const yScaleRLV = scaleLinear()
            .domain([150000, 334798])
            .range([margin.bottom, useHeight / 2.6]);

// svd refers to speeding violations per day
  const yScaleSCV = scaleLinear()
            .domain([400000, 652547])
            .range([margin.bottom, useHeight / 2.6]);

// TV refers to total violations per day
  const yScaleM = scaleLinear()
           .domain([0, 640000])
           .range([useHeight, margin.bottom]);

// ~~~~~~~~~~~~~Code for background color~~~~~~~~~~~~

  select('.vis-container').append('g')
                        .append('rect')
                          .attr('class', 'bar')
                          .attr('x', 0)
                          .attr('y', 0)
                          .attr('width', width)
                          .attr('height', height)
                          .attr('style', 'fill:rgb(255,255,255);stroke-width:3;stroke:rgb(0,0,0)');

// ~~~~~~~~~~~~~Code for Title and Pie Labels~~~~~~~~~

  function titlePieText() {

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'helvetica')
                        .style('font-size', '140')
                        .attr('x', 200)
                        .attr('y', 200)
                        .text('An Analysis of Traffic Violations Within Chicago');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'helvetica')
                        .style('font-size', '72')
                        .attr('x', 1910)
                        .attr('y', 300)
                        .text('By Jackson Quinn and Ronald Balutiu');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '72')
                        .attr('x', 470)
                        .attr('y', 2480)
                        .text('Red Light Violations by Day');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '54')
                        .attr('x', 470)
                        .attr('y', 2550)
                        .text('(Scale begins at 240k, 30k intervals)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '72')
                        .attr('x', 2070)
                        .attr('y', 2480)
                        .text('Speeding Violations by Day');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '54')
                        .attr('x', 2070)
                        .attr('y', 2550)
                        .text('(Scale begins at 500k, 50k intervals)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '54')
                        .attr('x', 160)
                        .attr('y', 550)
                        .text('Using data aquired from data.cityofchicago.org we analyzed the' +
                          'number of red light and speeding violations from 2014 to 2017.');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '54')
                        .attr('x', 470)
                        .attr('y', 620)
                        .text('We aimed to see if there was any significant correlation' +
                          ' between day of week / season and violations.');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '54')
                        .attr('x', 670)
                        .attr('y', 690)
                        .text('The polar charts below show violations by day, while the' +
                        ' line chart shows by month. ');

  }

  titlePieText();

// ~~~~~~~~~~~~~~Code for RLV Label Days of the Week [this part is long :(]~~~~~

  function rlvText() {

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1160)
                        .attr('y', 1050)
                        .text('Mon (263897)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1560)
                        .attr('y', 1510)
                        .attr('transform', 'rotate(0)')
                        .text('Tue');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1560)
                        .attr('y', 1550)
                        .attr('transform', 'rotate(0)')
                        .text('(267900)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1380)
                        .attr('y', 2100)
                        .text('Wed (273660)');
    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 780)
                        .attr('y', 2340)
                        .text('Thu (284153)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 190)
                        .attr('y', 2100)
                        .text('Fri (312460)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 150)
                        .attr('y', 1600)
                        .attr('transform', 'rotate(0)')
                        .text('Sat');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 70)
                        .attr('y', 1650)
                        .attr('transform', 'rotate(0)')
                        .text('(334798)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 430)
                        .attr('y', 1050)
                        .text('Sun (303270)');

  }

  rlvText();

// ~~~~~~~~~~~~~~Code for SCV Label Days of the Week [this part is long :(]~~~~~

  function scvText() {

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 2710)
                        .attr('y', 1050)
                        .text('Mon (592506)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 3150)
                        .attr('y', 1600)
                        .attr('transform', 'rotate(0)')
                        .text('Tue');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 3100)
                        .attr('y', 1650)
                        .attr('transform', 'rotate(0)')
                        .text('(609005)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 2950)
                        .attr('y', 2100)
                        .text('Wed (604867)');
    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 2330)
                        .attr('y', 2340)
                        .text('Thu (630182)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1740)
                        .attr('y', 2100)
                        .text('Fri (630182)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1730)
                        .attr('y', 1620)
                        .attr('transform', 'rotate(0)')
                        .text('Sat');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1650)
                        .attr('y', 1670)
                        .attr('transform', 'rotate(0)')
                        .text('(581893)');

    select('.vis-container').append('g')
                      .append('text')
                        .style('font-family', 'arial')
                        .style('font-size', '40')
                        .attr('x', 1980)
                        .attr('y', 1050)
                        .text('Sun (568722)');

  }

  scvText();

// ~~~~~~~~~~~~~Code for RLV Pie ~~~~~~~~~~~~~~~~~~~~

  function makeRLVPie() {

    const svgRLV = select('.vis-container').append('g')
                  .attr('class', 'arc')
                  .attr('transform', 'translate(900, 1650)');

    const arcRLV = arc()
                  .innerRadius(0)
                  .outerRadius(function makeRadius(d) {
                    return yScaleRLV(d.data.val);
                  });

    const arcRLVPie = pie()
                  .value(function getValues(d) {
                    return 100;
                  })
                  .sort(null);

    svgRLV.selectAll('path')
      .data(arcRLVPie(data.rlvbd))
      .enter()
      .append('path')
        .attr('d', d => arcRLV(d))
        .attr('fill', (d, i) => color[i]);

  // line at 240,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 900)
          .attr('cy', 1650)
          .attr('r', yScaleRLV(240000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

// line at 270,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 900)
          .attr('cy', 1650)
          .attr('r', yScaleRLV(270000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

// line at 300,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 900)
          .attr('cy', 1650)
          .attr('r', yScaleRLV(300000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

// line at 330,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 900)
          .attr('cy', 1650)
          .attr('r', yScaleRLV(330000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

  }

  makeRLVPie();

// ~~~~~~~~~~~~~Code for SCV Pie ~~~~~~~~~~~~~~~~~~~~

  function makeSCVPie() {

    const svgSCV = select('.vis-container').append('g')
                  .attr('class', 'arc')
                  .attr('transform', 'translate(2465, 1650)');

    const arcSCV = arc()
                  .innerRadius(0)
                  .outerRadius(function makeRadius(d) {
                    return yScaleSCV(d.data.val);
                  });

    const arcSCVPie = pie()
                  .value(function getValues(d) {
                    return 100;
                  })
                  .sort(null);

    svgSCV.selectAll('path')
        .data(arcSCVPie(data.scvbd))
        .enter()
        .append('path')
          .attr('d', d => arcSCV(d))
          .attr('fill', (d, i) => color[i]);

// line at 500,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 2465)
          .attr('cy', 1650)
          .attr('r', yScaleSCV(500000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

// line at 550,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 2465)
          .attr('cy', 1650)
          .attr('r', yScaleSCV(550000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

// line at 600,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 2465)
          .attr('cy', 1650)
          .attr('r', yScaleSCV(600000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

// line at 650,000
    select('.vis-container').append('g')
        .attr('width', useWidth)
        .attr('height', useHeight)
        .append('circle')
          .attr('class', 'dot')
          .attr('cx', 2465)
          .attr('cy', 1650)
          .attr('r', yScaleSCV(650000))
          .attr('stroke', 'black')
          .attr('stroke-width', '5')
          .attr('fill-opacity', '0')
          .attr('stroke-opacity', '0.55');

  }

  makeSCVPie();

// ~~~~~~~Code for RLV, SCV, and Total Monthly Line Chart ~~~~~

  function makeLineChart() {

    const svgPlot = select('.vis-container').append('g')
                  .attr('transform', 'translate(-150, 2900)');

    svgPlot.selectAll('.dot')
          .data(data.ttvbm)
          .enter().append('circle')
            .attr('class', 'dot)')
            .attr('cx', d => xScaleM(d.month) + (xScaleM.bandwidth() / 2))
            .attr('cy', d => yScaleM(d.val))
            .attr('r', 30)
            .style('fill', '#73D487');

    svgPlot.selectAll('.dot')
          .data(data.scvbm)
          .enter().append('circle')
            .attr('class', 'dot)')
            .attr('cx', d => xScaleM(d.month) + (xScaleM.bandwidth() / 2))
            .attr('cy', d => yScaleM(d.val))
            .attr('r', 30)
            .style('fill', 'rgb(3,80,150)');

    svgPlot.selectAll('.bar')
          .data(data.rlvbm)
          .enter().append('circle')
            .attr('class', 'dot)')
            .attr('cx', d => xScaleM(d.month) + (xScaleM.bandwidth() / 2))
            .attr('cy', d => yScaleM(d.val))
            .attr('r', 30)
            .style('fill', 'red');

    svgPlot.append('g')
      .attr('class', 'axis')
      .style('font-size', '44px')
      .attr('transform', 'translate(0, 1700)')
      .call(axisBottom(xScaleM));

    svgPlot.append('g')
      .attr('class', 'axis')
      .style('font-size', '44px')
      .attr('transform', 'translate(550, 0)')
      .call(axisLeft(yScaleM));

    svgPlot.append('g')
          .append('text')
            .style('font-family', 'helvetica')
            .style('font-size', '108')
            .attr('x', 1730)
            .attr('y', 1900)
            .text('Month');

    svgPlot.append('g')
          .append('text')
            .style('font-family', 'helvetica')
            .style('font-size', '124')
            .attr('x', 430)
            .attr('y', -150)
            .text('Violations by Month');

    svgPlot.append('g')
          .append('text')
            .style('font-family', 'helvetica')
            .style('font-size', '108')
            .attr('x', -1350)
            .attr('y', 300)
            .attr('transform', 'rotate(-90)')
            .text('Number of Violations');

    svgPlot.append('g')
          .append('circle')
            .attr('cx', 2058)
            .attr('cy', -184)
            .attr('r', 20)
            .style('fill', '#73D487');

    svgPlot.append('g')
          .append('text')
            .style('font-family', 'helvetica')
            .style('font-size', '64')
            .attr('x', 1600)
            .attr('y', -165)
            .text('Total Violations');

    svgPlot.append('g')
          .append('circle')
            .attr('cx', 2705)
            .attr('cy', -184)
            .attr('r', 20)
            .style('fill', 'rgb(3,80,150)');

    svgPlot.append('g')
          .append('text')
            .style('font-family', 'helvetica')
            .style('font-size', '64')
            .attr('x', 2110)
            .attr('y', -165)
            .text('Speeding Violations');

    svgPlot.append('g')
          .append('circle')
            .attr('cx', 3360)
            .attr('cy', -184)
            .attr('r', 20)
            .style('fill', 'red');

    svgPlot.append('g')
          .append('text')
            .style('font-family', 'helvetica')
            .style('font-size', '64')
            .attr('x', 2740)
            .attr('y', -165)
            .text('Red Light Violations');

    const lineGenerator = line()
                        .x(function x(d) {
                          return xScaleM(d.month);
                        })
                        .y(function y(d) {
                          return yScaleM(d.val);
                        });

    svgPlot.append('svg:path')
          .attr('d', lineGenerator(data.ttvbm))
          .attr('stroke', '#73D487')
          .attr('stroke-width', 5)
          .attr('fill', 'none')
          .attr('stroke-dasharray', ('10, 10'))
          .attr('transform', 'translate(87, 0)');

    svgPlot.append('svg:path')
          .attr('d', lineGenerator(data.scvbm))
          .attr('stroke', 'rgb(3,80,150)')
          .attr('stroke-width', 5)
          .attr('fill', 'none')
          .attr('stroke-dasharray', ('10, 10'))
          .attr('transform', 'translate(87, 0)');

    svgPlot.append('svg:path')
          .attr('d', lineGenerator(data.rlvbm))
          .attr('stroke', 'red')
          .attr('stroke-width', 5)
          .attr('fill', 'none')
          .attr('stroke-dasharray', ('10, 10'))
          .attr('transform', 'translate(87, 0)');

  }

  makeLineChart();

}
