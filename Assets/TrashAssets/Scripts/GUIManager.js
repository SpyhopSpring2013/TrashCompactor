public var particleAffecter: LineClearParticleAffecter;



var scoreGUISkin: GUISkin;
private var score:int;

private var scorePopupPosition:Vector2;

private var popupFadeTextArray:Array;

var scorePosition:Vector2;

function Start()
{
	score = 0;
	scorePopupPosition = Vector2(scorePosition.x, scorePosition.y - 35);

	popupFadeTextArray = new Array();
}

function Update()
{
}

function OnGUI(){

	GUI.skin = scoreGUISkin;

	GUI.skin.label.fontSize = 50;

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
	GUI.Label(Rect(scorePosition.x, scorePosition.y, 100,100), score.ToString());
}

function addScore(deltaScore:int)
{
	score += deltaScore;
	var fadeText:PopupFadeText = new PopupFadeText(scorePopupPosition, "+" + deltaScore.ToString());
	fadeText.m_fontSize = 40;
	popupFadeTextArray.Push(fadeText);
}