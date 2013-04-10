
function Update () {
	
	
	if(Input.GetMouseButton(0))
	{
	this.transform.Rotate(0, 1, 0);
	this.rigidbody.AddRelativeTorque(0, 3, 0);
	}
	if(Input.GetMouseButton(1))
	{
	this.transform.Rotate(1, 0, 0);
	rigidbody.AddRelativeTorque(1, 0, 0);
	}
}