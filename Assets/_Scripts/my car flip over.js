private var currentEnginePower : float = 0.0;
var resetTime : float = 1.0;
private var resetTimer : float = 0.0;




function Check_If_Car_Is_Flipped()
{
	if(transform.localEulerAngles.z > 80 && transform.localEulerAngles.z < 280)
	
		resetTimer += Time.deltaTime;
	else
		resetTimer = 0;
	
	if(resetTimer > resetTime)
		FlipCar();
}

function FlipCar()
{
	transform.rotation = Quaternion.LookRotation(transform.forward);
	transform.position += Vector3.up * 0.1;
	rigidbody.velocity = Vector3.zero;
	rigidbody.angularVelocity = Vector3.zero;
	resetTimer = 0;
	currentEnginePower = 50;
}

function Update()
{		
	var relativeVelocity : Vector3 = transform.InverseTransformDirection(rigidbody.velocity);
	
//	GetInput();
	
	Check_If_Car_Is_Flipped();
	
//	UpdateWheelGraphics(relativeVelocity);
//	
//	UpdateGear(relativeVelocity);
}