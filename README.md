# To start the project 
- node server.js

# Structure
- server js (start server)
- controller js (controls routes and there actions)
- service js (contain functions for extracting and manipulate data from log file)

# / returns about routes

# URL for Log Files is /logs
- start_date:
Optional parameter
Show logs above than the mentioned start date
Example: /log?start_date=2010

- end_date:
Optional parameter
Show logs above than the mentioned end date
Example: /log?end_date=2019

- size:
Optional parameter
Show logs above than the mentioned size
Example: /log?size=100

- Filter based on all paramters:
Example: /log?start_date=2010&end_date=2019&size=5
