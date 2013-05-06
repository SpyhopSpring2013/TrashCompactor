function OnDrawGizmosSelected () {
var p : Vector3 = camera.ScreenToWorldPoint (Vector3 (100,100,camera.nearClipPlane));
Gizmos.color = Color.yellow;
Gizmos.DrawSphere (p, 0.1);
}