//var canvas = d3.select('svg#plot');        
var width = 650;
var height = 350;

var canvas = d3.select('#plot')
				.append('svg')
				.attr('width', width)
				.attr('height', height);

var yardage_gap = 25;
var min_yardage = 200;
var max_yardage = 375;
var dispersion_width = 50;

var scale = d3.scaleLinear()
            .domain([width, height])
            .range([width, height]);

async function main() {
    var data = await d3.csv('data/shot-dispersion-summary.csv');
    data = data.map(d => ({
        playerId: parseInt(d['Player Number'], 10),
        first_name: d['Player First Name'],
        last_name: d['Player Last Name'],
        name_last_first: d['Player Last Name'] + ', ' + d['Player First Name'],
        name_first_last: d['Player First Name'] + ' ' + d['Player Last Name'],
        hole: parseInt(d['Hole Number'], 10),
        round: parseInt(d['Round'], 10),
        distance: (parseInt(d['Total Distance'], 10) / 12.0) / 3.0,
        side: parseInt(d['Actual Side'], 10) / 3.0,
        course: d['Course Name'],
        fwy250: parseFloat(d['Fwy Width 250']),
        fwy275: parseFloat(d['Fwy Width 275']),
        fwy300: parseFloat(d['Fwy Width 300']),
        fwy325: parseFloat(d['Fwy Width 325']),
        fwy350: parseFloat(d['Fwy Width 350'])
    }));
    console.log(data);


    
    //yardage marker arcs
    var markers = [];
    for (var i = min_yardage; i < max_yardage; i=i+yardage_gap) {
        markers.push(i);
    }
    var marker_max = d3.max(markers, function(d) { return d; });


    
    var yardage_scale_x = d3.scaleLinear()
                        .domain([0, marker_max+yardage_gap])
                        .range([0, width]);

    var yardage_scale_y = d3.scaleLinear()
                        .domain([dispersion_width*-1, dispersion_width])
                        .range([0, height]);

    


    // fairway boundaries
    var fwy_line_gen = d3.line()
                        .curve(d3.curveMonotoneX)
                        .x(function(d) { return yardage_scale_x(d[0]); })
                        .y(function(d) { return yardage_scale_y(d[1]); });
    var fwy_bot_lines = [
        [250, data[0].fwy250 / 2.0],
        [275, data[0].fwy275 / 2.0],
        [300, data[0].fwy300 / 2.0],
        [325, data[0].fwy325 / 2.0],
        [350, data[0].fwy350 / 2.0]

        ,[350, data[0].fwy350 / -2.0]
        ,[325, data[0].fwy325 / -2.0]
        ,[300, data[0].fwy300 / -2.0]
        ,[275, data[0].fwy275 / -2.0]
        ,[250, data[0].fwy250 / -2.0]
    ];

    canvas.append('path')
        .attr('d', fwy_line_gen(fwy_bot_lines))
        .attr('class', 'fwy')
        .attr('fill', '#C8FDD3')
        .attr('stroke', '#cccccc')
        .attr('stroke-width', 1);


    // curved yardage lines
    var arc_gen = d3.arc()
                .innerRadius(function(d, i) { return yardage_scale_x(d); })
                .outerRadius(function(d, i) { return yardage_scale_x(d); })
                .startAngle(0.44 * Math.PI)
                .endAngle(0.56 * Math.PI);
    canvas.selectAll('path.yardage')
            .data(markers)
            .enter()
            .append('path')
            .attr('class', 'yardage')
            .attr('d', arc_gen)
            .attr('fill', '#ffffff')
            .attr('stroke', '#cccccc')
            .attr('transform', 'translate(0, ' + height / 2 + ')');
    
    
    // yardage text
    canvas.selectAll('text.yardage')
        .data(markers)
        .enter()
        .append('text')
        .attr('class', 'yardage')
        .attr('x', function(d) { return yardage_scale_x(d); })
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('fill', '#000000')
        .text(function(d) { return d; });

    // center line
    var center_line_gen = d3.line();
    var center_line = center_line_gen([
        [0, height/2],
        [width, height/2]
    ]);
    
    canvas.append('path')
            .attr('class', 'center-line')
            .attr('fill', '#cccccc')
            .attr('stroke', '#cccccc')
            .attr('stroke-width', 1)
            .attr('d', center_line);



    

    // shot dispersion
    var colors = d3.scaleOrdinal(d3.schemeCategory10)
                    .domain([d3.min(data, function(d) { return d.playerId; }), d3.max(data, function(d) { return d.playerId; })]);
    
    var playerIds = d3.map(data, function(d) { return d.playerId; }).keys();
    for (var i = 0; i < playerIds.length; i++) {
        console.log(playerIds[i] + ' - ' + colors(playerIds[i]));
    }

    var shot_line_gen = d3.line();
    var shot_lines = [];
    for (var i = 0; i < data.length; i++) {
        shot_lines.push(shot_line_gen([[0, height/2], [yardage_scale_x(data[i].distance), yardage_scale_y(data[i].side)]]));
    }

    canvas.selectAll('path.shot')
            .data(data)
            .enter()
            .append('path')
            .attr('class', 'shot')
            .attr('stroke', function(d) { return colors(d.playerId); })
            .attr('stroke-width', 2)
            .attr('data-legend', function(d) { return d.name_first_last; })
            .attr('d', shot_lines);
    canvas.selectAll('circle.shot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'shot')
            .attr('fill', function(d) { return colors(d.playerId); })
            .attr('stroke', function(d) { return colors(d.playerId); })
            .attr('stroke-width', 1)
            .attr('cx', function(d) { return yardage_scale_x(d.distance); })
            .attr('cy', function(d) { return yardage_scale_y(d.side); })
            .attr('r', 2);


    ///*
    // legend
    var legendRectSize = 25;
    var legendSpacing = 5;

    var legend = canvas.selectAll('g.legend')
                    .data(colors.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        var height = legendRectSize;
                        var x = 0;
                        var y = i * height;
                        return 'translate(' + x + ',' + y + ')';
                    });
    legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', colors)
        .style('stroke', colors);
    
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d; });
    //*/
}; 

main();