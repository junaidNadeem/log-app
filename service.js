const fs = require("fs");
const url = require('url');

exports.homeRoute = res => {
    res.write(`
        URL for Log Files is /logs
        Optional parameter (filter show logs above than the mentioned start date) for /log is ?start_date 
        Optional parameter (filter show logs above than the mentioned end date) for /log is ?end_date 
        Optional parameter (filter show logs above than the mentioned size) for /log is ?size 
        Optional parameter (filter All three) for /log is ?start_date&end_date&size 
    `);
    res.end();
};

exports.logsRoute = res => {
    const stream = fs.createReadStream('test.log', {
        start: 0,
        end: 10000,
    });

    stream.on('error', err => {
        res.write(err);
        res.end();
        stream.close();
    });

    stream.on('data', data => {
        res.write(data.toString());
        res.end();
        stream.close();
    });
};

exports.logsRouteWithFilters = (req,res) => {
    const urlObject = url.parse(req.url, true).query;
    const startDate = new Date(urlObject.start_date);
    const endDate = new Date(urlObject.end_date);

    const stream = fs.createReadStream('test.log', {
        start: 0,
        end: 100000,
    });

    stream.on('error', err => {
        res.write(err);
        res.end();
        stream.close();
        return;
    });

    const filterBySize = data => {
        const filteredData = data.toString().split("\n").splice(0,urlObject.size).join("\n");
        res.write(`${filteredData}`);
        res.end();
    };

    const dateFilters = data => {
        let dataArray = data.toString().split("\n");
        if(urlObject.size > 0) {
            dataArray = data.toString().split("\n").splice(0,urlObject.size);
        }
        let startDateFilter = "";
        let endDateFilter = "";
        let totalFilter = "";
        
        dataArray.map(log => {
            const datesInLogFile = new Date(log.substr(0,26));

            if(datesInLogFile.getTime() >= startDate.getTime()) {
                startDateFilter += "\n" + log;
            } 
            if(datesInLogFile.getTime() <= endDate.getTime()) {
                endDateFilter += "\n" + log;
            }
            if((datesInLogFile.getTime() >= startDate.getTime()) && (datesInLogFile.getTime() <= endDate.getTime())) {
                totalFilter += "\n" + log;
            }
        });

        if(totalFilter !== "") {
            return totalFilter;
        }
        if(startDateFilter !== "") {
            return startDateFilter;
        }
        if(endDateFilter !== "") {
            return endDateFilter;
        }
    };

    const filterByDate = data => {
        res.write(dateFilters(data));
        res.end();
    };

    stream.on('data', data => {
        if(startDate == "Invalid Date" && endDate == "Invalid Date" && urlObject.size) {
            filterBySize(data);
            stream.close();
            return;
        }
        if(startDate.getTime() > endDate.getTime()) {
            res.write("start date is greater than end date");
            res.end();
            stream.close();
            return;
        }
        if(startDate != "Invalid Date" || endDate != "Invalid Date") {
            filterByDate(data);
            stream.close();
            return;
        }
    });
};