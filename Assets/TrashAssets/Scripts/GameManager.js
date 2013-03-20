#pragma strict

public var uiManager:UIManager;
public var scoreManager:ScoreManager;

private var gridTiles:Array;

private var currentShape:GridShape;
private var nextShapes:Array;

private var kMaxRows:int = 26;
private var kMaxColumns:int = 10;

private var lockTimer:float = 0.0;
private var lockTimerOn:boolean = false;
private var lockTimerDelay:float = 0.5;

private var currentShapeMoveTimer:float = 0.0;
private var currentShapeMoveDelay:float;

private var canMoveDownLast:boolean = true;

private var gameLevel:int = 1;
private var linesCleared:int = 0;



function Start () 
{
	gridTiles = new Array();
	//24 rows
	for(var i:int = 0; i < kMaxRows; i++)
	{
		pushEmptyLine();
	}

	nextShapes = new Array();
	for(i = 0; i < 3; i++)
	{
		var shape:GridShape = new GridShape(Random.Range(0,7),Random.Range(1,4),0,2,18);
		nextShapes.Push(shape);
		var blockCoord:Array = getShapeBlockCoord(shape.m_shape, shape.m_rotation);
		var xArray:Array = blockCoord[0];
		var yArray:Array = blockCoord[1];
		var matArray:Array = new Array();
		for(var j:int = 0; j< xArray.length; j++)
		{
			matArray.Push(shape.m_material);
		}
		uiManager.onNewNextShape(xArray, yArray, matArray);	
	}
	addNextGridShape();
	
	setGameLevel(1);
	/*
	Debug.Log(currentShape.m_shape);
	Debug.Log(currentShape.m_x);
	*/

}

function Update () 
{
	/*
	if(lockTimerOn)
	{
		lockTimer += Time.deltaTime;
	}
	else
	{
		lockTimer = 0.0;
	}

	if(lockTimer >= lockTimerDelay)
	{
		if(currentShape)
		{
			placeShape(currentShape);
		}
		else
		{
			addNextGridShape();
			lockTimerOn = false;
		}
		lockTimer = 0.0;
	}
	*/

	currentShapeMoveTimer += Time.deltaTime;
	if(currentShapeMoveTimer >= currentShapeMoveDelay)
	{
		if(currentShape)
		{
			//move down a step
			moveCurrentShape(1);
		}

		currentShapeMoveTimer = 0.0;
	}

}

//----------- Functions called by UIManager ---------\\
function startNewGame(level:int):void
{
}

function playerHasControl():boolean
{
	if(currentShape)
		return true;
	else
		return false;
}

function moveCurrentShape(direction:int)
{
	if(direction == 0)
		moveShape(currentShape, currentShape.m_x+1, currentShape.m_y);
	else if(direction == 1)
	{
		//if can't move shape down, place it instead
		if(!moveShape(currentShape, currentShape.m_x, currentShape.m_y-1))
		{
			placeShape(currentShape);
			addNextGridShape();
		}
		//reset down timer when you move down
		currentShapeMoveTimer = 0.0;
	}
	else if(direction == 2)
		moveShape(currentShape, currentShape.m_x-1, currentShape.m_y);
	else if(direction == 3)
		moveShape(currentShape, currentShape.m_x, currentShape.m_y+1);
}

function rotateCurrentShapeRight()
{
	rotateShapeRight(currentShape);
}

function rotateCurrentShapeLeft()
{
	rotateShapeLeft(currentShape);
}

function dropCurrentShape()
{
	dropShape(currentShape);
}

//----------- Functions that callback to UIManager -------\\

function isLineFilled(row:int):boolean
{
	var line:Array = gridTiles[row];
	for(var i:int = 0; i<kMaxColumns; i++)
	{
		var tile:GridBlock = line[i];
		if(tile.m_material == 0)
			return false;
	}
	return true;
}

function clearLine(row:int)
{
	//determine clear style
	//see UIManager for styles
	var materialCounts:Array = new Array();
	for(var materialIt:int = 0; materialIt < 4; materialIt++)
		materialCounts.Push(0);

	var rowArray:Array = gridTiles[row];
	for(var i:int = 0; i< kMaxColumns; i++)
	{
		var block:GridBlock = rowArray[i];
		var materialNum:int = materialCounts[block.m_material];
		materialNum++;
		materialCounts[block.m_material] = materialNum;
	}

	var glassCount:int = materialCounts[1];
	var paperCount:int = materialCounts[2];
	var plasticCount:int = materialCounts[3];
	var style:int = 0;
	if(glassCount == 10)
		style = 4;
	else if(paperCount == 10)
		style = 5;
	else if(plasticCount == 10)
		style = 6;
	//in the event of ties, winners are glass > paper > plastic
	else if(glassCount >= paperCount && glassCount >= plasticCount)
	{
		style = 1;
	}
	else if(paperCount >= glassCount && paperCount >= plasticCount)
	{
		style = 2;
	}
	else
	// {material != 0}
	{
		style = 3;
	}


	gridTiles.RemoveAt(row);
	linesCleared++;
	if(linesCleared % 5 == 0)
	{
		setGameLevel(gameLevel + 1);
	}
	pushEmptyLine();
	scoreManager.onClearLine(materialCounts);
	uiManager.onClearLine(row,style);
}


//----------- Internal Functions ------------\\

function pushEmptyLine()
{
	var rowNum:int = gridTiles.length;
	gridTiles.Push(new Array());
	for(var j:int = 0; j < kMaxColumns; j++)
	{
		var row:Array = gridTiles[rowNum];
		row.Push(new GridBlock(0)); //fill with empty blocks
	}
}


function isMovementPossible(shape:GridShape,x:int, y:int, rotation:int):boolean
{
	var oldRotation = shape.m_rotation;
	shape.m_rotation = rotation;
	var blocks = shape.getGridBlocks();
	shape.m_rotation = oldRotation;
	for(var i:int = 0; i<5; i++)
	{
		for(var j:int = 0; j<5; j++)
		{
			var blockX:int = i;
			var blockY:int = 4-j;
			
			if(blocks[blockY][blockX])
			{
				var gridX:int = i+x;
				var gridY:int = j+y;
				if(gridX < 0 || gridX > kMaxColumns-1 || gridY < 0 || gridY > kMaxRows-1)
				{
					return false;
				}
				var row:Array = gridTiles[gridY];
				var block:GridBlock = row[gridX];
				if(block.m_material)
				{
					return false;
				}
			}
		}
	}
	return true;
}

function placeShape(shape:GridShape)
{
	
	var blocks = shape.getGridBlocks();
	currentShape = null;

	var xVals:Array = new Array();
	var yVals:Array = new Array();
	for(var i = 0; i<5; i++)
	{
		for(var j = 0; j<5; j++)
		{
			var blockX = i;
			var blockY = 4-j;
			
			if(blocks[blockY][blockX])
			{
				var gridX = i+shape.m_x;
				var gridY = j+shape.m_y;
				var row:Array = gridTiles[gridY];
				var block:GridBlock = row[gridX];
				block.m_material = shape.m_material;
				xVals.Push(gridX);
				yVals.Push(gridY);
			}
		}
	}
	uiManager.onPlaceShape(xVals, yVals);

	//check if any lines are full
	var lastY:int = -1;
	//start at top row to avoid indexing problems
	for(var blockIt:int = yVals.length - 1; blockIt >= 0; blockIt--)
	{
		if(lastY == yVals[blockIt])
			continue;

		if(isLineFilled(yVals[blockIt]))
		{
			clearLine(yVals[blockIt]);
		}

		lastY = yVals[blockIt];
	}

}

function moveShape(shape:GridShape,x:int, y:int):boolean
{
	if(!isMovementPossible(shape,x,y,shape.m_rotation))
		return false;
	var blocks = shape.getGridBlocks();

	//x and y vals for screenGrid
	var xVals:Array = new Array();
	var yVals:Array = new Array();
	for(var i:int = 0; i<5; i++)
	{
		for(var j:int = 0; j<5; j++)
		{
			var blockX:int = i;
			var blockY:int = 4-j;
			
			if(blocks[blockY][blockX])
			{
				var gridX:int = i+x;
				var gridY:int = j+y;
				var row:Array = gridTiles[gridY];
				var block:GridBlock = row[gridX];
				xVals.Push(gridX);
				yVals.Push(gridY);
			}
		}
	}
	shape.m_x = x;
	shape.m_y = y;
	uiManager.onMoveCurrentShape(xVals, yVals);
	//check if locktimer should be enabled
	/*
	if(isMovementPossible(shape,shape.m_x, shape.m_y-1, shape.m_rotation))
	{
		lockTimerOn = false;
	}
	else
	{
		lockTimerOn = true;
	}
	*/
	//if movement down was possible, but isn't anymore, reset the move timer
	var canMoveDown:boolean = isMovementPossible(shape, shape.m_x, shape.m_y-1, shape.m_rotation);
	if(canMoveDownLast && !canMoveDown)
	{
		currentShapeMoveTimer = 0.0;
	}
	canMoveDownLast = canMoveDown;


	return true;
}

function getShapeGridCoord(shape:GridShape):Array
{
	var xVals:Array = new Array();
	var yVals:Array = new Array();
	var blocks = shape.getGridBlocks();
	//reset old blocks
	for(var i:int = 0; i<5; i++)
	{
		for(var j:int = 0; j<5; j++)
		{
			var blockX:int = i;
			var blockY:int = 4-j;
			if(blocks[blockY][blockX])
			{

				var gridX:int = i+shape.m_x;
				var gridY:int = j+shape.m_y;
				var row:Array = gridTiles[gridY];
				var block:GridBlock = row[gridX];
				xVals.Push(gridX);
				yVals.Push(gridY);
			}
		}
	}
	var retArray:Array = new Array();
	retArray.Push(xVals);
	retArray.Push(yVals);
	return retArray;
}

function getShapeBlockCoord(shape:int, rotation:int):Array
{
	var xVals:Array = new Array();
	var yVals:Array = new Array();
	var blocks = GridShape.shapeTypes[shape][rotation];
	//reset old blocks
	for(var i:int = 0; i<5; i++)
	{
		for(var j:int = 0; j<5; j++)
		{
			var blockX:int = i;
			var blockY:int = 4-j;
			if(blocks[blockY][blockX])
			{

				xVals.Push(blockX);
				yVals.Push(blockY);
			}
		}
	}
	var retArray:Array = new Array();
	retArray.Push(xVals);
	retArray.Push(yVals);
	return retArray;
}

function setShapeRotation(shape:GridShape, rotation:int):boolean
{
	var curX:int = shape.m_x;
	var curY:int = shape.m_y;
	var oldRotation:int = shape.m_rotation;
	var shapeCoords:Array;

	//pre-rotate shape
	shape.m_rotation = rotation;

	if(!moveShape(shape,curX,curY))
	{
		/*
		var xVals:Array = getShapeBlockCoord(shape.m_shape,rotation)[0];
		//attempt wall kick/floor kick - in order right-left-up
		for(var i:int = 0; i<xVals.length; i++)
		{
			curX = xVals[i];
			if(curX == 2)
				continue;
			if(moveShape(shape,curX,curY))
			{
				shapeCoords = getShapeGridCoord(shape);
					uiManager.onMoveCurrentShape(shapeCoords[0], shapeCoords[1]);
				return true;
			}
		}
		*/
		if(moveShape(shape,curX+1,curY))
		{
			//empty
		}
		else if(moveShape(shape, curX-1,curY))
		{
			//empty
		}
		//if I block - special 2 check
		else if(shape.m_shape == 0 && moveShape(shape,curX-2, curY))
		{
			//empty
		}
		else if(shape.m_shape == 0 && moveShape(shape,curX+2,curY))
		{
			//empty
		}
		else if(moveShape(shape, curX, curY+1))
		{
			//empty
		}
		else if( shape.m_shape == 0 && moveShape(shape, curX, curY+2))
		{
			//empty
		}
		else
		{
			//unsuccessful - restore old rotation
			shape.m_rotation = oldRotation;
			return false;
		}
	}

	//successful move
	shapeCoords = getShapeGridCoord(shape);

	uiManager.onMoveCurrentShape(shapeCoords[0], shapeCoords[1]);
	return true;
}

function rotateShapeRight(shape:GridShape):boolean
{
	return setShapeRotation(shape, (shape.m_rotation + 1) % 4);
}

function rotateShapeLeft(shape:GridShape):boolean
{
	return setShapeRotation(shape, (shape.m_rotation + 4 - 1 ) % 4);
}

function addGridShape(shape:GridShape)
{
	var blocks = shape.getGridBlocks();
	var xVals:Array = new Array();
	var yVals:Array = new Array();
	for(var i:int = 0; i<5; i++)
	{
		for(var j:int = 0; j<5; j++)
		{
			var blockX:int = i;
			var blockY:int = 4-j;
			
			if(blocks[blockY][blockX])
			{
				var gridX:int = i+shape.m_x;
				var gridY:int = j+shape.m_y;
				var row:Array = gridTiles[gridY];
				var block:GridBlock = row[gridX];
				if(block.m_material)
				{
					block.m_material = shape.m_material;
				}
				xVals.Push(gridX);
				yVals.Push(gridY);
			}
		}
	}
	uiManager.onAddGridShape(xVals, yVals, shape.m_material);
}

function addNextGridShape()
{
	addGridShape(nextShapes[0]);
	currentShape = nextShapes[0];
	nextShapes.RemoveAt(0);
	var shape:GridShape = new GridShape(Random.Range(0,7),Random.Range(1,4),0,2,18);
	nextShapes.Push(shape);
	var blockCoord:Array = getShapeBlockCoord(shape.m_shape, shape.m_rotation);
	var xArray:Array = blockCoord[0];
	var yArray:Array = blockCoord[1];
	var matArray:Array = new Array();
	for(var i:int = 0; i< xArray.length; i++)
	{
		matArray.Push(shape.m_material);
	}
	uiManager.onNewNextShape(xArray, yArray, matArray);
}

function setGameLevel(level:int)
{
	gameLevel = level;
	currentShapeMoveDelay = 2.0/level;
}

function dropShape(shape:GridShape):boolean
{
	while(moveShape(shape, shape.m_x, shape.m_y-1))
	{
	}
	placeShape(shape);
	addNextGridShape();
}

