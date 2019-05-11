//PIXI.js version

var $windowWidth = window.innerWidth * 0.8;
var $windowHeight = window.innerHeight * 0.8;


// var app = new PIXI.Application($windowWidth, $windowHeight, {transparent:true, resolution:1});
// $('#container').append(app.view);

var x = d3.scaleLinear()
    .range([0, 300])
    .domain([0, 300]);


// Build X scales and axis:
var y = d3.scaleLinear()
    .range([ 200, 0 ])
    .domain([200, 0]);


// var app = PIXI.autoDetectRenderer(800, 600);
// document.body.appendChild(renderer.view);

const app = new PIXI.Application({ width: $windowWidth, height: $windowHeight,  transparent: true, setInteractive: true });
$('#container').append(app.view);

var points = [];
const container = new PIXI.Container();

//малюємо усі точки одного кольору і додаємо потрібний колір через тінь, щоб мати можливіть змінювати
function draw() {
    d3.csv("slava_to_pixels_new_pixi.csv", function(slava) {

        slava.forEach(function (d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        slava.forEach(function (node) {
            const sprite = new PIXI.Graphics();
            sprite.id = node.id;
            sprite.speed = 2 + Math.random() * 2;
            sprite.lineStyle(0); //
            sprite.beginFill(0xffffff, 1);
            sprite.drawCircle(x(node.x), y(node.y), 2);
            sprite.endFill();
            points.push(sprite);
            // const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
            // sprite.scale.set(Math.random() * 0.3);
            // sprite.x = x(node.x);
            // sprite.y = y(node.y);
            // sprite.tint = node.z;
            // sprite.direction = Math.random() * Math.PI * 2;
            // sprite.turningSpeed = Math.random() - 0.8;
            // sprite.speed = Math.random() * 2;
            // points.push(sprite);
            container.addChild(sprite);
        });
        app.stage.addChild(container);

    });
}

draw();

// requestAnimationFrame(animate);
function animate() {
    // iterate through the sprites and update their position
    for (var i = 0; i < points.length; i++) {
        var dude = points[i];
        TweenMax.to(dude, 1, { x: (Math.random() * $windowWidth) * dude.speed, y: (Math.random() * $windowHeight) * dude.speed });

        // dude.position.x += (Math.random() * $windowWidth) * dude.speed;
        // dude.position.y += (Math.random() * $windowHeight) * dude.speed;
        // dude.tint = 0x1c1f24;
    }

 // requestAnimationFrame(animate);
}


function animate2() {
    d3.csv("slava_to_pixels_new_pixi.csv", function(slava2) {
        slava2.forEach(function (d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        slava2.forEach(function (p, i) {
            var newDude = points[i];
            TweenMax.to(newDude, 1, { x: x(p.x) + 300, y: y(p.y) + 300 });
            // newDude.position.x = x(p.x);
            // newDude.position.y = y(p.y);
            newDude.tint = p.z;
        });
});
    // requestAnimationFrame(animate2);
}


function animate3() {
    d3.csv("slava_to_pixels_pixi.csv", function(slava) {

        slava.forEach(function (d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        slava.forEach(function (p, i) {
            var newDude = points[i];
            TweenMax.to(newDude, 1, { x: x(p.x) + 300, y: y(p.y) + 300 });
            // newDude.position.x = x(p.x);
            // newDude.position.y = y(p.y);
            newDude.tint = p.z;
        });
    });
}



$("#redraw").on("click", function () {
   animate()
});

$("#redraw2").on("click", function () {
    animate2()
});

$("#redraw3").on("click", function () {
   animate3()
});

