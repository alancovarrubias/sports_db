import sys
import os
import bs4
from bs4 import BeautifulSoup
import requests
import re
import csv

away_team_name = sys.argv[1]
away_team_city = sys.argv[2]
away_team_abbr = sys.argv[3]
home_team_name = sys.argv[4]
home_team_city = sys.argv[5]
home_team_abbr = sys.argv[6]
game_id = sys.argv[7]

def get_css(team_name, team_city, stat_type):
    return f'{team_city}{team_name}{stat_type}'

def get_rows(soup, team_name, team_city, stat_type):
    css = get_css(team_name, team_city, stat_type)
    return soup.find(id=css).tbody.find_all('tr')

def convert_type(element):
    text = element.getText()
    if not text:
        return 0
    elif text == "inf":
        return 0
    elif '.' in text:
        return float(text)
    else:
        return int(text)

def pitching_data(venue, rows, writer):
    writer.writerow(['model', 'stat_type', 'venue', 'IP','H','R','ER','BB', 'SO', 'HR','ERA'])
    for row in rows:
        contents = row.contents
        text = contents[0].getText()
        win = ' W ' in text
        loss = ' L ' in text
        link = contents[0].contents[0]
        name = link.getText()
        alias = re.match('.*(?=\.shtm)', link['href']).group()
        alias = alias[alias.rfind('/')+1:]
        def get_value(index):
            return convert_type(contents[index])
        data = list(map(get_value, range(1, 9)))
        names = [alias, 'PITCHER', venue]
        writer.writerow(names + data)

def batting_data(venue, rows, writer):
    writer.writerow(['model', 'stat_type', 'venue', 'AB','R','H','RBI','BB','SO','PA','BA','OBP','SLG','OPS'])
    for row in rows:
        contents = row.contents
        player_data = contents[0].contents
        if not player_data:
            continue
        link_type = type(player_data[0])
        if link_type is bs4.element.Tag:
            link = player_data[0]
        elif link_type is bs4.element.NavigableString:
            link = player_data[1]
        name = link.getText()
        alias = re.match('.*(?=\.shtm)', link['href']).group()
        alias = alias[alias.rfind('/')+1:]
        def get_value(index):
            return convert_type(contents[index])
        data = list(map(get_value, range(1, 11)))
        names = [alias, 'BATTER', venue]
        writer.writerow(names + data)

url = f'https://www.baseball-reference.com/boxes/{home_team_abbr}/{game_id}.shtml'
print(url)
r  = requests.get(url)
data = r.text
data = re.sub('<!--|-->', '', data)
soup = BeautifulSoup(data, features='html.parser')

directory = 'tmp/stats'
if not os.path.exists(directory):
    os.makedirs(directory)
directory = f'{directory}/{game_id}'
if not os.path.exists(directory):
    os.makedirs(directory)

with open(f'{directory}/away_batting.csv', 'w') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    home_batting_rows = get_rows(soup, away_team_name, away_team_city, 'batting')
    batting_data('AWAY', home_batting_rows, writer)

with open(f'{directory}/away_pitching.csv', 'w') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    home_pitching_rows = get_rows(soup, away_team_name, away_team_city, 'pitching')
    pitching_data('AWAY', home_pitching_rows, writer)

with open(f'{directory}/home_batting.csv', 'w') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    away_batting_rows = get_rows(soup, home_team_name, home_team_city, 'batting')
    batting_data('HOME', away_batting_rows, writer)

with open(f'{directory}/home_pitching.csv', 'w') as f:
    writer = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    away_pitching_rows = get_rows(soup, home_team_name, home_team_city, 'pitching')
    pitching_data('HOME', away_pitching_rows, writer)

