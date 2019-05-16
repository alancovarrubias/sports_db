import os
import sys
import bs4
from bs4 import BeautifulSoup
import requests
import csv

year = sys.argv[1]
team_abbr = sys.argv[2]
url = f'https://www.baseball-reference.com/teams/{team_abbr}/{year}.shtml'
print(url)
r  = requests.get(url)
data = r.text
soup = BeautifulSoup(data, features='html.parser')
table = soup.find(id='team_batting')
table_rows = table.tbody.find_all('tr')

def player_data(row):
    player_row = row.contents[2]
    if type(player_row) is not bs4.element.NavigableString:
        alias = player_row['data-append-csv']
        last_name, first_name = player_row['csk'].split(',')
        name = f'{first_name} {last_name}'
        return [name, first_name, last_name, alias, team_abbr]

directory = 'tmp/players'
if not os.path.exists(directory):
    os.makedirs(directory)
directory = f'{directory}/{year}'
if not os.path.exists(directory):
    os.makedirs(directory)
with open(f'{directory}/{team_abbr}.csv', 'w') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['name', 'first_name', 'last_name', 'alias', 'team'])
    for row in table_rows:
        data = player_data(row)
        if data:
            writer.writerow(data)

