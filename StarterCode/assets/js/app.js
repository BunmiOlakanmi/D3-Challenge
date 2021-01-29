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

// function used for updating x-scale var upon click on axis label
function xScale(Data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(Data, d => d[chosenXAxis]) * 0.8,
      d3.max(Data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, chartWidth]);
  return xLinearScale;
}

// function used for updating y-scale var upon click on axis label
function yScale(Data, chosenYAxis) {
  // create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(Data, d => d[chosenYAxis]) * 0.8,
    d3.max(Data, d => d[chosenYAxis]) * 1.2
    ])
    .range([chartHeight, 0]);
  return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);
  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
  return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);
  yAxis.transition()
    .duration(1000)
    .call(leftAxis);
  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));
  return circlesGroup;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newYScale, chosenYAxis) {
  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));
  return circlesGroup;
}

// function used for updating circles group for x-axis with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
  var label;
  if (chosenXAxis === "poverty") {
    label = "In Poverty (%)";
  }
  else if(chosenXAxis === "age"){
    label = "Age (Median)";
  }
  else {
    label = "Household Income (Median)";
  }
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${d.abbr} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// function used for updating circles group for y-axis with new tooltip
function updateToolTip(chosenYAxis, circlesGroup) {
  var label;
  if (chosenYAxis === "healthcare") {
    label = "Lacks Healthcare (%)";
  }
  else if(chosenYAxis === "smokes"){
    label = "Smokes(%)";
  }
  else {
    label = "Obese(%)";
  }
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`${d.state}<br>${d.abbr} ${d[chosenYAxis]}`);
  });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
  // onmouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });

return circlesGroup;
}




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
  
  // Create x and y scale functions
  var xLinearScale = xScale(Data, chosenXAxis);
  var yLinearScale = yScale(Data, chosenYAxis);

  // Create scale functions
  // var xLinearScale = d3.scaleLinear()
  //   .domain([0, (d3.max(Data, d => d.poverty))])
  //   .range([0, chartWidth]);

  // var yLinearScale = d3.scaleLinear()
  // .domain([0, (d3.max(Data, d => d.healthcare))])
  // // .domain([0, d3.max(Data, d => d.healthcare)])
  //   .range([chartHeight, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 15)
    .classed("stateCircle", true)
    .attr("stroke-chartWidth", true);

    
  var circleLabels = chartGroup.selectAll(null).data(Data).enter().append("text");
    // circleLabels
    //   .attr("x", function(d) {
    //     return xLinearScale(chosenYAxis);
    //     })
    //     .attr("y", function(d) {
    //       return yLinearScale(chosenYAxis);
    //     })
    //     circleLabels.text(function(d) {
    //       return d.abbr;
    //     })
    //     .classed("stateText", true)

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

  var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty(%)");

  var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");

  var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");

  // append y axis
  var healthcareLabel = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left+40)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare (%)");
  
  var smokesLabel = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left + 20)
    .attr("x", 0 - (chartHeight / 2)+20)
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Smokes(%)");

  var obeseLabel = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left)
    .attr("x", 0 - (chartHeight / 2)+20)
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Obese(%)");
// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

// x axis labels event listener
labelsGroup.selectAll("text")
  .on("click", function() {
  // get value of selection
  var value = d3.select(this).attr("value");
  if (value !== chosenXAxis) {
    // replaces chosenXAxis with value
    chosenXAxis = value;
    
    // console.log(chosenXAxis)

    // functions here found above csv import
    // updates x scale for new data
    xLinearScale = xScale(Data, chosenXAxis);

    // updates x axis with transition
    xAxis = renderAxes(xLinearScale, xAxis);

    // updates circles with new x values
    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

    // updates tooltips with new info
    circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // changes classes to change bold text for x-axis
    if (chosenXAxis === "poverty") {
      povertyLabel
        .classed("active", true)
        .classed("inactive", false);
      ageLabel
        .classed("active", false)
        .classed("inactive", true);
      incomeLabel
        .classed("active", false)
        .classed("inactive", true);
      circleLabels.text(function(d) {
        return "abbr";
      })
        .classed("stateText", true)
    }
    else if (chosenXAxis === "age") {
      ageLabel
        .classed("active", true)
        .classed("inactive", false);
      povertyLabel
        .classed("active", false)
        .classed("inactive", true);
      incomeLabel
        .classed("active", false)
        .classed("inactive", true);
      circleLabels.text(function(d) {
        return "abbr";
      })
        .classed("stateText", true)
    }
    else {
      incomeLabel
        .classed("active", true)
        .classed("inactive", false);
      ageLabel
        .classed("active", false)
        .classed("inactive", true);
      povertyLabel
        .classed("active", false)
        .classed("inactive", true);
      circleLabels.text(function(d) {
        return "abbr";
      })
        .classed("stateText", true)
    }
  }

// changes classes to change bold text for y-axis
if (chosenYAxis === "healthcare") {
  healthcareLabel
    .classed("active", true)
    .classed("inactive", false);
  smokesLabel
    .classed("active", false)
    .classed("inactive", true);
  obeseLabel
    .classed("active", false)
    .classed("inactive", true);
}
else if (chosenYAxis === "smokes") {
  smokesLabel
    .classed("active", true)
    .classed("inactive", false);
  healthcareLabel
    .classed("active", false)
    .classed("inactive", true);
  obeseLabel
    .classed("active", false)
    .classed("inactive", true);
}
else {
  obeseLabel
    .classed("active", true)
    .classed("inactive", false);
  healthcareLabel
    .classed("active", false)
    .classed("inactive", true);
  smokesLabel
    .classed("active", false)
    .classed("inactive", true);
}

});
}).catch(function(error) {
  console.log(error);
});



//   // Create circles
//   var circlesGroup = chartGroup.selectAll("Circle")
//     .data(Data)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", "15")
//     .attr("stroke-chartWidth", true)
//     .classed("stateCircle", true)
    
// // Create axis functions
// var bottomAxis = d3.axisBottom(xLinearScale);
// var leftAxis = d3.axisLeft(yLinearScale);

// // Append axes to the chart
// chartGroup.append("g")
//   .attr("transform", `translate(0, ${chartHeight})`)
//   .call(bottomAxis);

// chartGroup.append("g")
//   .call(leftAxis);
//     var circleLabels = chartGroup.selectAll(null).data(Data).enter().append("text");

//     circleLabels
//       .attr("x", function(d) {
//         return xLinearScale(d.poverty);
//       })
//       .attr("y", function(d) {
//         return yLinearScale(d.healthcare);
//       })
//       .text(function(d) {
//         return d.abbr;
//       })
//       .classed("stateText", true)
       
//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - chartMargin.left)
//       .attr("x", 0 - (chartHeight / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Lacks Healthcare(%)");
//       //.text("Smokes (%)")
//       //.text("Obese(%")
//     chartGroup.append("text")
//        .attr("transform", `translate(${chartWidth/2}, ${chartHeight + chartMargin.top -10})`)
//       .attr("class", "axisText")
//       .text("In Poverty (%)")
//       //.text("Age (Median")
//       //.text("Household Income (Median)");
  

//   var toolTip = d3.tip()
//     .attr("class", "d3-tip")
//     .offset([80, -70])
//     .style("position", "absolute")
//     .style("pointer-events", "none")
//     .html(function(d) {
//       return (`${d.state}<br>Population In Poverty (%): ${d.poverty}<br>Lacks Healthcare (%): ${d.healthcare}`)
//     });      

//     chartGroup.call(toolTip);   
    
//   // Add an onmouseover event to display a tooltip   
//     circlesGroup.on("mouseover", function(data) {
//         toolTip.show(data, this);
//     })

//   // Add an on mouseout    
//     .on("mouseout", function(data) {
//         toolTip.hide(data);
//     });

  