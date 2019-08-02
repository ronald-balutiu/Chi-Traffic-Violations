# Maybe TODO: Pickle the objects for faster loading times

import csv
from datetime import datetime
from datetime import date

RLViolations = []
SCViolations = []

def int_to_day(n):
    days = [
    'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]
    
    return days[n]

def get_month_name(n):
    months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    return months[n - 1]


class RLViolation:
    def __init__(self, address, datestring, violations):
        self.address = address
        self.date = datetime.strptime(datestring, '%m/%d/%Y')
        self.violations = int(violations)

    def weekday(self):
        weekday_int = self.date.weekday()
        return int_to_day(weekday_int)

    def month(self):
        month_int = self.date.month
        return get_month_name(month_int)

class SCViolation:
    def __init__(self, address, datestring, violations):
        self.address = address
        self.date = datetime.strptime(datestring, '%m/%d/%Y')
        self.violations = int(violations)

    def weekday(self):
        dayint = self.date.weekday()
        return int_to_day(dayint)

    def month(self):
        month_int = self.date.month
        return get_month_name(month_int)

def initialize_rl():
    with open('Red_Light_Camera_Violations.csv', 'rt') as data:
        datareader = csv.reader(data, delimiter = ',')
        rownum = 0
        for row in datareader:
            if rownum:
                new = RLViolation(row[2], row[3], row[4])
                RLViolations.append(new)
            rownum += 1

def initialize_sc():
    with open('Speed_Camera_Violations.csv', 'rt') as data:
        datareader = csv.reader(data, delimiter = ',')
        rownum = 0
        for row in datareader:
            if rownum:
                new = SCViolation(row[0], row[2], row[3])
                SCViolations.append(new)
            rownum += 1

initialize_rl()
initialize_sc()

# Put data queries below here
# Use RLViolations and SLViolations arrays for access to data

def violations_by_month():
    rlv_by_month = {}
    scv_by_month = {}
    ttv_by_month = {}
    months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    for month in months:
        rlv_by_month[month] = 0
        scv_by_month[month] = 0

    for v in RLViolations:
        rlv_by_month[v.month()] += v.violations

    for v in SCViolations:
        scv_by_month[v.month()] += v.violations

    for month in months:
        ttv_by_month[month] = rlv_by_month[month] + scv_by_month[month]

    print(rlv_by_month)
    print(scv_by_month)
    print(ttv_by_month)

def violations_by_day():
    rlv_by_day = {}
    scv_by_day = {}
    ttv_by_day = {}
    days = [
    'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

    for day in days:
        rlv_by_day[day] = 0
        scv_by_day[day] = 0

    for v in RLViolations:
        rlv_by_day[v.weekday()] += v.violations

    for v in SCViolations:
        scv_by_day[v.weekday()] += v.violations

    for day in days:
        ttv_by_day[day] = rlv_by_day[day] + scv_by_day[day]

    print(rlv_by_day)
    print(scv_by_day)
    print(ttv_by_day)





# Put data query function calls below here

violations_by_month()
#violations_by_day()