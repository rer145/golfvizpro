select [Hole Number], [Round], [Total Distance], [Actual Side], [Trajectory Sequence], [Trajectory X Coordinate], [Trajectory Y Coordinate], [Trajectory Z Coordinate], [X Coordinate of Impact], [Y Coordinate of Impact], [Z Coordinate of Impact]
from RadarTrajectory 
where [Player Number] = 1249 and [Round] = 1 and [Hole Number] = 5 and [Tournament Permanent Number] = 464 
order by [Trajectory Sequence]

--12510
select [Hole Number], [Round], [Total Distance], [Actual Side]
from RadarTrajectory 
where [Player Number] = 12510 and [Tournament Permanent Number] = 464 and [Trajectory Sequence] = 1
order by [Round]


select *--[Hole Number], [Round], [Total Distance], [Actual Side]
from RadarTrajectory 
where [Tournament Permanent Number] = 464 and [Trajectory Sequence] = 1
order by [Player Number], [Round]

select * 
from Course
where [Course #] = 552 and [Year] = 2018


select 
	rt.[Player Number], rt.[Player First Name], rt.[Player Last Name], rt.[Hole Number], rt.[Round], rt.[Total Distance], rt.[Actual Side],
	c.[Course Name], c.[Fwy Width 250], c.[Fwy Width 275], c.[Fwy Width 300], c.[Fwy Width 325], c.[Fwy Width 350]
from RadarTrajectory rt
inner join Course c on c.[Course #] = rt.[Course Number] and c.[Year] = rt.[Year] and c.[Round] = rt.[Round] and c.Hole = rt.[Hole Number]
where rt.[Player Number] in (12510, 1249, 25900, 26596, 1810)  and rt.[Tournament Permanent Number] = 464 and rt.[Trajectory Sequence] = 1
order by rt.[Player Number], rt.[Round]

select top 100 * from RadarTrajectory where [Tournament Permanent Number] = 464 and [Trajectory Sequence] = 1