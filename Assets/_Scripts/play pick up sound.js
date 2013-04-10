
var soundeffect: AudioClip;


function OnCollisionEnter(collision : Collision) {
// Rotate the object so that the y-axis faces along the normal of the surface
var contact = collision.contacts[0];
var rot = Quaternion.FromToRotation(Vector3.up, contact.normal);
var pos = contact.point;
  audio.PlayOneShot(soundeffect);

}