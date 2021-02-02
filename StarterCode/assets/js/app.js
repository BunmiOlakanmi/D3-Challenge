// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 700;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 40,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";


// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(Data) {
// Print the Data
  //console.log(Data);
  
// Cast the healthcare and poverty values to number for each piece of Data
  Data.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;
    data.smokes = +data.smokes;
    data.obese = +data.obese;
  });
  
  // Create scale functions
  var xLinearScale = d3.scaleLinear()
    .domain([0, (d3.max(Data, d => d.poverty))])
    .range([0, chartWidth]);

  var yLinearScale = d3.scaleLinear()
  .domain([0, (d3.max(Data, d => d.healthcare))])
  // .domain([0, d3.max(Data, d => d.healthcare)])
    .range([chartHeight, 0]);

  // Create circles
  var circlesGroup = chartGroup.selectAll("Circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("stroke-chartWidth", true)
    .classed("stateCircle", true)
    
// Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append axes to the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);
    var circleLabels = chartGroup.selectAll(null).data(Data).enter().append("text");

    circleLabels
      .attr("x", function(d) {
        return xLinearScale(d.poverty);
      })
      .attr("y", function(d) {
        return yLinearScale(d.healthcare);
      })
      .text(function(d) {
        return d.abbr;
      })
      .classed("stateText", true)
       
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare(%)");
      //.text("Smokes (%)")
      //.text("Obese(%")
    chartGroup.append("text")
       .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.top -10})`)
      .attr("class", "axisText")
      .text("In Poverty (%)")
      //.text("Age (Median")
      //.text("Household Income (Median)");
  

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -70])
    .style("position", "absolute")
    .style("pointer-events", "none")
    .html(function(d) {
      return (`${d.state}<br>Population In Poverty (%): ${d.poverty}<br>Lacks Healthcare (%): ${d.healthcare}`)
    });      

    chartGroup.call(toolTip);   
    
  // Add an onmouseover event to display a tooltip   
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
        //toolTip.classed("d3-tip", true);
    })

  // Add an on mouseout    
    .on("mouseout", function(data) {
        toolTip.hide(data)
        .duration(10000);
    });

  }).catch(function(error) {
    console.log(error);
  });

