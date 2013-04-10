var customSkin: GUISkin;

var screenx: int = 50;
var screeny: int = 50;


function OnGUI () {
	
	
	
	GUI.skin = customSkin;
	
	
	
	if(GUI.Button(Rect(screenx,screeny,200,200), "Play Game"))
	{
		Application.LoadLevel("PlanetExplorer");
	}
	
}