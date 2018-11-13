select [From Location(Scorer)], [X Coordinate], [Y Coordinate]
from Stroke
where
	[From Location(Scorer)] != '0' and [X Coordinate] > 0 and
	[Course #] = 11 and [Permanent Tournament #] = 11
	and [Hole] = 17
order by [From Location(Scorer)]

select distinct [From Location(Scorer)] from Stroke