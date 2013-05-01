var impact : AudioClip;

function OnGUI (){
GUI.color = Color.yellow;

GUI.Box(Rect(0,0,100,20), "MENU");
//ButtonsControl
GUILayout.BeginArea(Rect(100,100,200,150));

if (GUILayout.Button ("New Game"))
{
audio.PlayOneShot(impact);
Application.LoadLevel("Game1");

}
if (GUILayout.Button ("Continue"))
{
audio.PlayOneShot(impact);

}
if (GUILayout.Button ("Exit"))
{
audio.PlayOneShot(impact);

}

GUILayout.Box ("Configuration");

if (GUILayout.Button ("Score"))
{
audio.PlayOneShot(impact);
}

GUILayout.Label("Version 1.0");


GUILayout.EndArea();

}

function OnMouseEnter()
{
audio.PlayOneShot(impact);
} 