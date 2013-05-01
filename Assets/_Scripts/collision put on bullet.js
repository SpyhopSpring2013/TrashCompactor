// put on collision animation

// creates an explosion when the bullet hits a rigid body

//explosion collision
// put on collision animation

var explosion : GameObject;

var explosionholder : GameObject;



	
function OnCollisionEnter ( collision: Collision )
{
	
	var contact: ContactPoint = collision.contacts[0];
	
	var rotation = Quaternion.FromToRotation(Vector3.up, contact.normal);
	//var instantiatedExplosion:GameObject = Instantiate(explosion,contact.point,rotation);
	//var instantiatedSound:GameObject = Instantiate(explosionholder, contact.point,rotation);
	
	Destroy(gameObject, 5);
	

}