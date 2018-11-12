//var canvas = d3.select('svg#plot');        
var width = 650;
var height = 500;

var labels = true;
var padding = 60;

var box_width = 75;

var global_max = Infinity;
var global_min = -Infinity;

var canvas = d3.select('#plot')
				.append('svg')
				.attr('width', width)
                .attr('height', height);
                
var x_scale;
var y_scale;


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

    global_min = d3.min(csv, function(d) { return d.score; });
    global_max = d3.max(csv, function(d) { return d.score; });
    
    x_scale = d3.scaleLinear()
                .domain([-0.5, 3.5])
                .range([padding, width-padding]);

    var rounds = [0,1,2,3];
    var x_axis = d3.axisTop()
        .scale(x_scale)
        .tickValues(rounds)
        .tickFormat(function(d,i) { return "Round " + (i+1).toString(); });

    canvas.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0, " + padding + ")")
        .call(x_axis);

    y_scale = d3.scaleLinear()
                .domain([global_max, global_min])
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
    
    var tournaments = [];
    csv.forEach(function(x) {
        if (!tournaments.includes(x.tournament)) {
            tournaments.push(x.tournament);
        }
    });

    var tourney_select = d3.select('span#tournament-list')
        .append('select')
        .attr('class', 'tournament-list')
        .attr('id', 'tournaments')
		.on('change', function() {
            plotRounds(csv, this.value);
        });
        
    tourney_select.selectAll('option')
		.data(tournaments)
		.enter()
		.append('option')
		.attr('value', function(d) { return d; })
		.text(function(d) { return d; });
	
	d3.selectAll('select#tournaments')
		.append('option')
		.attr('value', '')
		.text('-- Choose a Tournament --')
		.attr('selected', 'yes');
}; 

function formatData(csv, tournament) {
    var tourney_data = csv.filter(function(row) {
        return row.tournament === tournament;
    });
    
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

    tourney_data.forEach(function(x) {
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

        q1 = data[i][2][0] - 1.5 * (data[i][2][2] - data[i][2][0]);
        q3 = data[i][2][0] + 1.5 * (data[i][2][2] - data[i][2][0]);
        data[i][3] = [];
        data[i][3].push(q1);
        data[i][3].push(d3.quantile(data[i][1], 0.5));
        data[i][3].push(q3);

        data[i][4] = [];
        for (var j = 0; j < data[i][1].length; j++) {
            if (data[i][1][j] < q1 || data[i][1][j] > q3)
                data[i][4].push(data[i][1][j]);
        }
    }

    console.log(data);
    return data;
}

function plotRounds(csv, tournament) {
    var data = formatData(csv, tournament);

    // center line of box plot
    canvas.selectAll('line.box-center').remove();
    canvas.selectAll('rect.box').remove();
    canvas.selectAll('line.box-bounds').remove();
    canvas.selectAll('circle.outlier').remove();

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
        .attr('y2', function(d) { return d[1][1]; });

    //outliers
    var outliers = [];
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < 3; j++) {
            outliers.push([i, data[i][4][j]]);
        }
    }

    canvas.selectAll('circle.outlier')
            .data(outliers)
            .enter()
            .append('circle')
            .attr('class', 'outlier')
            .attr('cx', function(d) { return x_scale(d[0]); })
            .attr('cy', function(d) { return y_scale(d[1]); })
            .attr('r', 2)
            .attr('fill', 'white')
            .attr('stroke', 'black');

}

main();