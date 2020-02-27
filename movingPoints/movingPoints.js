(function(){

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var pointRadius = 5;
    var pointsQuantity = 200;
    var maxSpeed = 6;
    var maxDistance = 60;
    var colorPoints = true;
    var colorChange = false;
    var color = "grey";
    var mouseRadius = 8;
    var mouseColor = "rgb(87, 62, 145)";
    
    var pointsArray = [];
    
    function Point(X,Y,pointRadius,SpeedX,SpeedY,color){
        this.x = X;
        this.y = Y;
        this.r = pointRadius;
        this.sx = SpeedX;
        this.sy = SpeedY;
        this.color = color;
    }
    
    Point.prototype.create = function(canvasWidth,canvasHeight){
        this.x = Math.floor(Math.random()*(canvasWidth-(2*this.r)))+this.r;
        this.y = Math.floor(Math.random()*(canvasHeight-(2*this.r)))+this.r;
        if(colorPoints === true){
            var red = Math.round(Math.random()*255);
            var green = Math.round(Math.random()*255);
            var blue = Math.round(Math.random()*255);
            this.color = `rgb(${red},${green},${blue})`;
        }
    };
    
    Point.prototype.speed = function(maxSpeed){
        var plusMinusX = Math.round(Math.random());
        var plusMinusY = Math.round(Math.random());
        if(plusMinusX === 0){
            this.sx = Math.floor(Math.random()*maxSpeed);
        } else if (plusMinusX === 1) {
            this.sx = -Math.floor(Math.random()*maxSpeed);
        } 
        if(plusMinusY === 0){
            this.sy = Math.floor(Math.random()*maxSpeed);
        } else if (plusMinusY === 1) {
            this.sy = -Math.floor(Math.random()*maxSpeed);
        }   
    }
    
    Point.prototype.draw = function(){ 
            ctx.beginPath();
            if(colorChange === true){
                var red = Math.round(Math.random()*255);
                var green = Math.round(Math.random()*255);
                var blue = Math.round(Math.random()*255);
                this.color = `rgb(${red},${green},${blue})`;
            }
            ctx.fillStyle = this.color;
            ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
            ctx.fill();
            ctx.closePath() 
    }
    
    Point.prototype.move = function(){
        if(this.y <= this.r || this.y >= canvas.height-this.r){
            this.sy = -this.sy;
        } else if (this.x <= this.r || this.x >= canvas.width-this.r){
            this.sx = -this.sx;
        } 
        this.x += this.sx;
        this.y += this.sy;
    };
    
    Point.prototype.connect = function(){    
        for ( let i = 0; i<pointsQuantity; i++){
            var distance_2 = Math.pow(this.x-pointsArray[i].x,2)+Math.pow(this.y-pointsArray[i].y,2);
            var distance = Math.sqrt(distance_2)
            if(distance < maxDistance){
                ctx.beginPath;
                ctx.strokeStyle = "grey";
                ctx.lineWidth = 0.1;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(pointsArray[i].x, pointsArray[i].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    
    function placePoints(){    
        for (let i = 0; i<pointsQuantity; i++){
            var point = new Point(0,0,pointRadius,0,0,color);
            point.create(canvasWidth,canvasHeight);
            point.draw();
            point.speed(maxSpeed);
            pointsArray.push(point); 
        }
    }
    placePoints();
    
    canvas.addEventListener("pointermove", function(e){
        var mouse = new Point(e.pageX,e.pageY,mouseRadius,0,0,mouseColor);
        mouse.draw();
        mouse.connect();
    });
    
    function movePoints(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for ( let i = 0; i<pointsQuantity; i++){
            pointsArray[i].move();   
            pointsArray[i].draw();
            pointsArray[i].connect();        
        }       
    }
    setInterval(movePoints,50);

})();