# Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Description

Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the challenge is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/), but you are free to investigate a different data set. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

### Tools used in this project
1.  JavaScript libraries
    * D3
    * Plotly
2.  HTML
3.  CSS
4.  Visual studio code

## Instructions

### Steps
There are two stages in this project. 

Stage 1: 
  * I created a scatter plot between two of the data variables such as `Healthcare vs. Poverty`, pulling data from `data.csv` by using the `d3.csv` function.
  * I included state abbreviations in the circles (of the scatter plot).
  * I created and situated axes and labels to the left and bottom of the chart.
           ![4-scatter](Images/4-scatter.jpg)

    
Stage 2:   
  * I placed additional labels on both left and bottom axes of the scatter plots. There is click event on the bottom axis, so users can decide on which data to display. Users can view data for healthcare vs. poverty, healthcare vs. age and healthcare vs. income.
  ![7-animated-scatter](Images/7-animated-scatter.gif)
  * I added tooltips to the circles, and each tooltip is displayed with the data that the user has selected.
    ![8-tooltip](Images/8-tooltip.gif)
### Files used in the project
1. `StarterCode` folder contains the `index.html` file and the `assets` that houses all the codes used in the project.
2. `index.html` is the html file that renders the visualization on the web browser.
3. `assets` folder contains `css`, `data` and `js` folders.
4. `css` folder contains the stylesheets used to add style and aesthetics to our webpage.
5. `data` folder contains `data.csv` file, which was used in our analysis and for loading the charts.
6. `js` folder contains two JavaScript files `app.js` and `app2.js`.
7. `app.js` is used to run the stage 1 of this project, while `app2.js` is used to execute stage 2 of this project.

* Note: I use `python -m http.server` to run the visualization, and the page is hosted at `localhost:8000` in the web browser.
