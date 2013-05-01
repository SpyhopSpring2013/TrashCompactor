var wasClicked : boolean;
var myaudio: AudioClip;

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
    audio.PlayOneShot(myaudio);
    renderer.material.color = Color.grey;
}

function Deactivate() {
    renderer.material.color = Color.white;
}
