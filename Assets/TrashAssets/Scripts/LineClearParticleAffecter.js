public var sparkEffectGlass: GameObject;
public var sparkEffectPaper: GameObject;
public var sparkEffectPlastic: GameObject;



public var uiManager:UIManager;


public function onClearLine(row:int, style:int)
{
	//uiManager.posOffset; //vector3
	//uiManager.blockSize; //vector3

	//Glass = 1 Paper = 2 Plastic = 3

	if(style == 1){
	Instantiate(sparkEffectGlass, Vector3(uiManager.posOffset.x+uiManager.blockSize.x*10/2,
									uiManager.posOffset.y + uiManager.blockSize.y*row + uiManager.blockSize.y/2,
									uiManager.posOffset.z-1),
									Quaternion.identity);
	}
	if(style == 2){
	Instantiate(sparkEffectPaper, Vector3(uiManager.posOffset.x+uiManager.blockSize.x*10/2,
									uiManager.posOffset.y + uiManager.blockSize.y*row + uiManager.blockSize.y/2,
									uiManager.posOffset.z-1),
									Quaternion.identity);
	}
	if(style == 3){
	Instantiate(sparkEffectPlastic, Vector3(uiManager.posOffset.x+uiManager.blockSize.x*10/2,
									uiManager.posOffset.y + uiManager.blockSize.y*row + uiManager.blockSize.y/2,
									uiManager.posOffset.z-1),
									Quaternion.identity);
	}

	//myParticleEffect.Play();
	/* myParticleEffect.emit = true;
	yield WaitForSeconds (2);
	myParticleEffect.emit = false;
	//myParticleEffect.Play();
	*/
}
