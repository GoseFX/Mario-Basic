import platform from '../img/tiles.png'
import background from '../img/trees1.jpg'
import sign from '../img/15.png'
import StandR from '../img/spriteStandRight.png'
import RunR from '../img/spriteRunRight.png'
import RunL from '../img/spriteRunLeft.png'
import StandL from '../img/spriteStandLeft.png'
import Stick from '../img/stick.png'
import higher from '../img/higer.png'


/*import 
import*/


const canvas = document.querySelector('canvas')//using query will be more flexible
const context = canvas.getContext('2d')//enable you to draw on canvas
//document.querySelector('.myImg').src = '../img/platform1.png' // or ./assets/platform.png


canvas.width = 1024
canvas.height = 576

const gravity = 1.5
class Player {
    constructor() {//this is a special method
        this.speed = 6
        this.position={//this is easier to fix than this.x:100 bc this will separate
            x:100,
            y:100
        }
        this.velocity ={//speed
            x:0,
            y:0
        }
        this.width = 66
        this.height = 150
        this.image = createImage(StandR)
        this.frames = 0
        this.sprites = {
            stand:{ right: createImage(StandR),
                left:createImage(StandL),
                cropW:177,
                width:66

            },
            run:{
                right:createImage(RunR),
                left:createImage(RunL),
                cropW:341,
                width:127.875
            }
          
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCW=177
    }
    draw() {
        context.drawImage(this.currentSprite,this.currentCW*this.frames,0,this.currentCW, 400,
            this.position.x, this.position.y,this.width,this.height);
    }//draw and specify the properties
    update(){
        this.frames++
        if(this.frames>59&& 
            this.currentSprite===this.sprites.stand.right||this.currentSprite===this.sprites.stand.left) 
            this.frames=0
        else if(this.frames>30
            && this.currentSprite===this.sprites.run.right||this.currentSprite===this.sprites.run.left)
            this.frames=0
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height+this.velocity.y<=canvas.height)
       this.velocity.y += gravity
  
      
    }
}
class Platform {
    constructor({x,y,image}) {
        this.position = {
            x,
            y

        }
        this.image = image
        this.width =image.width
        this.height=image.height

        
    }
    draw() {
      if (this.image.complete) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }else{
      console.log("Not ready")
    }
}
}

class GenObject {
    constructor({x,y,image}) {
        this.position = {
            x,
            y

        }
        this.image = image
        this.width =image.width
        this.height=image.height

        
    }
    draw() {
      if (this.image.complete) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }else{
      console.log("Not ready")
    }
}
}

function createImage(imageSrc){

    const image = new Image()
    image.src = imageSrc
    return image
}
/*class Horse {
    constructor() {
        this.position = {
            x: 100, // Adjust the x position where the horse should stand
            y: 400 // Adjust the y position (ground level)
        };
        this.width = 66; // Adjust according to the horse image dimensions
        this.height = 150;
        this.image = createImage(horse); // Path to your horse image
    }

    draw() {
        context.drawImage(
            this.image,
            0, 0, 160, 96, // Adjust these numbers based on your sprite if needed
            this.position.x, this.position.y,
            this.width, this.height
        );
    }
}

/*
class Horse {
    constructor() {
        this.position = {
            x: 100, // Adjust the x position where the horse should stand
            y: 400 // Adjust the y position (ground level)
        };
        this.width = 66; // Adjust according to the horse image dimensions
        this.height = 150;
        this.image = createImage('/mnt/data/idle.png'); // Path to your horse image
    }

    draw() {
        context.drawImage(
            this.image,
            0, 0, 160, 96, // Adjust these numbers based on your sprite if needed
            this.position.x, this.position.y,
            this.width, this.height
        );
    }
}
class Horse {
    constructor() {
        this.position = {
            x:0,
            y:500

        }
       
        this.width =66
        this.height=150
        this.image = createImage(horse)

        
    }
    draw() {
      if (this.image.complete) {
        context.drawImage(this.image
            ,0,0,160,96, this.position.x, this.position.y,this.width,this.height);
    }else{
      console.log("Not ready")
    }
}
}*/


/*
image.onload = () => {
  console.log('Image loaded successfully', image.src);
  // Start the game loop after the image is loaded
  animate();
};
image.onerror = () => {
  console.error('Image failed to load:', image.src); // Log if the image fails to load
};
*/
let platformImage = createImage(platform)


let player = new Player()

let platforms =[
]

let genObj = [
    
]
let lastKey
const keys = {
    right:{
        pressed:false
    },
    left:{
        pressed:false
    }
}

let scrollOff = 0

function init(){



platformImage = createImage(platform)


 player = new Player()

 platforms =[new Platform({x:-1,y:470,image:platformImage}

),new Platform({x:platformImage.width-1,y:470,image:platformImage}),
new Platform({x:platformImage.width*2+300,y:470,image:platformImage}),
new Platform({x:platformImage.width*3+300,y:470,image:platformImage}),
new Platform({x:platformImage.width*4+400,y:470,image:platformImage})
,
new Platform({x:platformImage.width*5+550,y:370,image:platformImage})
,
new Platform({x:platformImage.width*6+660,y:270,image:platformImage})
,
new Platform({x:platformImage.width*7+660,y:270,image:platformImage})
,
new Platform({x:platformImage.width*8+800,y:470,image:platformImage})
,
//new Platform({x:platformImage.width*9+900,y:370,image:Stick})
//,d
new Platform({x:platformImage.width*9+1000,y:370,image:createImage(higher)})
,
new Platform({x:platformImage.width*9+1000,y:470,image:platformImage})

,

new Platform({x:platformImage.width*9+1700,y:470,image:createImage(Stick)})
,
new Platform({x:platformImage.width*9+1900,y:470,image:createImage(Stick)})
,
new Platform({x:platformImage.width*9+2100,y:470,image:createImage(Stick)})
,


new Platform({x:platformImage.width*11+2700,y:370,image:createImage(higher)})
,
new Platform({x:platformImage.width*12+2900,y:270,image:createImage(higher)})
,
new Platform({x:platformImage.width*12+2500,y:470,image:createImage(Stick)})
,
new Platform({x:platformImage.width*12+2700,y:470,image:createImage(Stick)})
,


new Platform({x:platformImage.width*13+3000,y:470,image:platformImage}),
new Platform({x:platformImage.width*14+3500,y:470,image:platformImage}),
new Platform({x:platformImage.width*15+4000,y:470,image:platformImage}),
new Platform({x:platformImage.width*16+4500,y:470,image:platformImage}),
new Platform({x:platformImage.width*17+5500,y:470,image:platformImage}),
new Platform({x:platformImage.width*18+6000,y:470,image:platformImage})

]

 genObj = [
    new GenObject({
        x:0,
        y:0,
        image: createImage(background)

    }),new GenObject({
        x:500,
        y:435,
        image: createImage(sign)
    }),new GenObject({
        x:899,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:1798,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:2697,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:3596,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:4495,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:5394,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:6293,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:7192,
        y:0,
        image: createImage(background)
        
    }),new GenObject({
        x:8091,
        y:0,
        image: createImage(background)
        
    })
]



 scrollOff = 0
}
let isGameWon = false;
let congratsMessageTimer = 0;
function drawCongratsMessage() {
    context.font = "40px bold Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("CONGRATS", canvas.width / 2, canvas.height / 2);
}

function resetGame() {
    // Reset game variables
    isGameWon = false;
    congratsMessageTimer = 0;
    init();
}
function animate(){
    requestAnimationFrame(animate)//loop
    context.fillStyle = 'white'
    context.fillRect(0,0,canvas.width,canvas.height)//smooth 
   
genObj.forEach(genObj=>{
    genObj.draw()
})

    platforms.forEach(platform => {
        platform.draw()
       
    })
    //horse.draw()
    player.update()
    
    if(keys.right.pressed&&player.position.x<400){
        player.velocity.x = player.speed
    }else if((keys.left.pressed&&player.position.x>100)||(keys.left.pressed&&scrollOff===0&&player.position.x>0)){
        player.velocity.x = -player.speed
    }
    else {player.velocity.x = 0}
if(keys.right.pressed){
    scrollOff +=player.speed
    platforms.forEach((platform) => {
        platform.position.x-=player.speed
    })
    genObj.forEach(genObj=>{
        genObj.position.x-=player.speed*0.66
    })
    
}else if (keys.left.pressed&&scrollOff>0){
    scrollOff-=player.speed
    platforms.forEach((platform) => {
        platform.position.x+=player.speed
    })
    genObj.forEach(genObj=>{
        genObj.position.x+=player.speed*0.66
    })
}


platforms.forEach((platform) => {
    if(player.position.y + player.height<=platform.position.y&&player.position.y + player.height+player.velocity.y>=platform.position.y&&player.position.x+player.width>=platform.position.x&&player.position.x<=platform.position.x +platform.width){
        player.velocity.y = 0
    }
})
/*
if(
    keys.right.pressed&&lastKey==='right'&&player.currentSprite!==player.sprites.run.right){
    player.frames =1
    player.currentSprite=player.sprites.run.right
    player.currentCW=player.sprites.run.cropW
    player.width =player.sprites.run.width
}else if(keys.left.pressed&&lastKey==='left'&&player.currentSprite!==player.sprites.run.left){
    player.frames =1
    player.currentSprite=player.sprites.run.left
    player.currentCW=player.sprites.run.cropW
    player.width =player.sprites.run.width
}else if(!keys.left.pressed&&lastKey==='left'&&player.currentSprite!==player.sprites.stand.left){
    player.currentSprite=player.sprites.stand.left
    player.currentCW=player.sprites.stand.cropW
    player.width =player.sprites.stand.width
}else if(!keys.right.pressed&&lastKey==='right'&&player.currentSprite!==player.sprites.stand.right){
    player.currentSprite=player.sprites.stand.right
    player.currentCW=player.sprites.stand.cropW
    player.width =player.sprites.stand.width
}*/
if (keys.right.pressed && lastKey === 'right') {
    if (player.currentSprite !== player.sprites.run.right) {
        player.frames = 1;  // Reset frames when switching
        player.currentSprite = player.sprites.run.right;
        player.currentCW = player.sprites.run.cropW;
        player.width = player.sprites.run.width;
    }
} else if (keys.left.pressed && lastKey === 'left') {
    if (player.currentSprite !== player.sprites.run.left) {
        player.frames = 1;  // Reset frames when switching
        player.currentSprite = player.sprites.run.left;
        player.currentCW = player.sprites.run.cropW;
        player.width = player.sprites.run.width;
    }
} else if (!keys.left.pressed && lastKey === 'left') {
    if (player.currentSprite !== player.sprites.stand.left) {
        player.frames = 0;  // Reset frames when switching
        player.currentSprite = player.sprites.stand.left;
        player.currentCW = player.sprites.stand.cropW;
        player.width = player.sprites.stand.width;
    }
} else if (!keys.right.pressed && lastKey === 'right') {
    if (player.currentSprite !== player.sprites.stand.right) {
        player.frames = 0;  // Reset frames when switching
        player.currentSprite = player.sprites.stand.right;
        player.currentCW = player.sprites.stand.cropW;
        player.width = player.sprites.stand.width;
    }
}
//win con
if (scrollOff > 10000 && !isGameWon) {
    isGameWon = true;
    congratsMessageTimer = 100; // Set timer for the message display
}

// Display "CONGRATS" message if the player won
if (isGameWon) {
    drawCongratsMessage();

    // Countdown timer for resetting the game
    if (congratsMessageTimer > 0) {
        congratsMessageTimer--;
    } else {
        resetGame();
    }
}

//lose con
if(player.position.y> canvas.height){
   init()
}

}

init()
animate()

/*addEventListener('keydown', (event)=>{//specific
    console.log(event)
})*/
/*2 exampless */
/*addEventListener('keydown', ()=>{//this is universal
    console.log('keydown')
})*/
addEventListener('keydown', ({ keyCode }) => {
//console.log(keyCode)
switch (keyCode){
    case 65:
        console.log('left')
        keys.left.pressed=true
        lastKey = 'left'
        /*if (player.currentSprite !== player.sprites.run.left) {
            player.currentSprite = player.sprites.run.left;
            player.currentCW = player.sprites.run.cropW;
            player.width = player.sprites.run.width;
            player.frames = 0; // Reset frame count when switching sprite
        }*/
        break
        case 83:
        console.log('down')
        break
        case 68:
        console.log('right')
        keys.right.pressed=true
        lastKey ='right'
        /*player.currentSprite =player.sprites.run.right
        player.currentCW =player.sprites.run.cropW
        player.width = player.sprites.run.width*/
        /*if (player.currentSprite !== player.sprites.run.right) {
            player.currentSprite = player.sprites.run.right;
            player.currentCW = player.sprites.run.cropW;
            player.width = player.sprites.run.width;
            player.frames = 0; // Reset frame count when switching sprite
        }*/
        break
        case 87:
        console.log('up')
        player.velocity.y -= 25
        break
}
})
addEventListener('keyup', ({ keyCode })=>{
    //console.log(keyCode)
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed=false
           /* if (player.currentSprite !== player.sprites.stand.left) {
                player.currentSprite = player.sprites.stand.left;
                player.currentCW = player.sprites.stand.cropW;
                player.width = player.sprites.stand.width;
                player.frames = 0; // Reset frame count when switching sprite
            }*/
            break
            case 83:
            console.log('down')
            break
            case 68:
            console.log('right')
            keys.right.pressed=false
            
            /*if (player.currentSprite !== player.sprites.stand.right) {
                player.currentSprite = player.sprites.stand.right;
                player.currentCW = player.sprites.stand.cropW;
                player.width = player.sprites.stand.width;
                player.frames = 0; // Reset frame count when switching sprite
            }*/
            break
            case 87:
            console.log('up')
            
            break

    }
  
    })//33.42
    //1.01.53
    