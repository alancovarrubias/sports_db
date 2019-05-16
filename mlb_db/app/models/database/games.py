import sys
import bs4
from bs4 import BeautifulSoup
import requests
import re
import os
import csv

year = sys.argv[1]
home_team = sys.argv[2]
url = f'https://www.baseball-reference.com/teams/{home_team}/{year}-schedule-scores.shtml'
print(url)
r  = requests.get(url)
data = r.text
soup = BeautifulSoup(data, features='html.parser')
table = soup.find(id='team_schedule')
table_rows = table.tbody.find_all('tr')

def game_data(row):
    game_row = row.contents
    if (game_row[1].name == 'td'):
        is_home = len(game_row[4].getText()) == 0
        if (is_home):
            date_string = game_row[1].getText()
            num = 0
            if '(' in date_string:
                num = int(re.search('\(\d\)', date_string).group()[1])
            date = game_row[1]['csk']
            away_team = game_row[5].getText()
            return [date, away_team, home_team, num]

directory = 'tmp/games'
if not os.path.exists(directory):
    os.makedirs(directory)
directory = f'{directory}/{year}'
if not os.path.exists(directory):
    os.makedirs(directory)
with open(f'{directory}/{home_team}.csv', 'w') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['date', 'away_team', 'home_team', 'num'])
    for row in table_rows:
        data = game_data(row)
        if data:
            writer.writerow(data)

