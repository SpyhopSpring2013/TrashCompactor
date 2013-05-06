// from page 189 unity book

//var isPaused : boolean = false;

var myskin2: GUISkin;
var startTime : float;
var timeRemaining : float;
var timeStr : String;



function Start()
{
	startTime = 0;
	timeStr = startTime.ToString();
	
}


function Update () {
	
	if (mycollision.racingstarted == true )
	{
		DoCountDown();
	}
	
	
}

function DoCountDown()
{
	timeRemaining = startTime + Time.time;
	ShowTime();
	
//	if(!mycollision.racingstarted)
//	{
//		//timeRemaining = 0;
//isPaused = true;
//		TimeIsUp();
//		
//	}
	
}

//function PauseClock()
//{
//	isPaused = true;
//}

function ShowTime()
{
	
	var minutes : int;
	var seconds : int;
	
	minutes = timeRemaining/60;
	seconds = timeRemaining % 60;
	timeStr = minutes.ToString() + ":";
	timeStr += seconds.ToString("D2");
	//guiText.text = timeStr;
	
}

function OnGUI () {
	 GUI.skin = myskin2;
     GUI.Label(Rect (20, 20, 500, 50), timeStr);
     
    
     
}

//function TimeIsUp()
//{
//	
//	
//}