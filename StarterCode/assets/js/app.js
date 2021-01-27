// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 1000;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(Data) {

    // Print the Data
    console.log(Data);
  
    // Cast the healthcare and poverty values to number for each piece of Data
    Data.forEach(function(data) {
      data.healthcare = +data.healthcare*50;
      data.poverty = +data.poverty*50;
    });
  
  // Create scale functions
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(Data, d => d.poverty))
    .range([0, svgWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.healthcare)])
    .range([svgHeight, 0]);


    // Create circles
  var circlesGroup = chartGroup.selectAll("Circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .classed("stateCircle", true)
    //.attr("fill", "blue")
    // .attr("opacity", "0.5");
    // // @TODO

    
// Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append axes to the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${svgHeight}-30)`)
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);
    // Create code to build the scatter plot using the Data.
    // chartGroup.selectAll("#scatter")
    //   .data(Data)
    //   .enter()
    //   .append("circle")
    //   .classed("stateCircle", true)
    //   .attr("cx", (d, i) => d.poverty)
    //   .attr("cy", (d, i) => d.healthcare-svgHeight)
    //   .attr("r", 5);

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
      // .attr("font-family", "sans-serif")
      // .attr("font-size", "10px")
      // .attr("text-anchor", "middle")
      // .attr("fill", "white");
    
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left + 40)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare(%)");
    chartGroup.append("text")
      .attr("y", (svgHeight) -30)
      .attr("x", (svgWidth / 2))
      // .attr("transform", `translate(${svgWidth / 2}, ${svgHeight + chartMargin.top + 30})`)
      // .attr("transform", `translate(0, ${svgHeight - chartMargin.top - chartMargin.bottom})`)
      .attr("transform", `translate(0, ${svgHeight})`)
      .call(bottomAxis)
      .attr("class", "axisText")
      .text("In Poverty (%)");

      // svg.selectAll("text")
      // .data(Data)
      // .enter()
      // .append("text")
      //   .text((d) => (d.healthcare + ", " + d.poverty))
      //   .attr("x", (d) => (d.healthcare + 5))
      //   .attr("y", (d) => (svgHeight - d.poverty));
       
  }).catch(function(error) {
    console.log(error);
  });