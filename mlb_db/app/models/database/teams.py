import sys
import os
import bs4
from bs4 import BeautifulSoup
import requests
import csv

year = sys.argv[1]
url = f'https://www.baseball-reference.com/leagues/MLB/{year}.shtml'
print(url)
r  = requests.get(url)
data = r.text
soup = BeautifulSoup(data, features='html.parser')
table = soup.find(id='teams_standard_batting')
table_rows = table.tbody.find_all('tr')
table_rows.pop(-1)

def get_name_and_city(title):
    words = title.split(' ')
    two_word_names = ['Jays', 'Sox']
    if words[-1] in two_word_names:
        name = ' '.join(words[-2:])
        city = ' '.join(words[:-2])
        return name, city
    else:
        name = words[-1]
        city = ' '.join(words[:-1])
        return name, city

def team_data(row):
    team_row = row.contents[0].contents[0]
    print(team_row)
    abbr = team_row.text
    alt_abbrs = {
        'CHC': 'CHN',
        'CHW': 'CHA',
        'KCR': 'KCA',
        'LAA': 'ANA',
        'LAD': 'LAN',
        'NYM': 'NYN',
        'NYY': 'NYA',
        'SDP': 'SDN',
        'SFG': 'SFN',
        'STL': 'SLN',
        'TBR': 'TBA',
        'WSN': 'WAS'
    }
    if abbr in alt_abbrs:
        alt_abbr = alt_abbrs[abbr]
    else:
        alt_abbr = abbr
    title = team_row['title']
    name, city = get_name_and_city(title)
    return [name, city, abbr, alt_abbr]

directory = 'tmp/teams'
if not os.path.exists(directory):
    os.makedirs(directory)
with open(f'{directory}/{year}.csv', 'w') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(['name', 'city', 'abbr', 'alt_abbr'])
    for row in table_rows:
        data = team_data(row)
        writer.writerow(data)
