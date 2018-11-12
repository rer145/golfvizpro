select [Tournament Year], [Permanent Tournament #], [Event Name], [Course Name], [Round Number], [Round Score] 
from [Round] 
where [Permanent Tournament #] not in (470, 18)
order by [Event Name], [Round Number]
--order by [Round Score]