var startingPitch = 15;
var timeToDecrease = 5;
//var objectvelocity = this.rigidbody.velocity.sqrMagnitude;
var speed = 0;

function Start() {
audio.pitch = startingPitch;
}

function Update() {

if(this.rigidbody.velocity.sqrMagnitude > speed * speed )


{
	Debug.Log("working");
	audio.pitch = this.rigidbody.angularVelocity.sqrMagnitude;
	

	//audio.pitch = this.position;
		
	//audio.pitch -= ((Time.deltaTime * startingPitch)/ timeToDecrease );
	

}



}
