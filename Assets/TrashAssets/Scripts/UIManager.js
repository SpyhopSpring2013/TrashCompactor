#pragma strict

public var gameManager:GameManager;
public var scoreManager:ScoreManager;
public var screenGrid:ScreenGrid;
public var nextBlockDisplay:NextBlockDisplay;
public var lineClearParticles:LineClearParticleAffecter;
public var guiManager:GUIManager;

public var startScreenTexture:Texture;
public var instructionsScreenTextures:Texture[];
public var pauseScreenTexture:Texture;
public var gameOverScreenTexture:Texture;
public var pauseButtonTexture:Texture;

public var guiSkins:GUISkin[];

public var music:AudioClip[];
public var lineClearSounds:AudioClip[];
public var dropBlockSounds:AudioClip[];


public var blockTemplates:GameObject[];

public var posOffset:Vector3;
public var blockSize:Vector3;

//screen positions
public var startButtonRect:Rect;
public var instructionsNextButtonRect:Rect;

public var tryAgainButtonRect:Rect;
public var gameOverBackButtonRect:Rect;

public var pauseButtonRect:Rect;
public var resumeButtonRect:Rect;
public var pauseRestartButtonRect:Rect;

public var gameOverTextRects:Rect[];

public var currentScreen:int = 0;

//screen vars
public var gameScreen:int = 0;
public var startScreen:int = 1;
public var gameOverScreen:int = 2;
public var pauseScreen:int = 3;
public var instructionsScreen:int = 4;

private var startButtonRectPixels:Rect;
private var instructionsButtonRectPixels:Rect;
private var highscoresButtonRectPixels:Rect;
private var creditsButtonRectPixels:Rect;

private var instructionsNextButtonRectPixels:Rect;

private var tryAgainButtonRectPixels:Rect;
private var gameOverBackButtonRectPixels:Rect;

private var pauseButtonRectPixels:Rect;
private var resumeButtonRectPixels:Rect;
private var pauseRestartButtonRectPixels:Rect;

private var gameOverTextRectsPixels:Rect[];

private var instructionsIndex:int = 0;

//private var curBlocks:Array;
//private var blockObjects:Array;

function Awake ()
{
	startButtonRectPixels = calcPixelPosition(startButtonRect);
	/*instructionsButtonRectPixels = calcPixelPosition(instructionsButtonRect);
	highscoresButtonRectPixels = calcPixelPosition(highscoresButtonRect);
	creditsButtonRectPixels = calcPixelPosition(creditsButtonRect);
	*/
	instructionsNextButtonRectPixels = calcPixelPosition(instructionsNextButtonRect);
	tryAgainButtonRectPixels = calcPixelPosition(tryAgainButtonRect);
	gameOverBackButtonRectPixels = calcPixelPosition(gameOverBackButtonRect);
	pauseButtonRectPixels = calcPixelPosition(pauseButtonRect);
	resumeButtonRectPixels = calcPixelPosition(resumeButtonRect);
	pauseRestartButtonRectPixels = calcPixelPosition(pauseRestartButtonRect);
	gameOverTextRectsPixels = new Rect[gameOverTextRects.length];
	for(var i:int = 0; i <gameOverTextRects.length; i++)
	{
		gameOverTextRectsPixels[i] = calcPixelPosition(gameOverTextRects[i]);
	}
}

function Start () 
{
	setCurrentScreen(startScreen);
	//startNewGame(1);
}

function Update () 
{
}

function OnGUI ()
{
	if(currentScreen == startScreen)
	{
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), startScreenTexture);
		if(GUI.Button(startButtonRectPixels, "", guiSkins[0].button))
		{
			setCurrentScreen(instructionsScreen);
			
		}
		/*
		if(GUI.Button(instructionsButtonRectPixels, ""))
		{
		}
		if(GUI.Button(highscoresButtonRectPixels, ""))
		{
		}
		if(GUI.Button(creditsButtonRectPixels, ""))
		{
		}
		*/
	}

	if(currentScreen == instructionsScreen)
	{
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), instructionsScreenTextures[instructionsIndex]);
		if(GUI.Button(instructionsNextButtonRectPixels, "Next", guiSkins[1].button))
		{
			instructionsIndex++;
		}
		if(instructionsIndex >= instructionsScreenTextures.length)
		{
			setCurrentScreen(gameScreen);
			startNewGame(1);
		}
	}

	if(currentScreen == gameScreen)
	{
		//pause button
		if(GUI.Button(pauseButtonRectPixels,pauseButtonTexture, guiSkins[2].button))
		{
			setCurrentScreen(pauseScreen);
		}

	}

	if(currentScreen == pauseScreen)
	{
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), pauseScreenTexture);
		if(GUI.Button(resumeButtonRectPixels,"", guiSkins[3].button))
		{
			setCurrentScreen(gameScreen);
		}
		if(GUI.Button(pauseRestartButtonRectPixels, "", guiSkins[3].button))
		{
			setCurrentScreen(gameScreen);
			startNewGame(1);
		}
	}

	if(currentScreen == gameOverScreen)
	{
		GUI.skin = guiSkins[4];
		/*
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), gameOverScreenTexture);
		GUI.Label(Rect(50,200,500,100), "Final Score:");
		GUI.Label(Rect(170,220,500,100), "+");
		GUI.Label(Rect(50,240,500,100), "Line Purity:");
		GUI.Label(Rect(170,260,500,100), "=");
		GUI.Label(Rect(100,310,500,100), "Lines Cleared:");
		GUI.Label(Rect(100,330,500,100), "Final Level:");
		GUI.Label(Rect(100,350,500,100), "Play Time:");
		GUI.Label(Rect(100,370,500,100), "Glass Blocks Cleared:");
		GUI.Label(Rect(100,390,500,100), "Paper Blocks Cleared:");
		GUI.Label(Rect(100,410,500,100), "Plastic Blocks Cleared:");

		GUI.skin = guiSkins[5];
		GUI.Label(Rect(150,200,500,100), scoreManager.getScore().ToString());															//score
		GUI.Label(Rect(150,240,500,100), (1+scoreManager.getPercentPurity()*100.0).ToString("F2") + "%");								//Purity
		GUI.Label(Rect(150,280,500,100), Mathf.Floor(scoreManager.getScore() * (1+scoreManager.getPercentPurity())).ToString());		//total score
		GUI.Label(Rect(150,310,500,100), scoreManager.getLinesCleared().ToString());													//lines cleared
		GUI.Label(Rect(150,330,500,100), scoreManager.getLevel().ToString());															//level
		GUI.Label(Rect(150,350,500,100), String.Format("{0:00}:{1:00}:{2:00}:{3:00}",(Mathf.Floor(scoreManager.playTime)/3600),			//time
																								(Mathf.Floor(scoreManager.playTime)/60),
																							  (Mathf.Floor(scoreManager.playTime)%60),
																 ((scoreManager.playTime - Mathf.Floor(scoreManager.playTime))*100)));
		GUI.Label(Rect(150,370,500,100), scoreManager.getGlassBlocksCleared().ToString());												//glass
		GUI.Label(Rect(150,390,500,100), scoreManager.getPaperBlocksCleared().ToString());												//paper
		GUI.Label(Rect(150,410,500,100), scoreManager.getPlasticBlocksCleared().ToString());											//plastic
		*/
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), gameOverScreenTexture);
		GUI.skin.label.normal.textColor = new Color(1.0,1.0,1.0,1.0);
		GUI.Label(gameOverTextRectsPixels[0], "Final Score:");
		GUI.Label(gameOverTextRectsPixels[1], "+");
		GUI.Label(gameOverTextRectsPixels[2], "Line Purity:");
		GUI.Label(gameOverTextRectsPixels[3], "=");
		GUI.Label(gameOverTextRectsPixels[4], "Lines Cleared:");
		GUI.Label(gameOverTextRectsPixels[5], "Final Level:");
		GUI.Label(gameOverTextRectsPixels[6], "Play Time:");
		GUI.Label(gameOverTextRectsPixels[7], "Glass Cleared:");
		GUI.Label(gameOverTextRectsPixels[8], "Paper Cleared:");
		GUI.Label(gameOverTextRectsPixels[9], "Plastic Cleared:");
		GUI.Label(gameOverTextRectsPixels[19], "Trees Saved:");
		GUI.Label(gameOverTextRectsPixels[20], "Barrels of Oil Conserved:");
		GUI.Label(gameOverTextRectsPixels[21], "Glass Bottles Recycled:");

		GUI.skin = guiSkins[5];
		GUI.Label(gameOverTextRectsPixels[10], scoreManager.getScore().ToString());															//score
		GUI.Label(gameOverTextRectsPixels[11], (scoreManager.getPercentPurity()*100.0).ToString("F2") + "%");								//Purity
		GUI.skin.label.normal.textColor = new Color(0.1,.5,.9,1.0);
		GUI.Label(gameOverTextRectsPixels[12], Mathf.Floor(scoreManager.getScore() * (1+scoreManager.getPercentPurity())).ToString());		//total score
		GUI.skin.label.normal.textColor = new Color(1.0,1.0,1.0,1.0);
		GUI.Label(gameOverTextRectsPixels[13], scoreManager.getLinesCleared().ToString());													//lines cleared
		GUI.Label(gameOverTextRectsPixels[14], scoreManager.getLevel().ToString());															//level
		GUI.Label(gameOverTextRectsPixels[15], String.Format("{0:00}:{1:00}:{2:00}:{3:00}",(Mathf.Floor(scoreManager.playTime)/3600),			//time
																								(Mathf.Floor(scoreManager.playTime)/60),
																							  (Mathf.Floor(scoreManager.playTime)%60),
																 ((scoreManager.playTime - Mathf.Floor(scoreManager.playTime))*100)));
		GUI.Label(gameOverTextRectsPixels[16], scoreManager.getGlassBlocksCleared().ToString());												//glass
		GUI.Label(gameOverTextRectsPixels[17], scoreManager.getPaperBlocksCleared().ToString());												//paper
		GUI.Label(gameOverTextRectsPixels[18], scoreManager.getPlasticBlocksCleared().ToString());													//paper
		GUI.Label(gameOverTextRectsPixels[22], Mathf.Floor(scoreManager.getPaperBlocksCleared() / 22).ToString());	
		GUI.Label(gameOverTextRectsPixels[23], Mathf.Floor(scoreManager.getPlasticBlocksCleared() / 15).ToString());												//glass
		GUI.Label(gameOverTextRectsPixels[24], Mathf.Floor(scoreManager.getGlassBlocksCleared() * 8).ToString());
												//plastic
		if(GUI.Button(tryAgainButtonRectPixels, "Try again"))
		{
			setCurrentScreen(gameScreen);
			startNewGame(1);
		}
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
	screenGrid.onNewGame();
	nextBlockDisplay.onNewGame();
	scoreManager.onNewGame(level);
	guiManager.onNewGame(level);
	gameManager.startNewGame(level);
	//play music
	var cameraAudioSource:AudioSource = Camera.main.GetComponent(AudioSource);
	cameraAudioSource.clip = music[2];
	cameraAudioSource.Play();
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
		Camera.main.GetComponent(AudioSource).PlayOneShot(dropBlockSounds[Random.Range(0,dropBlockSounds.length-1)], .4);
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
	Camera.main.GetComponent(AudioSource).PlayOneShot(lineClearSounds[Random.Range(0,lineClearSounds.length-1)]);
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

function onNewGhostShape(xArray:Array, yArray:Array, material:int)
{
	screenGrid.newGhostShape(xArray, yArray, material);
}

function onMoveGhostShape(xArray:Array, yArray:Array)
{
	screenGrid.moveGhostShape(xArray, yArray);
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
	var cameraAudioSource:AudioSource = Camera.main.GetComponent(AudioSource);
	//last screen ending

	currentScreen = screen;
	guiManager.draw = false;

	//new screen setup
	if(screen == startScreen)
	{
		cameraAudioSource.clip = music[0];
		cameraAudioSource.Play();
	}
	if(screen == gameScreen)
	{
		guiManager.draw = true;
	}
	if(screen == gameOverScreen)
	{
		//cameraAudioSource.PlayOneShot()
	}

	if(screen == instructionsScreen)
	{
		instructionsIndex = 0;
	}

}

static public function calcPixelPosition(rect:Rect)
{
	return new Rect(rect.x * Screen.width, rect.y * Screen.height, rect.width * Screen.width, rect.height * Screen.height);
}