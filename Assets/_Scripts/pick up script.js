// put this on the player to collect points




var score = 0;
var scoreText = "Score: 0";
var soundeffect: AudioClip;
var myskin: GUISkin;

	

function OnTriggerEnter( other : Collider ) {
    
    if (other.tag == "dice") {
      
        score += 5;
        scoreText = "Score: " + score;
        audio.PlayOneShot(soundeffect); 
        Destroy(other.gameObject); 
        
       
    }
}

function OnGUI () {
	 GUI.skin = myskin;
     GUI.Label(Rect (130, 15, 500, 50), scoreText);
    
     
}