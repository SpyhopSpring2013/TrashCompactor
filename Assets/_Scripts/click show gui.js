var showMoreGui = false; 

function OnGUI () { 
    if (GUI.Button (Rect (10,10,100,20), "Show More")) 
        showMoreGui = true; 

    if (showMoreGui) { 
       (GUI.Button (Rect (10, 40,100,20), "Hello there"));
        if (GUI.Button (Rect (10, 70,100,20), "Close")) 
            showMoreGui = false; 
    } 
}