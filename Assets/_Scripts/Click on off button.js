var wasClicked : boolean;

function OnMouseDown() {
    wasClicked = true;
    Activate();
}

function OnMouseUp() {
    wasClicked = false;
    Deactivate();
}

function OnMouseEnter() {
    if (wasClicked) {
        Activate();
    }
}

function OnMouseExit() {
    Deactivate();
}

function Activate() {
    renderer.material.color = Color.grey;
}

function Deactivate() {
    renderer.material.color = Color.white;
}
