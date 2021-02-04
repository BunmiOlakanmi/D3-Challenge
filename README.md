# D3 Homework - Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/), but you are free to investigate a different data set. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

### Before You Begin

1. Create a new repository for this project called `D3-Challenge`. **Do not add this homework to an existing repository**.

2. Clone the new repository to your computer.

3. Inside your local git repository, create a directory for the D3 challenge. Use the folder name to correspond to the challenge: **D3_data_journalism**.

4. This homework utilizes both **html** and **Javascript** so be sure to add all the necessary files. These will be the main files to run for analysis.

5. Push the above changes to GitHub or GitLab.

## Task

### Core Assignment: D3 Dabbler (Required Assignment)

![4-scatter](Images/4-scatter.jpg)

I created a scatter plot between two of the data variables such as `Healthcare vs. Poverty`, pulling data from `data.csv` by using the `d3.csv` function.

* I included state abbreviations in the circles (of the scatter plot).

* I created and situated axes and labels to the left and bottom of the chart.

* Note: I use `python -m http.server` to run the visualization, and the page is hosted at `localhost:8000` in the web browser.

- - -

### Bonus: Impress the Boss (Optional Assignment)

Why make a static graphic when D3 lets you interact with your data?

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

I attempted the bonus part, and the JavaScript file is named "app2.js". I placed additional labels on both left and bottom axes of the scatter plots. There is click event on the bottom axis, so users can decide on which data to display. However, the click event on the left axis is currently not functioning. So, users can only view data for healthcare vs. poverty, healthcare vs. age and healthcare vs. income.

#### 2. Incorporate d3-tip

I added tooltips to the circles, and each tooltip is displayed with the data that the user has selected.

![8-tooltip](Images/8-tooltip.gif)
