var mysound: AudioClip;

private var nextFire = 7;

function Update () {
if (Input.GetButton ("Fire1") && Time.time > nextFire) {

audio.PlayOneShot(mysound);
}
}