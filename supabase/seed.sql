-- Populează baza cu datele demo din src/data/, ca punct de plecare.
-- Rulează după schema.sql. Poți șterge tot și lăsa scraper-ul să scrie.

insert into public.matches
  (id, competition, round, kickoff, venue, home_name, home_short, home_crest,
   away_name, away_short, away_crest, home_score, away_score, report)
values
  ('m-01','lnm','Etapa 1','2026-08-01T19:00:00+03:00','Base Camp Arena',
   'FC Base Camp','BSC','/img/crest.svg','United Craiova','UCR','/img/crest-1.svg',5,2,
   'Start perfect în Seria C, cu trei goluri în ultimele opt minute.'),
  ('m-06','cupa','16-imi de finală','2026-08-19T20:00:00+03:00','Base Camp Arena',
   'FC Base Camp','BSC','/img/crest.svg','Speed Deva','SPD','/img/crest-2.svg',4,3,
   'Calificare în optimi după un gol în ultimul minut al prelungirilor.'),
  ('m-10','lnm','Etapa 4','2026-09-05T19:30:00+03:00','Arena Bega, Timișoara',
   'Fair Play Timișoara','FPT','/img/crest-4.svg','FC Base Camp','BSC','/img/crest.svg',null,null,null)
on conflict (id) do update set
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  report     = excluded.report;

insert into public.standings
  (competition, phase, position, team, short, played, won, drawn, lost,
   goals_for, goals_against, points, form)
values
  ('lnm','regular',1,'Real Sighișoara','RSG',3,3,0,0,14,6,9,'{V,V,V}'),
  ('lnm','regular',2,'FC Base Camp','BSC',3,2,0,1,13,9,6,'{V,Î,V}'),
  ('lnm','regular',3,'Atletic Sibiu','ATS',3,2,0,1,11,8,6,'{Î,V,V}')
on conflict (competition, phase, position) do update set
  team          = excluded.team,
  short         = excluded.short,
  played        = excluded.played,
  won           = excluded.won,
  drawn         = excluded.drawn,
  lost          = excluded.lost,
  goals_for     = excluded.goals_for,
  goals_against = excluded.goals_against,
  points        = excluded.points,
  form          = excluded.form;
