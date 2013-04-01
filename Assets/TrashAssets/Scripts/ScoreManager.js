#pragma strict

private var glassBlocksCleared:int = 0;
private var paperBlocksCleared:int = 0;
private var plasticBlocksCleared:int = 0;
private var linesCleared:int = 0;
public var level:int = 1;
private var percentPurity:float = 0.0;
public var playTime:float = 0.0;

private var score:int = 0;


function Start () {

}

function Update () {

}

function onClearLine(materialCounts:Array)
{
	linesCleared++;

	var glassCount:int = materialCounts[1];
	var paperCount:int = materialCounts[2];
	var plasticCount:int = materialCounts[3];

	glassBlocksCleared += glassCount;
	paperBlocksCleared += paperCount;
	plasticBlocksCleared += plasticCount;

	//"style" used to determine majority
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
	var majorityMaterial:float = materialCounts[((style-1)%3)+1];
	Debug.Log(majorityMaterial);
	var curPurity:float = majorityMaterial/10.0;
	Debug.Log(curPurity);
	var linesClearedFloat:float = linesCleared;
	percentPurity = (percentPurity*(linesClearedFloat-1) + curPurity)/linesClearedFloat;
	Debug.Log(percentPurity);
}
