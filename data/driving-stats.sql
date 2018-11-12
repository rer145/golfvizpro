select
	[Player Name], [Round Number],
	round([Driving Dist. - All Drives(Tot. Dist.)] / convert(float, [Driving Dist. - All Drives(# of Drives)]), 2) as [Avg Drive Distance],
	round(([Driving Acc. %(Fairways Hit)] / convert(float, [Driving Acc. %(Possible Fairways)])) * 100.0, 2) as [Fairway Hit Percentage]
from [Round]
where [Permanent Tournament #] = 464
order by [Player Name], [Round Number]

select
	[Permanent Tournament #], [Event Name], [Course Name], 
	replace(substring([Player Name], charindex(',', [Player Name], 0)+2, len([Player Name])) + ' ' + substring([Player Name], 0, charindex(',', [Player Name], 0)), ', ', '') as [Player Name],
	round(sum([Driving Dist. - All Drives(Tot. Dist.)]) / convert(float, sum([Driving Dist. - All Drives(# of Drives)])), 2) as [Avg Drive Distance],
	round(((sum([Driving Acc. %(Fairways Hit)]) / convert(float, sum([Driving Acc. %(Possible Fairways)]))) * 100.0), 2) as [Fairway Hit Percentage]
from [Round]
group by [Permanent Tournament #], [Event Name], [Course Name], replace(substring([Player Name], charindex(',', [Player Name], 0)+2, len([Player Name])) + ' ' + substring([Player Name], 0, charindex(',', [Player Name], 0)), ', ', '')
having sum([Driving Dist. - All Drives(# of Drives)]) > 0 and sum([Driving Acc. %(Possible Fairways)]) > 0
order by [Event Name], replace(substring([Player Name], charindex(',', [Player Name], 0)+2, len([Player Name])) + ' ' + substring([Player Name], 0, charindex(',', [Player Name], 0)), ', ', '')

