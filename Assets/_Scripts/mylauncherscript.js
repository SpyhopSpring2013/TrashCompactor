
var projectile: Rigidbody;
var speed = 20;

function  update()
{
	
	if(Input.GetButtonDown("Fire1"))
	{
		
		Debug.Log("fire");
		var instantiatedProjectile: Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
		
		instantiatedProjectile.velocity = transform.TransformDirection(Vector3(speed,20,20));
		
	    Physics.IgnoreCollision(instantiatedProjectile.collider, transform.root.collider);
	}
}