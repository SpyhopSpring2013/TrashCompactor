static var racingstarted: boolean = false;






function OnTriggerEnter (other : Collider) {
if (other.gameObject.tag == "startpoint")
{
	racingstarted = true;
}

if (other.gameObject.tag == "endpoint")
{
	racingstarted = false;
}

}