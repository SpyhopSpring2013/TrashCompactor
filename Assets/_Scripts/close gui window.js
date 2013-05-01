

// boolean variable to decide whether to show the window or not.
// Change this from the in-game GUI, scripting, the inspector or anywhere else to
// decide whether the window is visible
var doWindow0 : boolean = true;

// Make the contents of the window.
function DoWindow0 (windowID : int) {
GUI.Button (Rect (10,30, 80,20), "Click Me!");

}

function OnGUI () {

// Make a toggle button for hiding and showing the window
doWindow0 = GUI.Toggle (Rect (10,10,100,20), doWindow0, "Window 0");

// Make sure we only call GUI.Window if doWindow0 is true.
if (doWindow0)
GUI.Window (0, Rect (110,10,200,60), DoWindow0, "Basic Window");
GUI.DragWindow (Rect ());
}