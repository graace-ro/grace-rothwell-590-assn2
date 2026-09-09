window.onload = function(){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    requestAnimationFrame(mainLoop);

    function mainLoop(){
        draw();

        requestAnimationFrame(mainLoop);
    }

    function update(){

    }
    function draw(){
        context.clearRect(0,0, canvas.clientWidth, canvas.height);
        context.beginPath();
        context.rect(50,50,100,100);
        context.fill();
    }
    
}