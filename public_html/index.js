var game;
var platform;
var star;
var groupstar;
var dude;
var cursor;
var scoresound;
var score=0;
var scoretext;

$(function(){
  game= new Phaser.Game(
      800,600, Phaser.AUTO, "",
      {
          preload: preload,
          create: create,
          update: update
      }
  );
  });
    
    function preload(){
        game.load.image("star","assets/star.png");
        game.load.image("ground","assets/platform.png");
        game.load.image("sky","assets/sky.png");
        game.load.image("diamond","assets/diamond.png");
        game.load.spritesheet("dude","assets/dude.png",32,48);
      game.load.audio("score","assets/score.wav");
        console.log("===preload");
    }
    function create(){
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,"sky");
        // game.add.sprite(50,50,"star");
     //  game.add.sprite(400,400,"ground");
        //game.add.sprite(-150,200,"ground");
        
         platform= game.add.group();
         platform.enableBody=true;
        
        
         var ground = platform.create(0,game.world.height-64,"ground");
        ground.scale.setTo(2,2);
        ground.body.immovable=true;//to stop the ground from moving...physics
        var ground1=platform.create(400,400,"ground");
        ground1.body.immovable=true;
        var ground2= platform.create(-150,200,"ground");
        ground2.body.immovable=true;
       // var ground3=
         dude= game.add.sprite(32,game.world.height-150,"dude");
        dude.animations.add("left",[0,1,2,3],10,true);
        dude.animations.add("right",[5,6,7,8],10,true);
       // dude.animation.add("up",[4],10,true);//defined in else for frame
       
      
        
        game.physics.arcade.enable(dude);
        dude.body.bounce.y=0.5;
        dude.body.gravity.y=300;
        dude.body.collideWorldBounds=true;
        
      //  star.add.sprite(0,10,"diamond");
        //groupstar=star.add.group();
        //var i=0;
        //var group2= groupstar.create(i,star.world.height-10,"star");
        //game.add.sprite(0,575,"ground");
        scoretext=game.add.text(
                30,30,"score:0",{fontsize:"32px",fontweight:"bolder"});
        
        star=game.add.group();
        star.enableBody=true;
        for( var i=1;i<=12;i++){
          var temp =  star.create((i*70),0,"star");
            temp.body.bounce.y=0.1;
            temp.body.gravity.y=(50*Math.random())+10;
           
        }
         
       scoresound= game.add.audio("score");
       cursor= game.input.keyboard.createCursorKeys();
        
    }
    function update(){
        game.physics.arcade.collide(dude,platform);
        game.physics.arcade.collide(star,platform);
        game.physics.arcade.collide(star,dude,stardude);
       if(cursor.left.isDown){
           dude.animations.play("left");
           dude.body.velocity.x=-50;
          
           
       } 
       else if(cursor.right.isDown){
           dude.animations.play("right");
           dude.body.velocity.x=50;
           
       }
       else if(cursor.up.isDown){
           dude.body.velocity.y=-150;
       }
       else {
           
           dude.animations.frame=4;
           dude.body.velocity.x=0;
           
       }
       
    }
    function stardude(dude,star){
        if((dude.body.velocity.x>10 && dude.body.velocity.y>-10))
        {
        star.kill();
        scoresound.play();
         score=score+10;
         scoretext.text="score"+score;
     }
     else {
         if(dude.body.velocity.x>0){
             star.body.velocity.x=10;
         
     }else
     {
             star.body.velocity.x=-10;
             }
     }
    }