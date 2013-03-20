#pragma strict

public var debugMode:boolean = false;
public var inputType:int = 0; //0 = keyboard, 1 = iPad

public var uiManager:UIManager;


private var keyPressedRefireTimer:float[] = [0.15,0.15,0.15,0.15];
private var keyPressedRefireDelay:float[] = [0.15, 0.15, 0.15, 0.15];

function Start () 
{

}

function Update () 
{
	//ALL INPUTS CALL GameControlUI functions

//----------------- keyboard input ------------------\\
	switch(inputType)
	{
	case 0:
		for(var i:int = 0; i< 4; i++)
			keyPressedRefireTimer[i] += Time.deltaTime;

		if(keyPressedRefireTimer[0] >= keyPressedRefireDelay[0])
		{
			if(Input.GetKey(KeyCode.RightArrow))
			{
				uiManager.moveCurrentShape(0);
				keyPressedRefireTimer[0] = 0.0;
			}
		}
		if(keyPressedRefireTimer[1] >= keyPressedRefireDelay[1])
		{
			if(Input.GetKey(KeyCode.DownArrow))
			{
				uiManager.moveCurrentShape(1);
				keyPressedRefireTimer[1] = 0.0;
			}
		}
		if(keyPressedRefireTimer[2] >= keyPressedRefireDelay[2])
		{
			if(Input.GetKey(KeyCode.LeftArrow))
			{
				uiManager.moveCurrentShape(2);
				keyPressedRefireTimer[2] = 0.0;
			}
		}
		if(keyPressedRefireTimer[3] >= keyPressedRefireDelay[3])
		{
			if(Input.GetKey(KeyCode.UpArrow))
			{
				uiManager.moveCurrentShape(3);
				keyPressedRefireTimer[3] = 0.0;
			}
		}
		/*
		if(Input.GetKeyDown(KeyCode.RightArrow))
		{
			uiManager.moveCurrentShape(0);
		}
		//else if(Input.GetKeyDown(KeyCode.DownArrow))
		//{
		//	uiManager.moveCurrentShape(1);
		//}
		else if(Input.GetKeyDown(KeyCode.LeftArrow))
		{
			uiManager.moveCurrentShape(2);
		}
		else if(Input.GetKeyDown(KeyCode.UpArrow))
		{
			uiManager.moveCurrentShape(3);
		}
		*/
		if(Input.GetKeyDown(KeyCode.R))
		{
			uiManager.startNewGame(0);
		}
		else if(Input.GetKeyDown(KeyCode.X))
		{
			uiManager.rotateCurrentShapeRight();
		}
		else if(Input.GetKeyDown(KeyCode.Z))
		{
			uiManager.rotateCurrentShapeLeft();
		}
		else if(Input.GetKeyDown(KeyCode.Space))
		{
			uiManager.dropCurrentShape();
		}
		if(debugMode)
		{
			//debug functions
		}
	break;
//--------------------------------------------------//

//------------------- ipad input -------------------\\
	case 1:

	break;
//--------------------------------------------------//	
	default:
		//invalid input
		Debug.Log("INVALID INPUT " + inputType.ToString());
	break;
	}
}

//x off = -3
//y off = -4.7867
//block size = 0.6

