	//public var ParticleSystem: Indicator;
	
	public var uiManager: UIManager;

	public var shortTapObj: Transform;
	public var longTapObj: Transform;
	public var doubleTapObj: Transform;
	public var chargeObj: Transform;
	
	public var chargeTextMesh: TextMesh;
	
	public var dragObj1: Transform;
	public var dragTextMesh1: TextMesh;
	
	public var dragObj2: Transform;
	public var dragTextMesh2: TextMesh;
	
	
	// Use this for initialization
	function Start () {
		
	}
	
	function OnEnable(){
		//these events are obsolete, replaced by onMultiTapE, but it's still usable
		//Gesture.onShortTapE += OnShortTap;
		//Gesture.onDoubleTapE += OnDoubleTap;
		
		/*Gesture.onMultiTapE += OnMultiTap;
		Gesture.onLongTapE += OnLongTap;
		
		Gesture.onChargingE += OnCharging;
		Gesture.onChargeEndE += OnChargeEnd;
		
		Gesture.onDraggingStartE += OnDraggingStart;
		Gesture.onDraggingE += OnDragging;
		Gesture.onDraggingEndE += OnDraggingEnd;*/
	}
	
	function OnDisable(){
		//these events are obsolete, replaced by onMultiTapE, but it's still usable
		//Gesture.onShortTapE -= OnShortTap;
		//Gesture.onDoubleTapE -= OnDoubleTap;
		
		/*Gesture.onMultiTapE -= OnMultiTap;
		Gesture.onLongTapE -= OnLongTap;
		
		Gesture.onChargingE -= OnCharging;
		Gesture.onChargeEndE -= OnChargeEnd;
		
		Gesture.onDraggingStartE -= OnDraggingStart;
		Gesture.onDraggingE -= OnDragging;
		Gesture.onDraggingEndE -= OnDraggingEnd;*/
	}
	/*function OnShortTap(Vector2 pos){
		Ray ray = Camera.main.ScreenPointToRay(pos);
		RaycastHit hit;
		if(Physics.Raycast(ray, out hit, Mathf.Infinity)){
			if(hit.collider.transform==shortTapObj){
				//place the indicator at the object position and assign a random color to it
				Indicator.transform.position=shortTapObj.position;
				Indicator.startColor=GetRandomColor();
				//emit a set number of particle
				Indicator.Emit(30);
				uiManager.rotateCurrentShapeRight();
			}
		}
	}*/