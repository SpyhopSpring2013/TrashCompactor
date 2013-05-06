


// put on collision animation

// creates an explosion when the bullet hits a rigid body

//explosion collision
// put on collision animation

var explosion : GameObject;

var explosionholder : GameObject;

var mytimer : int = 0;

var colorreset : boolean = false;


	
function OnCollisionEnter ( collision: Collision )
{
	
	var contact: ContactPoint = collision.contacts[0];
	
	var rotation = Quaternion.FromToRotation(Vector3.up, contact.normal);
	//var instantiatedExplosion:GameObject = Instantiate(explosion,contact.point,rotation);
	//var instantiatedSound:GameObject = Instantiate(explosionholder, contact.point,rotation);
	
	
	if(collision.gameObject.tag == "player")
	{
	gameObject.renderer.material.color = Color.yellow;
	Debug.Log("hitthis");
	mytimer++;
	colorreset = false;
	
	if(mytimer >= 2)
	{
		gameObject.renderer.material.color = Color.white;
		Debug.Log("timer");
		colorreset = true;
		mytimer = 0;
	}
	}

	
	
	

}


