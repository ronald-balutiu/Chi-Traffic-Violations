import csv
from datetime import datetime
from datetime import date

# location_dict = {}
# needs_location = []

# with open('Speed_Camera_Violations.csv', 'rt') as data:
# 	datareader = csv.reader(data, delimiter = ',')
# 	rownum = 0
# 	for row in datareader:
# 		if rownum:
# 			address = row[0]
# 			if (not row[8]):
# 				if address not in needs_location:
# 					needs_location.append(address)
# 			location = row[8]
# 			if address not in location_dict and location:
# 				location_dict[address] = location
			
# 		rownum += 1

# print(needs_location)

# rl_occurrences_per_location = {}

# with open('Red_Light_Camera_Violations.csv', 'rt') as data:
#     datareader = csv.reader(data, delimiter = ',')
#     rownum = 0
#     for row in datareader:
#         if rownum:
#             if (not row[9]):
#                 pass
#             else:
#                 if row[0] in rl_occurrences_per_location:
#                     rl_occurrences_per_location[row[0]] += 1
#                 else: 
#                     rl_occurrences_per_location[row[0]] = 1
#          rownum += 1



# print(rl_occurrences_per_location)

violations_per_week_day_rl = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday' : 0
}

violations_per_week_day_sc = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday' : 0
}

def int_to_day(n):
    days = [
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday',
    'Sunday'
    ]
    return days[n]




with open('Red_Light_Camera_Violations.csv', 'rt') as data:
    datareader = csv.reader(data, delimiter = ',')
    rownum = 0
    for row in datareader:
        if rownum:
            if (not row[9]):
                pass
            else:
                datestring = row[3]
                viodate = datetime.strptime(datestring, '%m/%d/%Y')
                weekday = viodate.weekday()
                weekday = int_to_day(weekday) 
                violations_per_week_day_rl[weekday] += int(row[4])
        rownum += 1

with open('Speed_Camera_Violations.csv', 'rt') as data:
    datareader = csv.reader(data, delimiter = ',')
    rownum = 0
    for row in datareader:
        if rownum:
            if (not row[8]):
                pass
            else:
                datestring = row[2]
                viodate = datetime.strptime(datestring, '%m/%d/%Y')
                weekday = viodate.weekday()
                weekday = int_to_day(weekday) 
                violations_per_week_day_sc[weekday] += int(row[3])
        rownum += 1

print(violations_per_week_day_rl)
print(violations_per_week_day_sc)

total_violations = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday' : 0
}

days = [
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday',
    'Sunday'
]

for day in days:
    total_violations[day] = violations_per_week_day_rl[day] + violations_per_week_day_sc[day]

print(total_violations)

