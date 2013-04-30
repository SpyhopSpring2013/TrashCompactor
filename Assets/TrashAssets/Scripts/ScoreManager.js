#pragma strict

private var glassBlocksCleared:int;
private var paperBlocksCleared:int;
private var plasticBlocksCleared:int;
private var linesCleared:int;
private var level:int;
private var percentPurity:float;
public var playTime:float;

private var score:int;

private var pendingScore:int;


function Start () {

}

function Update () {

}

function onNewGame(lLevel:int)
{
	glassBlocksCleared = 0;
	paperBlocksCleared = 0;
	plasticBlocksCleared = 0;
	linesCleared = 0;
	level = lLevel;
	percentPurity = 1.0;
	playTime = 0.0;
	score = 0;
}

function pushLineMaterials(materialCounts:Array)
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
	var majorityMaterialCount:float = materialCounts[((style-1)%3)+1];
	var curPurity:float = majorityMaterialCount/10.0;
	var linesClearedFloat:float = linesCleared;
	percentPurity = (percentPurity*(linesClearedFloat-1) + curPurity)/linesClearedFloat;

	if(majorityMaterialCount < 10)
		pendingScore += majorityMaterialCount;
	else
		pendingScore += 50;
}

public function onClearLines(lineCount:int):int
{
	var deltaScore = pendingScore * lineCount * 50 * (1+(Mathf.Pow(level-1,2)*0.05));
	score += deltaScore;
	pendingScore = 0;
	return deltaScore;
}

public function getScore()
{
	return score;
}

function onLevelChange(nlevel:int)
{
	level = nlevel;
}

public function getPercentPurity():float
{
	return percentPurity;
}

public function getGlassBlocksCleared():int
{
	return glassBlocksCleared;
}

public function getPaperBlocksCleared():int
{
	return paperBlocksCleared;
}

public function getPlasticBlocksCleared():int
{
	return plasticBlocksCleared;
}

public function getLinesCleared():int
{
	return linesCleared;
}

public function getLevel():int
{
	return level;
}