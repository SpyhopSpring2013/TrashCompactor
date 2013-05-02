public var particleAffecter: LineClearParticleAffecter;

public var guiSkins:GUISkin[];

public var debug = false;
public var draw:boolean = false;

private var score:int;

private var popupFadeTextArray:Array;

private var level:int;
private var purity:float;

//POSITIONS ARE DEFINED AS PERCENT OF SCREEN WIDTH/HEIGHT

public var scoreTextRect:Rect;
public var scoreRect:Rect;
public var levelTextRect:Rect;
public var levelRect:Rect;
public var purityTextRect:Rect;
public var purityRect:Rect;

private var scoreTextRectPixels:Rect;
private var scoreRectPixels:Rect;
private var levelTextRectPixels:Rect;
private var levelRectPixels:Rect;
private var purityTextRectPixels:Rect;
private var purityRectPixels:Rect;

private var scorePopupPosition:Vector2;

function Awake()
{
	scoreTextRectPixels = UIManager.calcPixelPosition(scoreTextRect);
	scoreRectPixels = UIManager.calcPixelPosition(scoreRect);
	levelTextRectPixels = UIManager.calcPixelPosition(levelTextRect);
	levelRectPixels = UIManager.calcPixelPosition(levelRect);
	purityTextRectPixels = UIManager.calcPixelPosition(purityTextRect);
	purityRectPixels = UIManager.calcPixelPosition(purityRect);

	scorePopupPosition = Vector2(scoreRectPixels.x, scoreRectPixels.y - Screen.height*.0244);
}

function Start()
{
}

function Update()
{
}

function onNewGame(level:int)
{
	score = 0;
	popupFadeTextArray = new Array();
	purity = 1.0;
}

function OnGUI()
{
	if(draw)
	{
		//GUI.skin.label.fontSize = 30;

		if(debug)
		{
			if (GUI.Button (Rect (20,20,80,80), "Add 50"))
			{
				addScore(50);
				particleAffecter.onClearLine(0,1);
			}


			if (GUI.Button (Rect (20,100,80,80), "Add 100")){
				addScore(100);
				particleAffecter.onClearLine(3,2);
			}


			if (GUI.Button (Rect (20,180,80,80), "Add 200")){
				addScore(200);
				particleAffecter.onClearLine(5,3);
			}
		}
		//popup text
		for(var i:int = 0; i< popupFadeTextArray.length; i++)
		{
			var fadeText:PopupFadeText = popupFadeTextArray[i];

			if(fadeText.isDone())
			{
				popupFadeTextArray.RemoveAt(i);
				i--;
				continue;
			}
			fadeText.update(Time.deltaTime);
			fadeText.draw(guiSkins[1]);
		}
		//score labels text
		GUI.Label(scoreTextRectPixels, "Score:", guiSkins[0].label);
		GUI.Label(levelTextRectPixels, "Level:", guiSkins[0].label);
		GUI.Label(purityTextRectPixels, "Purity:", guiSkins[0].label);
		//score text
		GUI.Label(scoreRectPixels, score.ToString(), guiSkins[1].label);
		GUI.Label(levelRectPixels, level.ToString(), guiSkins[1].label);
		GUI.Label(purityRectPixels, (purity*100.0).ToString("F2") + "%", guiSkins[1].label);
	}

}

function addScore(deltaScore:int)
{
	score += deltaScore;
	var fadeText:PopupFadeText = new PopupFadeText(scorePopupPosition, "+" + deltaScore.ToString());
	fadeText.m_fontSize = guiSkins[1].label.fontSize * 0.8;
	popupFadeTextArray.Push(fadeText);
}

public function onLevelChange(nLevel:int)
{
	level = nLevel;
}

public function onPurityChange(nPurity:float)
{
	purity = nPurity;
}