
//var bednaPrefab : Transform;


function Update () {

var mousex = Input.mousePosition.x;
var mousey = Input.mousePosition.y;
var ray = camera.main.ScreenPointToRay (Vector3(mousex,mousey,0));

var hit : RaycastHit;

if (Physics.Raycast (ray, hit, 200)) {

}
if ( Input.GetMouseButtonDown(0) ){
	Debug.Log("down");
//var create = Instantiate(bednaPrefab, hit.point, Quaternion.identity);
Debug.Log("down");

}

}