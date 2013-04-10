var soundeffect: AudioClip;



function OnTriggerEnter( other : Collider ) {
    
  if(other.tag == "player")
  {
           
    audio.PlayOneShot(soundeffect); 
     Debug.Log("hit"); 
  }  
        
       
      
}