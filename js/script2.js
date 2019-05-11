//redraw photo to points in svg - працює можна гратись
var width = 300;
var height = 200;

var svg = d3.select("svg#try")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);


var group = svg.append("g").attr("transform",  "translate(" + 0 + "," + 0 + ")");

// Build X scales and axis:
var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, 105]);


// Build X scales and axis:
var y = d3.scaleLinear()
    .range([ height, 0 ])
    .domain([70, 0]);

var random = [];
d3.range(15000).map(function(d) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    // var z = "red";
    random.push({ "x": x, "y": y });
});

var join = group.selectAll('circle.point')
    .data(random);

var enterSel = join
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.x) })
    .attr("cy", function(d) { return y(d.y) })
    .attr("fill", function(d) { return d.z } )
    .attr("r", 3 )
    .attr("class", "point");


step_00();

function step_00(){
    databind(random);

}


function step_01(){
    d3.csv("slava_to_pixels.csv", function (slava) {
        databind(slava);
    });
}

function step_02() {
    // d3.csv("slava_to_pixels_new.csv", function (slava2) {
        databind(random);
    // });
}


function step_03() {
    d3.csv("slava_to_pixels_new.csv", function (slava2) {
    databind(slava2);
    });
}



function databind(data) {
    join = group.selectAll('circle.point')
            .data(data);    

    var enterSel = join
        .enter()
        .append("circle")
        .attr("cx", function(d, i) { return x(d.x) })
        .attr("cy", function(d) { return y(d.y) })
        .attr("fill", function(d) { return d.z } )
        .attr("r", 10 )
        .attr("class", "point");

    join
        // .merge(enterSel)
        .transition()
        .duration(500)
        .attr("cx", function(d, i) { return x(d.x) })
        .attr("cy", function(d) { return y(d.y)   })
        .attr("fill", function(d) { return d.z } )
        .attr("class", "point");

    var exitSel = join.exit()
        .transition()
        .duration(500)
        .remove();
   
}



$("#redraw").on("click", function () {
    step_01()
});


$("#redraw2").on("click", function () {
    step_02()
});

$("#redraw3").on("click", function () {
    step_03()
});















