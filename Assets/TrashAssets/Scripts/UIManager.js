#pragma strict

public var gameManager:GameManager;
public var scoreManager:ScoreManager;
public var screenGrid:ScreenGrid;
public var nextBlockDisplay:NextBlockDisplay;
public var lineClearParticles:LineClearParticleAffecter;
public var guiManager:GUIManager;

public var blockTemplates:GameObject[];

public var posOffset:Vector3 = Vector3(-2.76,-6,-0.5);
public var blockSize:Vector3 = Vector3(0.55, 0.55, 0.55);

public var currentScreen:int = 0;

//screen vars
public var gameScreen:int = 0;
public var startScreen:int = 1;
public var gameOverScreen:int = 2;
public var pauseScreen:int = 3;

//private var curBlocks:Array;
//private var blockObjects:Array;

function Start () 
{
	//curBlocks = new Array();
	//blockObjects = new Array();
	startNewGame(1);
}

function Update () 
{
}

function OnGUI ()
{
	if(currentScreen == gameScreen)
	{
		guiManager.draw = true;
	}
	else
	{
		guiManager.draw = false;
	}
	
	if(currentScreen == gameOverScreen)
	{
		//GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), );
		GUI.Label(Rect(200,200, 200, 200), "GAME OVER");
		GUI.Label(Rect(100,300,500,100), "Final Score: " + (scoreManager.getScore() * (.6+scoreManager.getPercentPurity())).ToString());
	}

}

function gameIsPlaying():boolean
{
	return (currentScreen == gameScreen);
}


//------------- GAME FUNCTIONS -----------\\
//Perform checks to make sure you are playing the game
//Call any UI functions (particles, score update)
//then forward the function to the appropriate game function

function startNewGame(level:int)
{
	//if(gameIsPlaying())
	//{
		if(currentScreen == gameScreen || currentScreen == gameOverScreen)
		{
			setCurrentScreen(gameScreen);

			screenGrid.onNewGame();
			nextBlockDisplay.onNewGame();
			scoreManager.onNewGame(level);
			guiManager.onNewGame(level);
			gameManager.startNewGame(level);
		}
	//}
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

function dropCurrentShape()
{
	if(gameManager.playerHasControl())
	{
		gameManager.dropCurrentShape();
	}
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
	guiManager.onPurityChange(scoreManager.getPercentPurity());
}

function onNewNextShape(xVals:Array, yVals:Array, materials:Array)
{
	nextBlockDisplay.addNewShape(xVals,yVals,materials);
}

function onGameOver()
{
	setCurrentScreen(gameOverScreen);
}

function onAddScore(score:int)
{
	guiManager.addScore(score);
}

function onLevelChange(level:int)
{
	scoreManager.onLevelChange(level);
	guiManager.onLevelChange(level);
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

function setCurrentScreen(screen:int)
{
	currentScreen = screen;	
}