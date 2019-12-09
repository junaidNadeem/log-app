# To start the project 
- node server.js

# Structure
- server js (start server)
- controller js (controls routes and there actions)
- service js (contain functions for extracting and manipulate data from log file)

# / returns about routes

# URL for Log Files is /logs
- Optional parameter (filter show logs above than the mentioned start date) for /log is ?start_date 
Example: /log?start_date=2010
- Optional parameter (filter show logs above than the mentioned end date) for /log is ?end_date 
Example: /log?end_date=2019
- Optional parameter (filter show logs above than the mentioned size) for /log is ?size 
Example: /log?size=100
- Optional parameter (filter All three) for /log is ?start_date&end_date&size 
Example: /log?start_date=2010&end_date=2019&size=5