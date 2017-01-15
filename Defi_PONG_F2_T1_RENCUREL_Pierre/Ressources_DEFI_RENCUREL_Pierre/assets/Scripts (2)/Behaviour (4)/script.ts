
const BALLSPEED = 3;  //Constant defining the base speed of the ball

let scoreP1 = 0;  //Variable setting the score of player 1
let scoreP2 = 0;  //Variable setting the score of player 2
let inGameMusicPlayer = new Sup.Audio.SoundPlayer("Music", 1.0, { loop: true }); //Music set to be used later down the line

class BeP1 extends Sup.Behavior { //Behaviour of the Player 1 Racket
  awake() {
    
  }

  update() {
    let velP1 = this.actor.arcadeBody2D.getVelocity(); //Set the base velocity of player 1's racket
    velP1.y = 0;
    
    if(Sup.Input.isKeyDown("Z") && this.actor.getY() < 646) { //On Z key down set the racket's movement
      velP1.y = 10; //Move the racket up
    }
    
    if(Sup.Input.isKeyDown("S") && this.actor.getY() > 64) {  //On S key down set the racket's movement
      velP1.y = -10;  //Move the racket down
    }
    
    if(Sup.Input.isKeyDown("Q") && this.actor.getX() > 16 && (scoreP1 >= 4) || (scoreP2 >= 4)) { //On Q key down set the racket's movement
      velP1.x = -5; //Move the racket to the left
    }
    
    if(Sup.Input.isKeyDown("D") && this.actor.getX() < 48 && (scoreP1 >= 4) || (scoreP2 >= 4)) { //On D key down set the racket's movement
      velP1.x = 5; //Move the racket to the right
    }
    
    this.actor.arcadeBody2D.setVelocity(velP1); //Set the new velocity to the racket in order to move
  }
}
Sup.registerBehavior(BeP1);



class BeP2 extends Sup.Behavior { //Behaviour of the player 2 Racket
  awake() {
    
  }

  update() {
    let velP2 = this.actor.arcadeBody2D.getVelocity(); //Set the base velocity of player 2's racket
    velP2.y = 0; 
    
    if(Sup.Input.isKeyDown("UP") && this.actor.getY() < 646) {  //On arrow up key down set the racket's movement
      velP2.y = 10; //Move the racket up
    }
    
    if(Sup.Input.isKeyDown("DOWN") && this.actor.getY() > 64) { //On arrow down key down set the racket's movement
      velP2.y = -10;  //Move the racket down
    }
    
    if(Sup.Input.isKeyDown("LEFT") && this.actor.getX() > 1232 && (scoreP1 >= 4) || (scoreP2 >= 4)) { //On arrow left key down set the racket's movement
      velP2.x = -5; //Move the racket to the left
    }
    
    if(Sup.Input.isKeyDown("RIGHT") && this.actor.getX() < 1264 && (scoreP1 >= 4) || (scoreP2 >= 4)) { //On arrow right key down set the racket's movement
      velP2.x = 5; //Move the racket to the right
    }
    
    this.actor.arcadeBody2D.setVelocity(velP2); //Set the new velocity to the racket in order to move
  }
}
Sup.registerBehavior(BeP2);



class BeBall extends Sup.Behavior { //Behaviour of the Ball
  
  Speed = BALLSPEED;  //Speed of the ball
  dx = 1;     //Direction of the ball (d standing for direction) on the x axis
  dy = 1;     //Direction of the ball (d standing for direction) on the y axis
  
  awake() {
    
  }

  update() {
    
    let velBall = this.actor.arcadeBody2D.getVelocity();  //Local variable used to increment the ball's velocity
    
    if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies())){ //Consequences of collision between the ball and the rackets
      this.dx = this.dx * -1; //Change of direction by inverting the velocity
      this.Speed = this.Speed + 1;  //Increase of the speed on contact with a Racket
      
      if ((scoreP1 >= 2) || (scoreP2 >= 2)){
        
        Sup.Audio.playSound("Sound"); //Play the "beep" sound on impact
      }
      
      if ((scoreP1 >= 3) || (scoreP2 >= 3)){
        
        inGameMusicPlayer.play(); //Start the Music
      }
      
    }
    
    if(this.actor.getY() > 712 || this.actor.getY() < 8){ //Consequence of the ball colliding with the bottom and top borders
      
      this.dy = this.dy * -1; //Change of direction by inverting the ball's velocity
      
    }
    
    if(this.actor.getX() > 1272){ //Consequences of the ball colliding with the right end of the screen
       
      this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector3(640 , 360 , 0));  //Reset of the ball's position
      this.dx = this.dx * -1; //Change of direction of the ball (to imitate the service)
      scoreP1 = scoreP1 + 1;  //Increase of the player 1's score (player 1 being on the left)
      this.Speed = BALLSPEED; //Reset of the ball's speed using the defined constant
    }
    
    if(this.actor.getX() < 8){  //Consequences of the ball colliding with the left end of the screen
       
      this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector3(640 , 360 , 0));  //Reset of the ball's position
      this.dx = this.dx * -1; //Change of direction of the ball (to imitate the service)
      scoreP2 = scoreP2 + 1;  //Increase of the player 2's score (player 2 being on the right)
      this.Speed = BALLSPEED; //Reset of the ball's speed using the defined constant
    }
       
    velBall.x = this.Speed * this.dx;
    velBall.y = this.Speed * this.dy;
    
    this.actor.arcadeBody2D.setVelocity(velBall); //Attribution of the ball's velocity
  }
}
Sup.registerBehavior(BeBall);


class BeScore extends Sup.Behavior {  //Behaviour used to show the score
  awake() {
    
  }

  update() {
    this.actor.textRenderer.setText(scoreP1 + " : " + scoreP2); //Visual update of the score
  }
}
Sup.registerBehavior(BeScore);