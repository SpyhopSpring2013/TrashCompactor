#pragma strict

public var Indicator:ParticleSystem;
	
public var shortTapObj:Transform;
public var longTapObj:Transform;
public var doubleTapObj:Transform;
public var chargeObj:Transform;

public var chargeTextMesh:TextMesh;

public var dragObj1:Transform;
public var dragTextMesh1:TextMesh;

public var dragObj2:Transform;
public var dragTextMesh2:TextMesh;

public var dragObj3:Transform;
public var dragTextMesh3:TextMesh;

public var dragObj4:Transform;
public var dragTextMesh4:TextMesh;

public var dragObj5:Transform;
public var dragTextMesh5:TextMesh;

public var dragObj6:Transform;
public var dragTextMesh6:TextMesh;

public var dragObj7:Transform;
public var dragTextMesh7:TextMesh;

public var dragObj8:Transform;
public var dragTextMesh8:TextMesh;

public var dragObj9:Transform;
public var dragTextMesh9:TextMesh;

public var dragObj10:Transform;
public var dragTextMesh10:TextMesh;

public var dragObj11:Transform;
public var dragTextMesh11:TextMesh;


public var dragObj12:Transform;
public var dragTextMesh12:TextMesh;

public var dragObj13:Transform;
public var dragTextMesh13:TextMesh;

public var uiManager:UIManager;

private var currentDragIndex1:int=-1;
private var currentDragIndex2:int=-1;
private var currentDragIndex3:int=-1;
private var currentDragIndex4:int=-1;
private var currentDragIndex5:int=-1;
private var currentDragIndex6:int=-1;
private var currentDragIndex7:int=-1;
private var currentDragIndex8:int=-1;
private var currentDragIndex9:int=-1;
private var currentDragIndex10:int=-1;
private var currentDragIndex11:int=-1;
private var currentDragIndex12:int=-1;
private var currentDragIndex13:int=-1;


function OnDraggingStart(dragInfo:DragInfo){
	//currentDragIndex=dragInfo.index;
	
	//if(currentDragIndex==-1){
		var ray:Ray = Camera.main.ScreenPointToRay(dragInfo.pos);
		var hit:RaycastHit;
		//use raycast at the cursor position to detect the object
		if(Physics.Raycast(ray, hit, Mathf.Infinity)){
			//if the drag started on dragObj1
			if(hit.collider.transform==dragObj1){
				//change the scale of dragObj1, give the user some visual feedback
				dragObj1.localScale*=1.1;
				//latch dragObj1 to the cursor, based on the index
				Obj1ToCursor(dragInfo);
				currentDragIndex1=dragInfo.index;
			}
			//if the drag started on dragObj2
			else if(hit.collider.transform==dragObj2){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj2.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj2ToCursor(dragInfo);
				currentDragIndex2=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj3){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj3.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj3ToCursor(dragInfo);
				currentDragIndex3=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj4){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj4.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj4ToCursor(dragInfo);
				currentDragIndex4=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj5){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj5.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj5ToCursor(dragInfo);
				currentDragIndex5=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj6){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj6.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj6ToCursor(dragInfo);
				currentDragIndex6=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj7){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj7.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj7ToCursor(dragInfo);
				currentDragIndex7=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj8){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj8.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj8ToCursor(dragInfo);
				currentDragIndex8=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj9){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj9.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj9ToCursor(dragInfo);
				currentDragIndex9=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj10){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj10.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj10ToCursor(dragInfo);
				currentDragIndex10=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj11){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj11.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj11ToCursor(dragInfo);
				currentDragIndex11=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj12){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj12.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj12ToCursor(dragInfo);
				currentDragIndex12=dragInfo.index;
			}
			
			else if(hit.collider.transform==dragObj13){
				//change the scale of dragObj2, give the user some visual feedback
				dragObj13.localScale*=1.1;
				//latch dragObj2 to the cursor, based on the index
				Obj13ToCursor(dragInfo);
				currentDragIndex13=dragInfo.index;
			}
			
			
			
		}
	//}
}

//triggered on a single-finger/mouse dragging event is on-going
function OnDragging(dragInfo:DragInfo){
	//if the dragInfo index matches dragIndex1, call function to position dragObj1 accordingly
	if(dragInfo.index==currentDragIndex1){
		Obj1ToCursor(dragInfo);
	}
	//if the dragInfo index matches dragIndex2, call function to position dragObj2 accordingly
	else if(dragInfo.index==currentDragIndex2){
		Obj2ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex3){
		Obj3ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex4){
		Obj4ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex5){
		Obj5ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex6){
		Obj6ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex7){
		Obj7ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex8){
		Obj8ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex9){
		Obj9ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex10){
		Obj10ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex11){
		Obj11ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex12){
		Obj12ToCursor(dragInfo);
	}
	
	else if(dragInfo.index==currentDragIndex13){
		Obj13ToCursor(dragInfo);
	}
	
	
}

//assign dragObj1 to the dragInfo position, and display the appropriate tooltip
function Obj1ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj1.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh1.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh1.text="Dragging with finger"+(dragInfo.index+1);
	}
}

//assign dragObj2 to the dragInfo position, and display the appropriate tooltip
function Obj2ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj2.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh2.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh2.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj3ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj3.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh3.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh3.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj4ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj4.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh4.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh4.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj5ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj5.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh5.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh5.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj6ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj6.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh6.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh6.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj7ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj7.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh7.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh7.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj8ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj8.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh8.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh8.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj9ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj9.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh9.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh9.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj10ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj10.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh10.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh10.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj11ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj11.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh11.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh11.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj12ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj12.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh12.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh12.text="Dragging with finger"+(dragInfo.index+1);
	}
}

function Obj13ToCursor(dragInfo:DragInfo){
	var p:Vector3=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
	dragObj13.position=p;
	
	if(dragInfo.isMouse){
		dragTextMesh13.text="Dragging with mouse"+(dragInfo.index+1);
	}
	else{
		dragTextMesh13.text="Dragging with finger"+(dragInfo.index+1);
	}
}








function OnDraggingEnd(dragInfo:DragInfo){
	
	var p:Vector3;	//position of the dragObj
	
	//drop the dragObj being drag by this particular cursor
	if(dragInfo.index==currentDragIndex1){
		currentDragIndex1=-1;
		dragObj1.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj1.position=p;
		dragTextMesh1.text="DragMe";
	}
	else if(dragInfo.index==currentDragIndex2){
		currentDragIndex2=-1;
		dragObj2.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj2.position=p;
		dragTextMesh2.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex3){
		currentDragIndex3=-1;
		dragObj3.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj2.position=p;
		dragTextMesh2.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex4){
		currentDragIndex4=-1;
		dragObj4.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj4.position=p;
		dragTextMesh4.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex5){
		currentDragIndex5=-1;
		dragObj5.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj5.position=p;
		dragTextMesh5.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex6){
		currentDragIndex6=-1;
		dragObj6.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj6.position=p;
		dragTextMesh6.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex7){
		currentDragIndex7=-1;
		dragObj7.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj7.position=p;
		dragTextMesh7.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex8){
		currentDragIndex8=-1;
		dragObj8.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj8.position=p;
		dragTextMesh8.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex9){
		currentDragIndex9=-1;
		dragObj9.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj9.position=p;
		dragTextMesh9.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex10){
		currentDragIndex10=-1;
		dragObj10.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj10.position=p;
		dragTextMesh10.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex11){
		currentDragIndex11=-1;
		dragObj11.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj11.position=p;
		dragTextMesh11.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex2){
		currentDragIndex12=-1;
		dragObj12.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj12.position=p;
		dragTextMesh12.text="DragMe";
	}
	
	else if(dragInfo.index==currentDragIndex2){
		currentDragIndex13=-1;
		dragObj13.localScale*=10.0/11.0;
		
		p=Camera.main.ScreenToWorldPoint(Vector3(dragInfo.pos.x, dragInfo.pos.y, 30));
		dragObj13.position=p;
		dragTextMesh13.text="DragMe";
	}
	

	
}
















//return a random color when called
private function GetRandomColor():Color{
	return Color(Random.Range(0.0, 1.0), Random.Range(0.0, 1.0), Random.Range(0.0, 1.0));
}

/*
private var instruction:boolean=false;
function OnGUI(){
	if(!instruction){
		if(GUI.Button(Rect(10, 55, 130, 35), "Instruction On")){
			instruction=true;
		}
	}
	else{
		if(GUI.Button(Rect(10, 55, 130, 35), "Instruction Off")){
			instruction=false;
		}
		
		GUI.Box(Rect(10, 100, 200, 65), "");
		
		GUI.Label(Rect(15, 105, 190, 65), "interact with each object using the interaction stated on top of each of them");
	}
}
*/











function Start () {

}

function OnEnable(){
	Gesture.onMultiTapE += OnMultiTap;
	Gesture.onLongTapE += OnLongTap;
	
	//event obsolete
	//Gesture.onChargingE += OnCharging;
	Gesture.onChargeEndE += OnChargeEnd;
	
	Gesture.onDraggingStartE += OnDraggingStart;
	Gesture.onDraggingE += OnDragging;
	Gesture.onDraggingEndE += OnDraggingEnd;
}

function OnDisable(){
	Gesture.onMultiTapE -= OnMultiTap;
	Gesture.onLongTapE -= OnLongTap;
	
	//event obsolete
	//Gesture.onChargingE -= OnCharging;
	Gesture.onChargeEndE -= OnChargeEnd;
	
	Gesture.onDraggingStartE -= OnDraggingStart;
	Gesture.onDraggingE -= OnDragging;
	Gesture.onDraggingEndE -= OnDraggingEnd;
}

//called when a multi-Tap event is detected
function OnMultiTap(tap:Tap){
	//do a raycast base on the position of the tap
	var ray:Ray = Camera.main.ScreenPointToRay(tap.pos);
	var hit:RaycastHit;
	uiManager.rotateCurrentShapeRight();
		Debug.Log("Clicked on Tap Object");
	if(Physics.Raycast(ray, hit, Mathf.Infinity)){
		//if the tap lands on the shortTapObj, then shows the effect.
		
		if(hit.collider.transform==shortTapObj){
			
			
			
			//place the indicator at the object position and assign a random color to it
			Indicator.transform.position=shortTapObj.position;
			Indicator.startColor=GetRandomColor();
			//emit a set number of particle
			Indicator.Emit(30);
		}
		//if the tap lands on the doubleTapObj
		else if(hit.collider.transform==doubleTapObj){
			//check to make sure if the tap count matches
			if(tap.count==2){
				//place the indicator at the object position and assign a random color to it
				Indicator.transform.position=doubleTapObj.position;
				Indicator.startColor=GetRandomColor();
				//emit a set number of particle
				Indicator.Emit(30);
			}
		}
	}
}



//called when a long tap event is ended
function OnLongTap(tap:Tap){
	//do a raycast base on the position of the tap
	var ray:Ray = Camera.main.ScreenPointToRay(tap.pos);
	var hit:RaycastHit;
	//if the tap lands on the longTapObj
	if(Physics.Raycast(ray, hit, Mathf.Infinity)){
		if(hit.collider.transform==longTapObj){
			//place the indicator at the object position and assign a random color to it
			Indicator.transform.position=longTapObj.position;
			Indicator.startColor=GetRandomColor();
			//emit a set number of particle
			Indicator.Emit(30);
		}
	}
}

//called when a double tap event is ended
//this event is used for onDoubleTapE in v1.0, it's still now applicabl
function OnDoubleTap(pos:Vector2){
	var ray:Ray = Camera.main.ScreenPointToRay(pos);
	var hit:RaycastHit;
	if(Physics.Raycast(ray, hit, Mathf.Infinity)){
		if(hit.collider.transform==doubleTapObj){
			//place the indicator at the object position and assign a random color to it
			Indicator.transform.position=doubleTapObj.position;
			Indicator.startColor=GetRandomColor();
			//emit a set number of particle
			Indicator.Emit(30);
		}
	}
}



//called when a charge event is ended
function OnChargeEnd(cInfo:ChargedInfo){
	var ray:Ray = Camera.main.ScreenPointToRay(cInfo.pos);
	var hit:RaycastHit;
	//use raycast at the cursor position to detect the object
	if(Physics.Raycast(ray, hit, Mathf.Infinity)){
		if(hit.collider.transform==chargeObj){
			//place the indicator at the object position and assign a random color to it
			Indicator.transform.position=chargeObj.position;
			Indicator.startColor=GetRandomColor();
			
			//adjust the indicator speed with respect to the charged percent
			Indicator.startSpeed=1+3*cInfo.percent;
			//emit a set number of particles with respect to the charged percent
			Indicator.Emit(10+cInfo.percent*75);
			
			//reset the particle speed, since it's shared by other event
			StartCoroutine(ResumeSpeed());
		}
	}
	chargeTextMesh.text="HoldToCharge";
}

//reset the particle emission speed of the indicator
function ResumeSpeed(){
	yield WaitForSeconds(Indicator.startLifetime);
	Indicator.startSpeed=2;
}


function OnShortTap(pos: Vector2){
	Debug.Log("Short Tap Function");
		var ray: Ray = Camera.main.ScreenPointToRay(pos);
		var hit:RaycastHit;
		if(Physics.Raycast(ray, hit, Mathf.Infinity)){
			if(hit.collider.transform==shortTapObj){
				//place the indicator at the object position and assign a random color to it
				Indicator.transform.position=shortTapObj.position;
				Indicator.startColor=GetRandomColor();
				//emit a set number of particle
				Indicator.Emit(30);
				uiManager.rotateCurrentShapeRight();
			}
		}
	}
