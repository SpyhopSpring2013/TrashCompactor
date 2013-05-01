var btnTexture: Texture;
var camera1 : Camera;
var camera2 : Camera;


function OnGUI () {
	
	if (GUI.Button(Rect(150, 50,100,50), "camera2"))
	{
      camera2.enabled = true;
      camera1.enabled = false;
	}
      
       if (GUI.Button(Rect(50, 50,100,50), "camera1"))
       {
      camera1.enabled = true;
      camera2.enabled = false;
       }
   
}



  
    



function Start () {
   camera1.enabled = true;
   camera2.enabled = false;
}

