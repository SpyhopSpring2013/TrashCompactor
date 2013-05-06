// from page 189 unity book

var isPaused : boolean = false;
var startTime : float;
var timeRemaining : float;




function Start()
{
	startTime = 5;
}





function Update () {
	
	if (!isPaused)
	{
		DoCountDown();
	}
	
	
}

function DoCountDown()
{
	timeRemaining = startTime - Time.time;
	ShowTime();
	
	if(timeRemaining < 0)
	{
		timeRemaining = 0;
		isPaused = true;
		TimeIsUp();
	}
	
}

function PauseClock()
{
	isPaused = true;
}

function ShowTime()
{
	
	var minutes : int;
	var seconds : int;
	var timeStr : String;
	minutes = timeRemaining/60;
	seconds = timeRemaining % 60;
	timeStr = minutes.ToString() + ":";
	timeStr += seconds.ToString("D2");
//	guiText.text = timeStr;
	
}

function TimeIsUp()
{
	
	
}