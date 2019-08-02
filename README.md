## Chicago Traffic Violations

### About
This project was created by Jackson Quinn (Github: jackson-quinn) and I. Our aim was to find whether or not there was any significant correlation between the day of the week / the time of year and traffic violations within the city of Chicago; essentially, we wanted to better understand the behavior of drivers within the city. In our specific visualization, we chose to focus on speeding and red light violations (and their combined total). We acquired our data from the city's website (linked [here](https://data.cityofchicago.org/Transportation) for ease of access). The result of our efforts is an SVG containing our static visualization coded using JavaScript and the D3 library. For those who just want to see the data visualization without setting up their own server, there is also a PDF provided (titled *Visualization PDF*).

### Pre-Processing
The data was downloaded as large CSV files from the City of Chicago data portal - these files can be found inside of our *data_extraction* folder (titled *Red Camera Violations* and *Speeding Camera Violations*). Pre-processing was mainly done using Python and its built in CSV module; each data-row from either of the CSV's was instantiated as a member of a violation class, and in each of these classes methods were written that allowed the month or weekday of a violation to be returned given the violation's corresponding date-time object. Once the full CSV was instantiated into individual violations, we wrote queries that would return dictionaries with either weekday or month keys and the correct corresponding values. The code for this can be found in */data_extraction/new.py*, and the additional CSV's can also be found in the *data_extraction* folder.

### Main Code
A quick summary of the code structure:

*Chicago Vis* contains all code needed for the project.

*/Chicago Vis/app/index.js* is the file which contains all of our JS and D3 making the visualization itself.

*/Chicago Vis/app/index.html* is the file that sets up our initial HTML and where the size of the SVG can be adjusted.

*/Chicago Vis/app/main.css* is where our CSS code is located.

*/Chicago Vis/app/data/example.json* is where our pre-processed data is located in the form of a JSON.

Our method of running our server was using yarn. If yarn is installed on your machine, cd into */Chicago Vis/* and type *yarn install*. Once that finished initializing, type *yarn start*, and the server should start up. It runs by default on port 9966, so if needed open up that port on your browser!