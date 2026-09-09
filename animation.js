window.onload = function(){
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var head = {
        radius: 50,
        x: canvas.width/2,
        y: canvas.height/2,
        fillColor: "green",
        strokeColor: "black",
        velocity_x:2,
        velocity_y:1
    };

    var eyeL={
        radius: 10,
        fillColor: "black",
        strokeColor: "black"
    };
    var eyeR={
        radius: 8,
        fillColor: "black",
        strokeColor: "black"
    };

    var body={
        w: 30,
        h: 50,
        x:canvas.width/2,
        y: canvas.height/2-head.radius,
        fillColor: "green",
        strokeColor: "black"
    };

   var limbs = [
    { name:"armL", angle:0, min:-30, max:100, speed:2, dir:1, length:30 },
    { name:"armR", angle:0, min:-150, max:30, speed:2, dir:-1, length:30 },
    { name:"legL", angle:0, min:-20, max:80, speed:0.5, dir:1, length:40 },
    { name:"legR", angle:0, min:-20, max:80, speed:0.5, dir:-1, length:40 }
];


    requestAnimationFrame(mainLoop);

    function mainLoop(){
        draw();
        update();

        requestAnimationFrame(mainLoop);
    }
    function draw(){
        context.clearRect(0,0, canvas.width, canvas.height);
        context.save();
        drawHead();
        drawBody();
        context.restore();
    }
    
    function update(){
        updateHead();
        updateLimbs();
    }

    function drawBody(){
        context.save(); //og canvas
        context.beginPath();
        context.translate(head.x-body.w/2, head.y+head.radius); //relative to the head. the body position
        context.rect(0,0,body.w,body.h);
        context.fillStyle = body.fillColor;
        context.fill();

        //left arm
        context.save();
        let rad = limbs[0].angle * Math.PI / 180;
        context.rotate(rad);

        context.beginPath();
        context.rect(0, 0, 8, limbs[0].length);
        context.fillStyle = "green";
        context.fill();
        context.restore();

        //right arm
        context.save();

        rad = limbs[1].angle * Math.PI/180;
        context.translate(body.w, 0);
        context.rotate(rad);

        context.beginPath();
        context.rect(0,0,8,limbs[1].length);
        context.fillStyle="green";
        context.fill();
        context.restore();

        //left leg
        context.save();
        context.translate(0, body.h);
        rad = limbs[2].angle*Math.PI/180;
        context.rotate(rad);

        context.beginPath();
        context.rect(0,0,8,limbs[2].length);
        context.fillStyle="green";
        context.fill()
        context.restore();

        //right leg
        context.save();
        context.translate(body.w, body.h);
        rad = limbs[3].angle*Math.PI/180;
        context.rotate(rad);

        context.beginPath();
        context.rect(0,0,8,limbs[3].length);
        context.fillStyle="green";
        context.fill()
        context.restore();

        context.restore();//og canvas
    }


    function drawHead(){
        context.save(); //the og canvas
        context.beginPath();
        context.translate(head.x, head.y);
        context.arc(0,0,head.radius, 0, 2*Math.PI, false);
        context.fillStyle = head.fillColor;
        context.fill();
        
        //eyeL
        context.save(); //for left eye
        context.beginPath();
        context.translate(0-head.radius/2, 0);
        context.arc(0,0,eyeL.radius, 0, 2*Math.PI, false);
        context.fillStyle = eyeL.fillColor;
        context.fill();
        context.restore(); //back to center of head
        
        //eyeR
        context.save(); //for right eye
        context.beginPath();
        context.translate(0+head.radius/2, 0);
        context.arc(0,0,eyeR.radius, 0, 2*Math.PI, false);
        context.fillStyle = eyeR.fillColor;
        context.fill();
        context.restore(); //back to center of head


        context.restore(); //back to og canvas
    }

    function updateHead(){
        head.x = head.x+head.velocity_x;
        head.y = head.y+head.velocity_y;
        if(head.x>canvas.width || head.x<0){
            head.velocity_x = -head.velocity_x;
        }
        if(head.y>canvas.height || head.y<0){
            head.velocity_y = -head.velocity_y;
        }
    }

    function updateLimbs(){
        for(let limb of limbs){
            limb.angle += limb.speed * limb.dir;

            if(limb.angle > limb.max || limb.angle < limb.min){
                limb.dir *= -1; // reverse direction
            }
        }
    }
    
}