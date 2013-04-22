#pragma strict

public var uiManager:UIManager;

private var kMaxRows:int = 26;
private var kMaxColumns:int = 10;

private var gridObjects:Array; //array -> GameObject
private var currentObjects:Array; //GameObject
private var currentGridX:Array; //int
private var currentGridY:Array; //int

private var ghostObjects:Array; //GameObject

function Start () 
{
}

function Update () 
{

}

function onNewGame()
{
	if(gridObjects)
	{
		for(var j:int = 0; j<gridObjects.length; j++)
		{
			var row:Array = gridObjects[j];
			for(var j1:int = 0; j1<row.length; j1++)
			{
				var obj:GameObject = row[j1];
				Destroy(obj);
			}
		}
	}
	if(currentObjects)
	{
		for(var k:int = 0; k<currentObjects.length; k++)
		{
			var obj2:GameObject = currentObjects[k];
			Destroy(obj2);
		}
	}
	if(ghostObjects)
	{
		for(var l:int = 0; l<ghostObjects.length; l++)
		{
			var obj3:GameObject = ghostObjects[l];
			Destroy(obj3);
		}
	}
	gridObjects = new Array();
	for(var i:int = 0; i< kMaxRows; i++)
	{
		pushEmptyLine();
	}
	currentObjects = new Array();
	currentGridX = new Array();
	currentGridY = new Array();
	ghostObjects = new Array();
}

function pushEmptyLine()
{
	var rowNum:int = gridObjects.length;
	gridObjects.Push(new Array());
	for(var j:int = 0; j< kMaxColumns; j++)
	{
		var row:Array = gridObjects[rowNum];
		row.Push(null); //null gameobject
	}
}


function addGridShape(xVals:Array, yVals:Array, material:int)
{
	//clear old shape
	if(currentObjects.length > 0)
	{
		placeCurrentShape();
	}
	for(var i:int = 0; i<xVals.length; i++)
	{
		var curX:int = xVals[i];
		var curY:int = yVals[i];
		var obj:GameObject = Instantiate(uiManager.blockTemplates[material], 
								Vector3(uiManager.posOffset.x + uiManager.blockSize.x/2 + curX*uiManager.blockSize.x, 
									    uiManager.posOffset.y + uiManager.blockSize.y/2 + curY*uiManager.blockSize.y, 
									    uiManager.posOffset.z), 
								Quaternion.identity);
		obj.transform.localScale = uiManager.blockSize;
		currentObjects.Push(obj);
		currentGridX.Push(xVals[i]);
		currentGridY.Push(yVals[i]);
	}
}

function moveCurrentShape(xVals:Array, yVals:Array)
{
	for(var i:int = 0; i<xVals.length; i++)
	{
		var curX:int = xVals[i];
		var curY:int = yVals[i];
		var obj:GameObject = currentObjects[i];
		obj.transform.position = Vector3(uiManager.posOffset.x + uiManager.blockSize.x/2 + curX*uiManager.blockSize.x, 
										 uiManager.posOffset.y + uiManager.blockSize.y/2 + curY*uiManager.blockSize.y, 
										 uiManager.posOffset.z);
		currentGridX[i] = xVals[i];
		currentGridY[i] = yVals[i];
	}
}

function placeCurrentShape()
{
	for(var objIt:int = 0; objIt < currentObjects.length; objIt++)
	{
		var currentObj:GameObject = currentObjects[objIt];
		var gridRow:Array = gridObjects[Mathf.Round((currentObj.transform.position.y - uiManager.posOffset.y - uiManager.blockSize.y/2) / uiManager.blockSize.y)];
		gridRow[Mathf.Round((currentObj.transform.position.x - uiManager.posOffset.x - uiManager.blockSize.x/2) / uiManager.blockSize.x)] = currentObj;
	}
	currentObjects.Clear();
	currentGridX.Clear();
	currentGridY.Clear();

	//clear ghost shape
	if(ghostObjects.length > 0)
	{
		for(var obj:GameObject in ghostObjects)
		{
			Destroy(obj);
		}
		ghostObjects.Clear();
	}
}

function clearLine(row:int)
{
	var oldRow:Array = gridObjects[row];
	for(var objIt:int = 0; objIt < kMaxColumns; objIt++)
	{
		var oldObj:GameObject = oldRow[objIt];
		if(oldObj)
			Destroy(oldObj);
	}
	gridObjects.RemoveAt(row);
	pushEmptyLine();
	//shift blocks down
	for(var i:int = row; i<kMaxRows; i++)
	{
		var curRow:Array = gridObjects[i];
		for(var j:int = 0; j<kMaxColumns; j++)
		{
			var block:GameObject = curRow[j];
			if(block)
			{
				block.transform.position.y -= uiManager.blockSize.y;
			}
		}
	}
}

function newGhostShape(xVals:Array, yVals:Array, material:int)
{
	if(ghostObjects.length > 0)
		ghostObjects.Clear();

	for(var i:int = 0; i<xVals.length; i++)
	{
		var curX:int = xVals[i];
		var curY:int = yVals[i];
		var obj:GameObject = Instantiate(uiManager.blockTemplates[material], 
								Vector3(uiManager.posOffset.x + uiManager.blockSize.x/2 + curX*uiManager.blockSize.x, 
									    uiManager.posOffset.y + uiManager.blockSize.y/2 + curY*uiManager.blockSize.y, 
									    uiManager.posOffset.z), 
								Quaternion.identity);
		obj.transform.localScale = uiManager.blockSize;
		for(var child:Transform in obj.transform)
			child.renderer.material.color.a = 0.35;
		ghostObjects.Push(obj);
	}
}

function moveGhostShape(xArray:Array, yArray:Array)
{
	for(var i:int = 0; i<xArray.length; i++)
	{
		var curX:int = xArray[i];
		var curY:int = yArray[i];
		var obj:GameObject = ghostObjects[i];
		obj.transform.position = Vector3(uiManager.posOffset.x + uiManager.blockSize.x/2 + curX*uiManager.blockSize.x, 
										 uiManager.posOffset.y + uiManager.blockSize.y/2 + curY*uiManager.blockSize.y, 
										 uiManager.posOffset.z);
	}
}