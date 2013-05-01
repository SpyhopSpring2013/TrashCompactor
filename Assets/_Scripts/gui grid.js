var selGridInt : int = 0;
var selStrings : String[] = ["Grid 1", "Grid 2", "Grid 3", "Grid 4"];

function OnGUI () {
selGridInt = GUI.SelectionGrid (Rect (25, 25, 100, 30), selGridInt, selStrings, 2);
}