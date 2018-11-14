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
    var csv = await d3.csv('data/hole-map-sawgrass.csv');
    csv = csv.map(d => ({
        hole: parseInt(d['Hole'], 10),
        location: d['To Location(Scorer)'],
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

    y_scale = d3.scaleLinear()
                .domain([global_y_max, global_y_min])
                .range([0 + padding, height - padding]);

    d3.select("#holes")
        .on('change', function() { plot(csv, '', this.value); });

    plot(csv, '', 1);
}; 

function plot(csv, tournament, hole) {
    var data = csv.filter(function(row) {
        //return row.tournament === tournament;
        return row.hole == hole;
    });
    //var data = csv;

    d3.select('img#actual-hole')
        .attr('src', 'images/holes/hole-' + hole + '.jpg');

    var x_min = d3.min(data, function(d) { return d.x; });
    var x_max = d3.max(data, function(d) { return d.x; });

    var y_min = d3.min(data, function(d) { return d.y; });
    var y_max = d3.max(data, function(d) { return d.y; });
    
    x_scale = d3.scaleLinear()
                .domain([x_min, x_max])
                .range([padding, width-padding]);

    y_scale = d3.scaleLinear()
                .domain([y_max, y_min])
                .range([0 + padding, height - padding]);

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
                    case 'Bridge': return '#BCB9B4';
                    case 'Bush': return '#BCB9B4';
                    case 'Cart Path': return '#4E372F';
                    case 'Dirt Outline': return '#39441F';
                    case 'Fairway': return '#546A3B';
                    case 'Fairway Bunker': return '#E6DAC0';
                    case 'Fringe': return '#4C6430';
                    case 'Green': return 'green';//'#607846';
                    case 'Green Side Bunker': return '#E6DAC0';
                    case 'Intermediate Rough': return '#3D5325';
                    case 'Landscaping': return '#BCB9B4';
                    case 'Native Area': return '#39441F';
                    case 'Other': return '#4E372F';
                    case 'Path': return '#4E372F';
                    case 'Primary Rough': return '#485129';
                    case 'Rock Outline': return '#4E372F';
                    case 'Tee Box': return '#677F4B';
                    case 'Tree Outline': return '#BCB9B4';
                    case 'Unknown': return 'black';
                    case 'Wall': return '#4E372F';
                    case 'Water': return '#485FA2';
                    default:
                        return '#000000'
                };
            });
}

main();