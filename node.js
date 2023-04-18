var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var snake = [{x: 10, y: 10}];
var food = {x: Math.floor(Math.random()*40), y: Math.floor(Math.random()*40)};
var score = 0;
var direction = "right";

document.addEventListener("keydown", function(event) {
    if(event.keyCode == 37 && direction != "right") {
        direction = "left";
    }
    else if(event.keyCode == 38 && direction != "down") {
        direction = "up";
    }
    else if(event.keyCode == 39 && direction != "left") {
        direction = "right";
    }
    else if(event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
});

function move() {
    var head = {x: snake[0].x, y: snake[0].y};
    if(direction == "right") {
        head.x++;
    }
    else if(direction == "left") {
        head.x--;
    }
    else if(direction == "up") {
        head.y--;
    }
    else if(direction == "down") {
        head.y++;
    }
    if(head.x < 0 || head.x >= 40 || head.y < 0 || head.y >= 40) {
        clearInterval(interval);
        alert("Game Over");
    }
    for(var i = 0; i < snake.length; i++) {
        if(snake[i].x == head.x && snake[i].y == head.y) {
            clearInterval(interval);
            alert("Game Over");
        }
    }
    snake.unshift(head);
    if(head.x == food.x && head.y == food.y) {
        food.x = Math.floor(Math.random()*40);
        food.y = Math.floor(Math.random()*40);
        score += 10;
    }
    else {
        snake.pop();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
    ctx.fillStyle = "green";
    for(var i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
    }
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 5, 20);
}

var interval = setInterval(move, 100);
