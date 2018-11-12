var width = 500;
var height = 500;
var padding = 60;

var canvas = d3.select('#plot')
				.append('svg')
				.attr('width', width)
                .attr('height', height);
                
var x_scale, x_axis;
var y_scale, y_axis;

async function main() {
    var csv = await d3.csv('data/driving-stats.csv');
    csv = csv.map(d => ({
        tournament_id: parseInt(d['Permanent Tournament #'], 10),
        tournament: d['Event Name'],
        course: d['Course Name'],
        player: d['Player Name'],
        distance: parseFloat(d['Avg Drive Distance']),
        accuracy: parseFloat(d['Fairway Hit Percentage'])
    }));

    var global_x_min = d3.min(csv, function(d) { return d.distance; });
    var global_x_max = d3.max(csv, function(d) { return d.distance; });
    
    x_scale = d3.scaleLinear()
                .domain([global_x_min, global_x_max])
                .range([padding, width-padding]);

    x_axis = d3.axisBottom()
            .scale(x_scale);

    canvas.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0, " + (height - padding) + ")")
        .call(x_axis);

    canvas.append('text')
        .attr('x', width / 2)
        .attr('y', height - (padding/2))
        .attr('text-anchor', 'middle')
        .attr('font-size', 14)
        .text('Driving Distance (yds)');

    var global_y_min = d3.min(csv, function(d) { return d.accuracy; });
    var global_y_max = d3.max(csv, function(d) { return d.accuracy; });

    y_scale = d3.scaleLinear()
                .domain([global_y_max, global_y_min])
                .range([0 + padding, height - padding]);

    y_axis = d3.axisLeft()
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
            .text('Driving Accuracy (%)');
    
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
            plot(csv, this.value);
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

function plot(csv, tournament) {
    var data = csv.filter(function(row) {
        return row.tournament === tournament;
    });

    // var x_min = d3.min(data, function(d) { return d.distance; });
    // var x_max = d3.max(data, function(d) { return d.distance; });
    // var y_min = d3.min(data, function(d) { return d.accuracy; });
    // var y_max = d3.max(data, function(d) { return d.accuracy; });

    // //redraw axis
    // x_scale.domain([x_min, x_max]);
    // canvas.select('g.x-axis')
    //     .transition()
    //     .call(x_axis);

    // y_scale.domain([y_max, y_min]);
    // canvas.select('g.y-axis')
    //     .transition()
    //     .call(y_axis);


    // tooltip
    var tooltip = canvas.append('div')
                        .attr('class', 'tooltip')
                        .style('opacity', 0)
                        .attr('class', 'tooltip')
                        .style('background-color', 'white')
                        .style('border', 'solid')
                        .style('border-width', 1)
                        .style('border-radius', 3)
                        .style('padding', 10);

    // scatterplot
    canvas.selectAll('circle.dot').remove();
    canvas.selectAll('circle.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', function(d) { return x_scale(d.distance); })
            .attr('cy', function(d) { return y_scale(d.accuracy); })
            .attr('r', 3)
            .style('fill', '#013d7c')
            .on('mouseover', function(d) {
                tooltip.transition()
                        .duration(200)
                        .style('opacity', 1);
                tooltip.html('<strong>' + d.player + '</strong><br />Avg Drive: ' + d.distance + ' yards<br />Accuracy: ' + d.accuracy + '%')
                        .style('left', (d3.event.pageX + 15) + 'px')
                        .style('top', (d3.event.pageY - 28) + 'px');
            })
            .on('mouseout', function(d) {
                tooltip.transition()
                        .duration(500)
                        .style('opacity', 0);
            });
}

main();