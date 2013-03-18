#pragma strict

public var gameManager:GameManager;
public var screenGrid:ScreenGrid;
public var nextBlockDisplay:NextBlockDisplay;
public var lineClearParticles:LineClearParticleAffecter;

public var blockTemplates:GameObject[];

public var posOffset:Vector3 = Vector3(-2.76,-6,-0.5);
public var blockSize:Vector3 = Vector3(0.55, 0.55, 0.55);

//private var curBlocks:Array;
//private var blockObjects:Array;

function Start () 
{
	//curBlocks = new Array();
	//blockObjects = new Array();
}

function Update () 
{

}

function gameIsPlaying():boolean
{
	return true;
}


//------------- GAME FUNCTIONS -----------\\
//Perform checks to make sure you are playing the game
//Call any UI functions (particles, score update)
//then forward the function to the appropriate game function

function startNewGame(level:int)
{
	if(gameIsPlaying())
	{
		gameManager.startNewGame(level);
                      
	}
}

//direction - 0 = right, 1 = down, 2 = left, 3 = up
function moveCurrentShape(direction:int)
{
	if(gameManager.playerHasControl())
		gameManager.moveCurrentShape(direction);
}

//direction - 0 = left, 1 = right
function rotateCurrentShapeRight()
{
	if(gameManager.playerHasControl())
		gameManager.rotateCurrentShapeRight();
}

function rotateCurrentShapeLeft()
{
	if(gameManager.playerHasControl())
		gameManager.rotateCurrentShapeLeft();
}

//---------------- FUNCTIONS CALLED BY GAMEMANAGER ----------- \\

function onPlaceShape(xVals:Array, yVals:Array)
{
	screenGrid.placeCurrentShape();
}

function onAddGridShape(xVals:Array, yVals:Array, material:int)
{
	screenGrid.addGridShape(xVals, yVals, material);
	nextBlockDisplay.removeShapeAt(0);
}

function onMoveCurrentShape(xVals:Array, yVals:Array)
{
	screenGrid.moveCurrentShape(xVals, yVals);
	//add effects
	//...
}

//@param style - Denotes visual effect for clear - 0 = default, 1 = glass, 2 = paper, 3 = plastic, 4 = all glass, 5 = all paper, 6 = all plastic
function onClearLine(row:int, style:int)
{
	screenGrid.clearLine(row);
	lineClearParticles.onClearLine(row,style);
}

function onNewNextShape(xVals:Array, yVals:Array, materials:Array)
{
	nextBlockDisplay.addNewShape(xVals,yVals,materials);
}

/*
function createNewShape(numBlocks:int, xVals:int[], yVals:int[])
{
	curBlocks.Reset();
	for(var i = 0; i<numBlocks; i++)
	{
		curBlocks.Push(Instantiate(glassBlock, xVals[i]*2.0, yVals[i] * 2.0 ));
	}
}

function setShapePosition(xVals:int[], yVals:int[])
{
	for(var i = 0; i < curBlocks.size; i++)
	{
		curBlocks[i].x = xVals[i] * xBlockSize + xBlockOffset;
		curBlocks[i].y = yVals[i] * 2.0;
	}
}

function onLineFinish(lineNum:int, score:int)
{



	for(var i = 0; i< blockObjects.size; i++)
	{
		if(blockObjects[i].y ==lineNum * 2.0)
		{
			destroy(blockObjects[i]);
			blockObjects.RemoveAt(i);
		}
		else if(blockObjects[i].y > lineNum * 2.0)
		{
			blockObjects[i].y -= 2.0;	
		}
	}
}

*/

