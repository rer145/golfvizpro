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
    var csv = await d3.csv('data/hole-map-sawgrass17.csv');
    csv = csv.map(d => ({
        location: d['From Location(Scorer)'],
        x: parseFloat(d['X Coordinate']),
        y: parseFloat(d['Y Coordinate'])
    }));

    var global_x_min = d3.min(csv, function(d) { return d.x; });
    var global_x_max = d3.max(csv, function(d) { return d.x; });

    var global_y_min = d3.min(csv, function(d) { return d.y; });
    var global_y_max = d3.max(csv, function(d) { return d.y; });
    
    x_scale = d3.scaleLinear()
                .domain([global_x_min, global_x_max])
                .range([padding, width-padding]);

    x_axis = d3.axisBottom()
            .scale(x_scale);

    canvas.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0, " + (height - padding) + ")")
        .call(x_axis);

    y_scale = d3.scaleLinear()
                .domain([global_y_max, global_y_min])
                .range([0 + padding, height - padding]);

    y_axis = d3.axisLeft()
                .scale(y_scale);

    canvas.append("g")
            .attr('class', 'y-axis')
            .attr("transform", "translate(" + padding + ",0)")
            .call(y_axis);

    plot(csv, '');
}; 

function plot(csv, tournament) {
    // var data = csv.filter(function(row) {
    //     return row.tournament === tournament;
    // });

    var data = csv;

    // scatterplot
    canvas.selectAll('circle.dot').remove();
    canvas.selectAll('circle.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', function(d) { return x_scale(d.x); })
            .attr('cy', function(d) { return y_scale(d.y); })
            .attr('r', 3)
            .style('fill', function(d) {
                switch (d.location) {
                    case 'Fairway':
                        return '#546A3B';
                    case 'Fairway Bunker':
                        return '#E6DAC0';
                    case 'Fringe':
                        return '#4C6430';
                    case 'Green':
                        return 'green';//'#607846';
                    case 'Green Side Bunker':
                        return '#E6DAC0';
                    case 'Intermediate Rough':
                        return '#3D5325';
                    case 'Native Area':
                        return '#39441F';
                    case 'Other':
                        return '#4E372F';
                    case 'Primary Rough':
                        return '#485129';
                    case 'Tee Box':
                        return '#677F4B';
                    case 'Unknown':
                        return '#BCB9B4';
                    case 'Water':
                        return '#485FA2';
                    default:
                        return '#000000'
                };
            });
}

main();