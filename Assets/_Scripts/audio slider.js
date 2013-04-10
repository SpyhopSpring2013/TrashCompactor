var inGameVolume : float = 1.0;

function OnGUI () {
    inGameVolume = AudioListener.volume;
    inGameVolume = GUI.HorizontalSlider (Rect (25, 25, 300, 30), inGameVolume, 0.0, 1.0);
}