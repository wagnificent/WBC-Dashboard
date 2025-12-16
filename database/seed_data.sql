-- Sample data for Wooden Bat Classic Dashboard

-- Insert teams
INSERT OR IGNORE INTO teams (team_name) VALUES
('Red Sox'),
('Cubs'),
('Dodgers'),
('Braves'),
('Astros'),
('Mets'),
('White Sox'),
('Yankees'),
('Cardinals'),
('Giants'),
('Phillies'),
('Rangers'),
('Nationals'),
('Tigers'),
('Rays'),
('Brewers'),
('Padres'),
('Marlins'),
('Athletics'),
('Pirates'),
('Royals'),
('Indians');

-- Insert players for Red Sox
INSERT OR IGNORE INTO players (first_name, last_name, position, jersey_number) VALUES
('John', 'Smith', 'Pitcher', 15),
('Mike', 'Johnson', 'Catcher', 22),
('David', 'Wilson', 'First Base', 8),
('Robert', 'Brown', 'Second Base', 12),
('James', 'Davis', 'Third Base', 18),
('Michael', 'Miller', 'Shortstop', 7),
('William', 'Moore', 'Left Field', 24),
('Richard', 'Taylor', 'Center Field', 3),
('Joseph', 'Anderson', 'Right Field', 19),
('Thomas', 'Thomas', 'Designated Hitter', 11);

-- Insert players for Cubs
INSERT OR IGNORE INTO players (first_name, last_name, position, jersey_number) VALUES
('Charles', 'Jackson', 'Pitcher', 27),
('Daniel', 'White', 'Catcher', 5),
('Matthew', 'Harris', 'First Base', 14),
('Anthony', 'Martin', 'Second Base', 9),
('Mark', 'Thompson', 'Third Base', 21),
('Donald', 'Garcia', 'Shortstop', 2),
('Steven', 'Martinez', 'Left Field', 17),
('Paul', 'Robinson', 'Center Field', 28),
('Kenneth', 'Clark', 'Right Field', 6),
('George', 'Rodriguez', 'Designated Hitter', 25);

-- Insert players for Dodgers
INSERT OR IGNORE INTO players (first_name, last_name, position, jersey_number) VALUES
('Edward', 'Lewis', 'Pitcher', 30),
('Brian', 'Lee', 'Catcher', 4),
('Ronald', 'Walker', 'First Base', 16),
('Timothy', 'Hall', 'Second Base', 10),
('Jason', 'Allen', 'Third Base', 23),
('Jeffrey', 'Young', 'Shortstop', 1),
('Ryan', 'Hernandez', 'Left Field', 20),
('Jacob', 'King', 'Center Field', 13),
('Gary', 'Wright', 'Right Field', 26),
('Nicholas', 'Lopez', 'Designated Hitter', 31);

-- Insert players for Braves
INSERT OR IGNORE INTO players (first_name, last_name, position, jersey_number) VALUES
('Eric', 'Hill', 'Pitcher', 29),
('Stephen', 'Scott', 'Catcher', 32),
('Jonathan', 'Green', 'First Base', 3),
('Andrew', 'Adams', 'Second Base', 18),
('Justin', 'Baker', 'Third Base', 7),
('Brandon', 'Nelson', 'Shortstop', 22),
('Adam', 'Carter', 'Left Field', 15),
('Gregory', 'Mitchell', 'Center Field', 9),
('Christopher', 'Perez', 'Right Field', 12),
('Patrick', 'Roberts', 'Designated Hitter', 27);

-- Insert players for Astros
INSERT OR IGNORE INTO players (first_name, last_name, position, jersey_number) VALUES
('Daniel', 'Turner', 'Pitcher', 34),
('Matthew', 'Phillips', 'Catcher', 8),
('Andrew', 'Campbell', 'First Base', 19),
('Joshua', 'Parker', 'Second Base', 4),
('Kevin', 'Evans', 'Third Base', 25),
('Thomas', 'Edwards', 'Shortstop', 1),
('Mark', 'Collins', 'Left Field', 14),
('Anthony', 'Stewart', 'Center Field', 28),
('Brian', 'Sanchez', 'Right Field', 11),
('Jason', 'Morris', 'Designated Hitter', 30);

-- Insert players for Mets
INSERT OR IGNORE INTO players (first_name, last_name, position, jersey_number) VALUES
('David', 'Rogers', 'Pitcher', 17),
('Robert', 'Reed', 'Catcher', 6),
('Michael', 'Cook', 'First Base', 21),
('William', 'Morgan', 'Second Base', 3),
('Richard', 'Bell', 'Third Base', 18),
('Joseph', 'Murphy', 'Shortstop', 9),
('Thomas', 'Bailey', 'Left Field', 24),
('Charles', 'Rivera', 'Center Field', 2),
('Daniel', 'Cooper', 'Right Field', 15),
('Matthew', 'Richardson', 'Designated Hitter', 27);

-- Insert players for White Sox
INSERT OR IGNORE INTO players (first_name, last_name, position, jersey_number) VALUES
('Christopher', 'Cox', 'Pitcher', 31),
('Joseph', 'Howard', 'Catcher', 12),
('Brian', 'Ward', 'First Base', 5),
('Kevin', 'Torres', 'Second Base', 19),
('Jason', 'Peterson', 'Third Base', 8),
('Timothy', 'Gray', 'Shortstop', 23),
('Ryan', 'Ramirez', 'Left Field', 16),
('Jacob', 'James', 'Center Field', 4),
('Gary', 'Watson', 'Right Field', 28),
('Nicholas', 'Brooks', 'Designated Hitter', 11);

-- Assign players to teams (Red Sox)
INSERT OR IGNORE INTO team_players (team_id, player_id)
SELECT t.team_id, p.player_id
FROM teams t, players p
WHERE t.team_name = 'Red Sox'
AND ((p.first_name = 'John' AND p.last_name = 'Smith')
OR (p.first_name = 'Mike' AND p.last_name = 'Johnson')
OR (p.first_name = 'David' AND p.last_name = 'Wilson')
OR (p.first_name = 'Robert' AND p.last_name = 'Brown')
OR (p.first_name = 'James' AND p.last_name = 'Davis')
OR (p.first_name = 'Michael' AND p.last_name = 'Miller')
OR (p.first_name = 'William' AND p.last_name = 'Moore')
OR (p.first_name = 'Richard' AND p.last_name = 'Taylor')
OR (p.first_name = 'Joseph' AND p.last_name = 'Anderson')
OR (p.first_name = 'Thomas' AND p.last_name = 'Thomas'));

-- Assign players to teams (Cubs)
INSERT OR IGNORE INTO team_players (team_id, player_id)
SELECT t.team_id, p.player_id
FROM teams t, players p
WHERE t.team_name = 'Cubs'
AND ((p.first_name = 'Charles' AND p.last_name = 'Jackson')
OR (p.first_name = 'Daniel' AND p.last_name = 'White')
OR (p.first_name = 'Matthew' AND p.last_name = 'Harris')
OR (p.first_name = 'Anthony' AND p.last_name = 'Martin')
OR (p.first_name = 'Mark' AND p.last_name = 'Thompson')
OR (p.first_name = 'Donald' AND p.last_name = 'Garcia')
OR (p.first_name = 'Steven' AND p.last_name = 'Martinez')
OR (p.first_name = 'Paul' AND p.last_name = 'Robinson')
OR (p.first_name = 'Kenneth' AND p.last_name = 'Clark')
OR (p.first_name = 'George' AND p.last_name = 'Rodriguez'));

-- Assign players to teams (Dodgers)
INSERT OR IGNORE INTO team_players (team_id, player_id)
SELECT t.team_id, p.player_id
FROM teams t, players p
WHERE t.team_name = 'Dodgers'
AND ((p.first_name = 'Edward' AND p.last_name = 'Lewis')
OR (p.first_name = 'Brian' AND p.last_name = 'Lee')
OR (p.first_name = 'Ronald' AND p.last_name = 'Walker')
OR (p.first_name = 'Timothy' AND p.last_name = 'Hall')
OR (p.first_name = 'Jason' AND p.last_name = 'Allen')
OR (p.first_name = 'Jeffrey' AND p.last_name = 'Young')
OR (p.first_name = 'Ryan' AND p.last_name = 'Hernandez')
OR (p.first_name = 'Jacob' AND p.last_name = 'King')
OR (p.first_name = 'Gary' AND p.last_name = 'Wright')
OR (p.first_name = 'Nicholas' AND p.last_name = 'Lopez'));

-- Assign players to teams (Braves)
INSERT OR IGNORE INTO team_players (team_id, player_id)
SELECT t.team_id, p.player_id
FROM teams t, players p
WHERE t.team_name = 'Braves'
AND ((p.first_name = 'Eric' AND p.last_name = 'Hill')
OR (p.first_name = 'Stephen' AND p.last_name = 'Scott')
OR (p.first_name = 'Jonathan' AND p.last_name = 'Green')
OR (p.first_name = 'Andrew' AND p.last_name = 'Adams')
OR (p.first_name = 'Justin' AND p.last_name = 'Baker')
OR (p.first_name = 'Brandon' AND p.last_name = 'Nelson')
OR (p.first_name = 'Adam' AND p.last_name = 'Carter')
OR (p.first_name = 'Gregory' AND p.last_name = 'Mitchell')
OR (p.first_name = 'Christopher' AND p.last_name = 'Perez')
OR (p.first_name = 'Patrick' AND p.last_name = 'Roberts'));

-- Assign players to teams (Astros)
INSERT OR IGNORE INTO team_players (team_id, player_id)
SELECT t.team_id, p.player_id
FROM teams t, players p
WHERE t.team_name = 'Astros'
AND ((p.first_name = 'Daniel' AND p.last_name = 'Turner')
OR (p.first_name = 'Matthew' AND p.last_name = 'Phillips')
OR (p.first_name = 'Andrew' AND p.last_name = 'Campbell')
OR (p.first_name = 'Joshua' AND p.last_name = 'Parker')
OR (p.first_name = 'Kevin' AND p.last_name = 'Evans')
OR (p.first_name = 'Thomas' AND p.last_name = 'Edwards')
OR (p.first_name = 'Mark' AND p.last_name = 'Collins')
OR (p.first_name = 'Anthony' AND p.last_name = 'Stewart')
OR (p.first_name = 'Brian' AND p.last_name = 'Sanchez')
OR (p.first_name = 'Jason' AND p.last_name = 'Morris'));

-- Assign players to teams (Mets)
INSERT OR IGNORE INTO team_players (team_id, player_id)
SELECT t.team_id, p.player_id
FROM teams t, players p
WHERE t.team_name = 'Mets'
AND ((p.first_name = 'David' AND p.last_name = 'Rogers')
OR (p.first_name = 'Robert' AND p.last_name = 'Reed')
OR (p.first_name = 'Michael' AND p.last_name = 'Cook')
OR (p.first_name = 'William' AND p.last_name = 'Morgan')
OR (p.first_name = 'Richard' AND p.last_name = 'Bell')
OR (p.first_name = 'Joseph' AND p.last_name = 'Murphy')
OR (p.first_name = 'Thomas' AND p.last_name = 'Bailey')
OR (p.first_name = 'Charles' AND p.last_name = 'Rivera')
OR (p.first_name = 'Daniel' AND p.last_name = 'Cooper')
OR (p.first_name = 'Matthew' AND p.last_name = 'Richardson'));

-- Assign players to teams (White Sox)
INSERT OR IGNORE INTO team_players (team_id, player_id)
SELECT t.team_id, p.player_id
FROM teams t, players p
WHERE t.team_name = 'White Sox'
AND ((p.first_name = 'Christopher' AND p.last_name = 'Cox')
OR (p.first_name = 'Joseph' AND p.last_name = 'Howard')
OR (p.first_name = 'Brian' AND p.last_name = 'Ward')
OR (p.first_name = 'Kevin' AND p.last_name = 'Torres')
OR (p.first_name = 'Jason' AND p.last_name = 'Peterson')
OR (p.first_name = 'Timothy' AND p.last_name = 'Gray')
OR (p.first_name = 'Ryan' AND p.last_name = 'Ramirez')
OR (p.first_name = 'Jacob' AND p.last_name = 'James')
OR (p.first_name = 'Gary' AND p.last_name = 'Watson')
OR (p.first_name = 'Nicholas' AND p.last_name = 'Brooks'));

-- Insert game data (Day 1 - June 15, 2023)
INSERT OR IGNORE INTO games (date, time, team_id, opponent_id, field_name, location, result)
SELECT
    '2023-06-15', '08:00',
    (SELECT team_id FROM teams WHERE team_name = 'Red Sox'),
    (SELECT team_id FROM teams WHERE team_name = 'Yankees'),
    'Field 1', 'Boston Stadium', 'Win'
UNION ALL
SELECT
    '2023-06-15', '08:00',
    (SELECT team_id FROM teams WHERE team_name = 'Cubs'),
    (SELECT team_id FROM teams WHERE team_name = 'Cardinals'),
    'Field 2', 'Chicago Park', 'Loss'
UNION ALL
SELECT
    '2023-06-15', '08:00',
    (SELECT team_id FROM teams WHERE team_name = 'Dodgers'),
    (SELECT team_id FROM teams WHERE team_name = 'Giants'),
    'Field 3', 'Los Angeles Arena', 'Win'
UNION ALL
SELECT
    '2023-06-15', '08:00',
    (SELECT team_id FROM teams WHERE team_name = 'Braves'),
    (SELECT team_id FROM teams WHERE team_name = 'Phillies'),
    'Field 4', 'Atlanta Stadium', 'Win'
UNION ALL
SELECT
    '2023-06-15', '08:00',
    (SELECT team_id FROM teams WHERE team_name = 'Astros'),
    (SELECT team_id FROM teams WHERE team_name = 'Rangers'),
    'Field 5', 'Houston Park', 'Loss'
UNION ALL
SELECT
    '2023-06-15', '08:00',
    (SELECT team_id FROM teams WHERE team_name = 'Mets'),
    (SELECT team_id FROM teams WHERE team_name = 'Nationals'),
    'Field 6', 'New York Arena', 'Win'
UNION ALL
SELECT
    '2023-06-15', '08:00',
    (SELECT team_id FROM teams WHERE team_name = 'White Sox'),
    (SELECT team_id FROM teams WHERE team_name = 'Tigers'),
    'Field 7', 'Chicago Stadium', 'Loss';

-- Continue with more game data...
-- (Note: In a real implementation, you would include all the game data from the original dataset)
-- This is a sample showing the pattern for inserting game data
