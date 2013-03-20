#pragma strict

public var uiManager:UIManager;

public var emptyObject:GameObject;

public var posOffset:Vector3 = Vector3(3.0,3.5,-3.0);
//public var blockSizePrimary:Vector3 = Vector3(0.5,0.5,0.5);
public var blockSizeSecondary:Vector3 = Vector3(0.3,0.3,0.3);

private var nextShapes:Array;

function Awake()
{
	nextShapes = new Array();
}

function Start () 
{
	//nextShapes = new Array();
}

function Update () 
{

}

function addNewShape(xVals:Array, yVals:Array, materials:Array)
{
	Debug.Log(yVals);
	var parentObject:GameObject = Instantiate(emptyObject, Vector3(0,0,0), Quaternion.identity);
	for(var i:int = 0; i<xVals.length; i++)
	{
		var curX:int = xVals[i];
		var curY:int = yVals[i];
		var curMaterial:int = materials[i];
		var obj:GameObject = Instantiate(uiManager.blockTemplates[curMaterial], 
								Vector3(blockSizeSecondary.x/2 + curX*blockSizeSecondary.x, blockSizeSecondary.y/2 + (4-curY)*blockSizeSecondary.y, 0), 
								Quaternion.identity);
		obj.transform.localScale = blockSizeSecondary;
		obj.transform.parent = parentObject.transform;
		//shapeArray.Push(obj);
	}

	parentObject.transform.position = Vector3(posOffset.x, posOffset.y - nextShapes.length*blockSizeSecondary.y*4, posOffset.z);
	nextShapes.Push(parentObject);
}

function removeShapeAt(index:int)
{
	if(index >= nextShapes.length)
	{
		//out of range
		return;
	}

	var removedShaped:GameObject = nextShapes[index];
	var destroyList:Array = new Array();
	for(var child:Transform in removedShaped.transform)
	{
		destroyList.Push(child.gameObject);
	}

	for(var destroyChild in destroyList)
	{
		Destroy(destroyChild);
	}

	nextShapes.RemoveAt(index);

	//shift shapes up
	for(var i:int = index; i<nextShapes.length; i++)
	{
		var shapeObj:GameObject = nextShapes[i];
		shapeObj.transform.Translate(Vector3(0.0,blockSizeSecondary.y*4,0.0));
		if(index == 0)
		{
			//shapeObj.transform.localScale = blockSizePrimary;
		}
	}
}
