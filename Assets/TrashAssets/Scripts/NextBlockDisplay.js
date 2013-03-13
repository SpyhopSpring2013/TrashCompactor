#pragma strict

public var uiManager:UIManager;

public var posOffset:Vector3 = Vector3(3.0,0,0);
public var blockSizePrimary:Vector3 = Vector3(0.5,0.5,0.5);
public var blockSizeSecondary:Vector3 = Vector3(0.3,0.3,0.3);

private var nextShapes:Array;

function Start () 
{
	nextShapes = new Array();
	for(var i:int = 0; i<3; i++)
	{
		var shape:Array = new Array();
		nextShapes.Push(shape);
	}
}

function Update () 
{

}

function addNewShape(xVals:Array, yVals:Array, materials:Array)
{
	if(nextShapes.length >= 3)
	{
		nextShapes.RemoveAt(0);
	}

	var shapeArray:Array = new Array();

	for(var i:int = 0; i<xVals.length; i++)
	{
		var curX:int = xVals[i];
		var curY:int = yVals[i];
		var curMaterial:int = materials[i];
		var obj:GameObject = Instantiate(uiManager.blockTemplates[curMaterial], 
								Vector3(posOffset.x + blockSizeSecondary.x/2 + curX*blockSizeSecondary.x, 
									    posOffset.y + blockSizeSecondary.y/2 + curY*blockSizeSecondary.y + nextShapes.length*blockSizePrimary.y*5, 
									    posOffset.z), 
								Quaternion.identity);
		obj.transform.localScale = blockSizeSecondary;
		shapeArray.Push(obj);
	}

	nextShapes.Push(shapeArray);

	//make the new first shape bigger
	var curShape:GameObject = nextShapes[0];
	curShape.transform.localScale = blockSizePrimary;
	//TODO: move blocks correctly

}
