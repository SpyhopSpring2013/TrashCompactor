var myskin: GUISkin;


function OnGUI () {
	
	//GUI.color = Color.yellow;
	GUI.skin = myskin;
	if (GUI.Button(Rect(20, 20,125,50), "Reset"))
	{
    Application.LoadLevel("Effects Machine 11");
	}
      
    
}



  
    



