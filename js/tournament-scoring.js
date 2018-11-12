//var canvas = d3.select('svg#plot');        
var width = 650;
var height = 500;

var labels = true;
var padding = 60;

var box_width = 75;

var canvas = d3.select('#plot')
				.append('svg')
				.attr('width', width)
				.attr('height', height);


async function main() {
    var csv = await d3.csv('data/tournament-scoring.csv');
    csv = csv.map(d => ({
        year: parseInt(d['Tournament Year'], 10),
        tournament_id: parseInt(d['Permanent Tournament #'], 10),
        tournament: d['Event Name'],
        course: d['Course Name'],
        round: parseInt(d['Round Number'], 10),
        score: parseInt(d['Round Score'], 10)
    }));
    //console.log(csv);

    var min = d3.min(csv, function(d) { return d.score; });
    var max = d3.max(csv, function(d) { return d.score; });

    var data = [];
    data[0] = [];
    data[1] = [];
    data[2] = [];
    data[3] = [];

    data[0][0] = "Round 1";
    data[1][0] = "Round 2";
    data[2][0] = "Round 3";
    data[3][0] = "Round 4";

    data[0][1] = [];
    data[1][1] = [];
    data[2][1] = [];
    data[3][1] = [];

    csv.forEach(function(x) {
        data[x.round-1][1].push(x.score);
    });

    data[0][1] = data[0][1].sort();
    data[1][1] = data[1][1].sort();
    data[2][1] = data[2][1].sort();
    data[3][1] = data[3][1].sort();

    for (var i = 0; i < data.length; i++) {
        data[i][2] = [];
        data[i][2].push(d3.quantile(data[i][1], 0.25));
        data[i][2].push(d3.quantile(data[i][1], 0.5));
        data[i][2].push(d3.quantile(data[i][1], 0.75));

        data[i][3] = [];
        data[i][3].push(data[i][2][0] - 1.5 * (data[i][2][2] - data[i][2][0]));
        data[i][3].push(d3.quantile(data[i][1], 0.5));
        data[i][3].push(data[i][2][0] + 1.5 * (data[i][2][2] - data[i][2][0]));
    }
    console.log(data);

    // axis
    var x_scale = d3.scaleLinear()
					.domain([-0.5, 3.5])
                    .range([padding, width-padding]);
                    
	var x_axis = d3.axisTop()
                    .scale(x_scale)
                    .tickValues(data.map(function(d, i) { return i; }))
                    .tickFormat(function(d) { return data[d][0]; });
                    
    canvas.append("g")
            .attr('class', 'x-axis')
            .attr("transform", "translate(0, " + padding + ")")
            .call(x_axis);

    var y_scale = d3.scaleLinear()
            .domain([max, min])
            .range([0 + padding, height - padding]);
            
    var y_axis = d3.axisLeft()
            .scale(y_scale);

    canvas.append("g")
			.attr('class', 'y-axis')
			.attr("transform", "translate(" + padding + ",0)")
            .call(y_axis);
            
    canvas.append('text')
			.attr('x', -(height/2))
			.attr('y', padding/2)
			.attr('text-anchor', 'middle')
            .attr('font-size', 14)
            .attr('transform', 'rotate(-90)')
            .text('Round Score');

    // center line of box plot
    canvas.selectAll('line.box-center')
            .data(data)
            .enter()
            .append('line')
            .attr('class', 'box-center')
            .attr('x1', function(d,i) { return x_scale(i); })
            .attr('x2', function(d,i) { return x_scale(i); })
            .attr('y1', function(d,i) { return y_scale(data[i][2][0] - 1.5 * (data[i][2][2] - data[i][2][0])); })
            .attr('y2', function(d,i) { return y_scale(data[i][2][0] + 1.5 * (data[i][2][2] - data[i][2][0])); })
            // .attr('y1', function(d,i) { return y_scale(data[i][2][0]); })
            // .attr('y2', function(d,i) { return y_scale(data[i][2][2]); })
            .attr('stroke', 'black');

    // box plot boxes
    canvas.selectAll('rect.box')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'box')
            .attr('x', function(d,i) { return x_scale(i) - (box_width / 2); })
            .attr('y', function(d,i) { return y_scale(data[i][2][2]); })
            .attr('height', function(d,i) { return y_scale(data[i][2][0]) - y_scale(data[i][2][2]); })
            .attr('width', box_width)
            .attr('fill', 'white')
            .attr('stroke', 'black');

    // box plot median, min, max lines
    var bounds_gen = d3.line();
    var bounds = [];
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < 3; j++) {
            bounds.push([
                [x_scale(i) - (box_width / 2), y_scale(data[i][3][j]), j == 1 ? 2 : 1],
                [x_scale(i) + (box_width / 2), y_scale(data[i][3][j]), j == 1 ? 2 : 1]
            ]);
        }
    }

    canvas.selectAll('line.box-bounds')
            .data(bounds)
            .enter()
            .append('line')
            .attr('class', 'box-bounds')
            .attr('stroke', 'black')
            .attr('stroke-width', function(d) { return d[0][2]; })
            .attr('x1', function(d) { return d[0][0]; })
            .attr('y1', function(d) { return d[0][1]; })
            .attr('x2', function(d) { return d[1][0]; })
            .attr('y2', function(d) { return d[1][1]; })

    // canvas.selectAll('line.box-min-line')
    //         .data(data)
    //         .enter()
    //         .append('line')
    //         .attr('class', 'box-min-line')
    //         .attr('x1', function(d,i) { return x_scale(i) - (box_width / 2); })
    //         .attr('x2', function(d,i) { return x_scale(i) + (box_width / 2); })
    //         .attr('y1', function(d,i) { return y_scale(data[i][3][0]); })
    //         .attr('y2', function(d,i) { return y_scale(data[i][3][0]); })
    //         .attr('stroke', 'black');

    // canvas.selectAll('line.box-med-line')
    //         .data(data)
    //         .enter()
    //         .append('line')
    //         .attr('class', 'box-med-line')
    //         .attr('x1', function(d,i) { return x_scale(i) - (box_width / 2); })
    //         .attr('x2', function(d,i) { return x_scale(i) + (box_width / 2); })
    //         .attr('y1', function(d,i) { return y_scale(data[i][3][1]); })
    //         .attr('y2', function(d,i) { return y_scale(data[i][3][1]); })
    //         .attr('stroke', 'black')
    //         .attr('stroke-width', 2);

    // canvas.selectAll('line.box-max-line')
    //         .data(data)
    //         .enter()
    //         .append('line')
    //         .attr('class', 'box-max-lines')
    //         .attr('x1', function(d,i) { return x_scale(i) - (box_width / 2); })
    //         .attr('x2', function(d,i) { return x_scale(i) + (box_width / 2); })
    //         .attr('y1', function(d,i) { return y_scale(data[i][3][2]); })
    //         .attr('y2', function(d,i) { return y_scale(data[i][3][2]); })
    //         .attr('stroke', 'black');
}; 

// function iqr(k) {
//     return function(d, i) {
//         var q1 = d.quartiles[0];
//         var q3 = d.quartiles[2];
//         var iqr = (q3 - q1) * k;
//         i = -1;
//         j = d.length;
//         while (d[++i] < q1 - iqr);
//         while (d[--j] > q3 + iqr);
//         return [i,j];
//     };
// }

main();