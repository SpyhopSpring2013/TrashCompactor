

var tespawnpoint: Transform;




function OnTriggerEnter( other : Collider ) {
    
    if (other.tag == "killplayer") {
        
       
    Debug.Log("work");
     yield WaitForSeconds (3);
    transform.position = tespawnpoint.position;
   
       
    }



}