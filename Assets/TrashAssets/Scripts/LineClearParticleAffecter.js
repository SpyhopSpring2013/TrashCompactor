public var sparkEffect: GameObject;

public var uiManager:UIManager;


public function onClearLine(row:int, style:int)
{
	//uiManager.posOffset; //vector3
	//uiManager.blockSize; //vector3

	Instantiate(sparkEffect, Vector3(uiManager.posOffset.x+uiManager.blockSize.x*10/2,
									uiManager.posOffset.y + uiManager.blockSize.y*row + uiManager.blockSize.y/2,
									uiManager.posOffset.z),
									Quaternion.identity);

	//myParticleEffect.Play();
	/* myParticleEffect.emit = true;
	yield WaitForSeconds (2);
	myParticleEffect.emit = false;
	//myParticleEffect.Play();
	*/
}
