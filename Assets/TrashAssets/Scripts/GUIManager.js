public var particleAffecter: LineClearParticleAffecter;

public var debug = false;
public var draw:boolean = false;

var scoreGUISkin: GUISkin;
private var score:int;

private var scorePopupPosition:Vector2;

private var popupFadeTextArray:Array;

private var level:int;
private var purity:float;

//POSITIONS ARE DEFINED AS PERCENT OF SCREEN WIDTH/HEIGHT
public var scorePosition:Vector2;
public var levelPosition:Vector2;
public var purityPosition:Vector2;

private var scorePixelPosition:Vector2;
private var levelPixelPosition:Vector2;
private var purityPixelPosition:Vector2;

function Awake()
{
	//scorePopupPosition = Vector2(scorePosition.x, scorePosition.y - 25);
	scorePixelPosition = calcPixelPosition(scorePosition);
	scorePopupPosition = new Vector2(scorePixelPosition.x, scorePixelPosition.y - Screen.height*.0244);

	levelPixelPosition = new calcPixelPosition(levelPosition);
	purityPixelPosition = new calcPixelPosition(purityPosition);
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
}

function OnGUI()
{
	if(draw)
	{
		GUI.skin = scoreGUISkin;
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
			fadeText.draw();
		}
		//score text
		GUI.Label(Rect(scorePixelPosition.x, scorePixelPosition.y, 600,100), score.ToString());
		GUI.Label(Rect(levelPixelPosition.x, levelPixelPosition.y, 600,100), level.ToString());
		GUI.Label(Rect(purityPixelPosition.x, purityPixelPosition.y, 600,100), (purity*100.0).ToString("F2") + "%");
	}

}

function addScore(deltaScore:int)
{
	score += deltaScore;
	var fadeText:PopupFadeText = new PopupFadeText(scorePopupPosition, "+" + deltaScore.ToString());
	fadeText.m_fontSize = scoreGUISkin.label.fontSize * 0.8;
	popupFadeTextArray.Push(fadeText);
}

public function onLevelChange(nLevel:int)
{
	level = nLevel;
}

private function calcPixelPosition(pos:Vector2)
{
	return new Vector2(pos.x * Screen.width, pos.y * Screen.height);
}

public function onPurityChange(nPurity:float)
{
	purity = nPurity;
}