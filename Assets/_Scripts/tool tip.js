function OnGUI () {
// Make a button using a custom GUIContent parameter to pass in the tooltip.
GUI.Button (Rect (10,10,100,20), GUIContent ("Click me", "This is the tooltip"));

// Display the tooltip from the element that has mouseover or keyboard focus
GUI.Label (Rect (10,40,100,40), GUI.tooltip);
}