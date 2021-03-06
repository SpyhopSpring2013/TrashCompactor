#pragma strict

public var uiManager:UIManager;

public var cursorIndicator:Transform;
public var swipeIndicator:Transform;
public var projectileObject:Transform;

private var body:Rigidbody;

public var label:GUIText;
private var labelTimer:float=-1;


/*function Update() {
	for(var touch: Touch in Input.touches){
		if(touch.phase == TouchPhase.Began)	{
			Debug.Log(touch.position.x);
			var startTouchX = touch.position.x;
		}
		if(touch.phase == TouchPhase.Moved){
			Debug.Log("Touch Phase = Moved");
			var currentTouchX = touch.position.x;
		
			if((currentTouchX - startTouchX) >= 300){
				uiManager.moveCurrentShape(0);
				startTouchX = touch.position.x;
			}
			if((currentTouchX - startTouchX) <= -300){
				uiManager.moveCurrentShape(2);
				startTouchX = touch.position.x;
		}
		}
		if(touch.phase == TouchPhase.Ended){
			startTouchX = 0;
			currentTouchX = 0;
		}
	}
}
*/
function Start(){
	body=projectileObject.gameObject.GetComponent(Rigidbody);
}


	public var shortTapObj:Transform;
	public var shortTapObj2:Transform;
	public var longTapObj:Transform;
	public var doubleTapObj:Transform;
	public var multiTapObj:Transform;
	

function OnEnable(){
	Gesture.onTouchE += OnOn;
	Gesture.onMouse1E += OnOn;
	Gesture.onSwipeE += OnSwipe;
	
	Gesture.onShortTapE += OnShortTap;
	
	
	//Gesture.onMultiTapE += OnMultiTap;
	//Gesture.onLongTapE += OnLongTap;
		

	

}

function OnDisable(){
	Gesture.onTouchE -= OnOn;
	Gesture.onMouse1E -= OnOn;
	
	
	
	
	Gesture.onSwipeE -= OnSwipe;
	
	
	
	Gesture.onShortTapE -= OnShortTap;
	
	
	
	
	//Gesture.onMultiTapE -= OnMultiTap;
	//Gesture.onLongTapE -= OnLongTap;
		

		
	
}

function OnSwipe(sw:SwipeInfo){
	//position the projectile object at the start point of the swipe
	//var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(sw.startPoint.x, sw.startPoint.y, 35));
	//projectileObject.position=p;
	
	//clear the projectile current velocity before apply a new force in the swipe direction, take account of the swipe speed
	body.velocity=Vector3(0, 0, 0);
	body.AddForce(Vector3(sw.direction.x, 0, sw.direction.y) * sw.speed*0.0035);
	
	//show the swipe info 
	var labelText:String="Swipe Detected, ";
	if(sw.isMouse) labelText+="mouse "+sw.index.ToString()+"\n\n";
	else labelText+="finger "+sw.index.ToString()+"\n\n";

	//Debug.Log("Speed " + sw.speed);
	//Debug.Log(" Direction X " + sw.direction.x + "Direction Y " + sw.direction.y);
	
	/*
	//labelText+="\n\n";
	labelText+="direction: "+sw.direction+"\n";
	labelText+="angle: "+sw.angle.ToString("f1")+"\n";
	labelText+="speed: "+sw.speed.ToString("f1")+"\n";
	label.text=labelText;
	*/

	//if the label is previous cleared, re-initiate the coroutine to clear it
	if(labelTimer<0){
		//StartCoroutine(ClearLabel());
	}
	//else just extend the timer
	else labelTimer=5;
	
	//StartCoroutine(ShowSwipeIndicator(sw));  pleh

	
	//Debug.Log(sw.angle);
	if(sw.angle>315 || sw.angle<45){
		//Swipe right
		
		uiManager.moveCurrentShape(0);
	}

	if(sw.angle > 135 && sw.angle < 225)
	{
		//Swipe left
		
		uiManager.moveCurrentShape(2);
	}
	if(sw.angle > 215 && sw.angle < 305)
	{
		//Swipe down
		if(sw.speed > 1200)
		{
			uiManager.dropCurrentShape();

		}
		uiManager.moveCurrentShape(1);
	}
}

/*function ShowSwipeIndicator(sw:SwipeInfo){
	//position the projectile object at the start point of the swipe
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(sw.startPoint.x, sw.startPoint.y, 5));
	swipeIndicator.position=p;
	
	var t:float=0;
	while(t<=1){
		p=Vector2.Lerp(sw.startPoint, sw.endPoint, t);
		p=Camera.main.ScreenToWorldPoint(Vector3(p.x, p.y, 5));
		//Debug.Log(sw.startPoint+"  "+sw.endPoint+"   "+p);
		swipeIndicator.position=p;
		t+=0.2;
		yield;
	}
}
*/
//clear the lable, if no new input has been assigned within 5 sec, the label will be cleared
/*function ClearLabel(){
	labelTimer=0;
	while(labelTimer>0){
		labelTimer-=Time.deltaTime;
		yield;
	}
	label.text="";
}
*/

//called when the touch or a click is detected
function OnOn(pos:Vector2){
	//place the curose at the position where the tap/click take place
	var p:Vector3=Camera.main.ScreenToWorldPoint(new Vector3(pos.x, pos.y, 5));
	cursorIndicator.position=p;
}

/*


private var instruction:boolean=false;
function OnGUI(){
	var title:String="swipe demo, use swipe to throw the ball object in the scene";
	GUI.Label(Rect(150, 15, 500, 40), title);
	
	if(!instruction){
		if(GUI.Button(Rect(10, 55, 130, 35), "Instruction On")){
			instruction=true;
		}
	}
	else{
		if(GUI.Button(Rect(10, 55, 130, 35), "Instruction Off")){
			instruction=false;
		}
		
		GUI.Box(Rect(10, 100, 250, 50), "");
		
		GUI.Label(Rect(15, 105, 260, 40), "swipe on screen with 1 finger.\ncan use mouse to simulate that ");
	}
}

*/

function OnShortTap(pos: Vector2){
		var ray: Ray = Camera.main.ScreenPointToRay(pos);
		var hit:RaycastHit;
		if(Physics.Raycast(ray, hit, Mathf.Infinity)){
			if(hit.collider.transform==shortTapObj){
				//place the indicator at the object position and assign a random color to it
				
				//emit a set number of particle
				
				uiManager.rotateCurrentShapeRight();
			}
			
			if(hit.collider.transform==shortTapObj2){
				//place the indicator at the object position and assign a random color to it
				
				//emit a set number of particle
				
				uiManager.rotateCurrentShapeLeft();
			}
		}
	}

