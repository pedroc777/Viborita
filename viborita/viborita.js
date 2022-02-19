
class Viborita{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
    }
    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        }else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        
        this.tail.shift()
        this.tail.push(newRect)
    }
}

class Manzana{
    constructor(){
        console.log("manzana")
        console.log(viborita.size)
        var isTouching = false;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / viborita.size) * viborita.size
            this.y = Math.floor(Math.random() * canvas.height / viborita.size) * viborita.size
            for(var i = 0; i < viborita.tail.length; i++){
                if(this.x == viborita.tail[i].x && this.y == viborita.tail[i].y){
                    isTouching = true
                }
            }
            console.log(this.x, this.y)
            this.size = viborita.size
            this.color = "red"
            if(!isTouching){
                break;
            }
            //console.log(this.x, this.y)
        }
    }
}

var canvas = document.getElementById("canvas")

var viborita = new Viborita(20,20,20);

var manzana = new Manzana();

var canvasContext = canvas.getContext('2d');

window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/15) //15 fps por segundo
}

function show(){
    update();
    draw();
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    console.log("update")
    viborita.move()
    eatManzana()
    checkHitWall();
}

function checkHitWall(){
    var headTail = viborita.tail[viborita.tail.length -1]
    if(headTail.x == -viborita.size){
        headTail.x = canvas.width - viborita.size
    }
    else if(headTail.x == canvas.width){
        headTail.x = 0
    }
    else if(headTail.y == -viborita.size){
        headTail.y = canvas.height - viborita.size
    }
    else if(headTail.y == canvas.height){
        headTail.y = 0
    }
}

function eatManzana(){
    if(viborita.tail[viborita.tail.length - 1].x == manzana.x &&
        viborita.tail[viborita.tail.length - 1].y == manzana.y){
            viborita.tail[viborita.tail.length] = {x: manzana.x, y: manzana.y}
            manzana = new Manzana();
        }
}

function draw(){
    createRect(0,0, canvas.width, canvas.height, "white") //8:53
    createRect(0,0, canvas.width, canvas.height)
    for(var i = 0; i < viborita.tail.length; i++){
        createRect(viborita.tail[i].x + 2.5, viborita.tail[i].y + 2.5,
            viborita.size - 5, viborita.size - 5, 'black')
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Puntos: " + (viborita.tail.length  -1),
        canvas.width - 120, 18);
    createRect(manzana.x, manzana.y, manzana.size, manzana.size, manzana.color)
}

function createRect(x,y,width,height,color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown",(event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && viborita.rotateX != 1){
            viborita.rotateX = -1
            viborita.rotateY = 0;
        }
        else if(event.keyCode == 38 && viborita.rotateY != 1){
            viborita.rotateX = 0
            viborita.rotateY = -1;
        }
        else if(event.keyCode == 39 && viborita.rotateX != -1){
            viborita.rotateX = 1
            viborita.rotateY = 0;
        }
        else if(event.keyCode == 40 && viborita.rotateY != -1){
            viborita.rotateX = 0
            viborita.rotateY = 1;
        }
    }, 1)
})