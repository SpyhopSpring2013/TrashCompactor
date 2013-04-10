// by Frederic Rolland-Porche - Equilibre Games http://www.equilibregames.com
// posted on my dev blog on 2011-03 http://www.rolland-porche.fr
// listed in unity asset store since version 1.2
//
// Planned for next releases
// - circle/grid/line distribution from prefabs
// - choose distribution : from actual positions, from active object and collider extents, from active object and renderer extents
// - distinct icons for pro/basic
// - layout choice : vertical / horizontal
//
// Versions History
//
// v1.3 2011-03-16
// - sample scenes
// - sort axis can be chosen or linked to the align axis
// - distribution enabled for scale
// - distribution enabled for rotation
// - regions added to help reading the code
// - enhanced icon
//
// v1.2 2011-02-26
// - added the checkbox "auto" to let you decide if you wish to auto detect the alignment axis from the scene view, or not
// - the "autodetect" works only in the position alignement type
// - all changes in the inspector have been made undo-able to fulfill asset store requirements
// - icons loaded via the Resources class instead of EditorGUIUtility (that needs the Assets/Editor Default Resources folder, not included for the Asset Store)
// - distribute button is now hidden when position is not selected (as it does nothing for rotation and scale)
//
// v1.1 2011-02-24
// - Entirely rewritten code for alignment !
// - Move the Align Editor Window the the "Window" menu
// - Add buttons for (min, mean, max) alignment
// - Auto set the axis from the last active view camera !
// - Repaint the window when user changes something (select objects for eg.)
// - Remove the massive setter from this editor window, it will be shipped with another editor window
//
// v1.0 - 2011-02-18
// - first delivery to the blog and public share !

using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System;
using System.IO;

public class AlignEditorWindow : EditorWindow {

	// Current version is :
	static string VERSION = "1.3";

	#region enumerations
	// What alignment do we want to make ?
	public enum AlignType {
		Position,
		Rotation,
		Scale
	}
	// Where do we align ?
	public enum Landmark {
		minimum,
		mean,
		maximum,
		lineDistributed
	}
	// Sort axis declaration
	public enum SortAxis {
		None,
		X,
		Y,
		Z
	}
	// Axis declaration
	public enum Axis {
		All,
		X,
		Y,
		Z
	}
	#endregion

	// GUI Main View Scroll position
	Vector2 mainScroll;

	#region alignment
	// Align Type
	public AlignType alignType = AlignType.Position;
	// Land mark
	public Landmark landmark = Landmark.mean;
	// Axis
	public Axis axis = Axis.All;
	// Auto assign axis ?
	public bool autoAxis = true;
	// Sort Axis
	public SortAxis sortBy = SortAxis.X;
	// use alignement axis ?
	public bool useAlignAxis = true;
	#endregion

	// Creation of window
	[MenuItem("Window/Align Editor")]
	public static void Init() {
		GetWindow(typeof(AlignEditorWindow), false, "Align Edit v" + VERSION);
	}

	// Main GUI Function - call subs
	void OnGUI() {
		mainScroll = EditorGUILayout.BeginScrollView(mainScroll);
		AlignButtonsGUI();
		EditorGUILayout.EndScrollView();
	}

	// GUI Buttons for alignment
	void AlignButtonsGUI() {
		if (Selection.transforms.Length < 2)
			EditorGUILayout.LabelField("Select at least", "2 objects");
		else
			EditorGUILayout.LabelField("Active object", Selection.activeTransform.name);
		
		AlignType wantedType = (AlignType) EditorGUILayout.EnumPopup("Align", alignType);
		if (wantedType != alignType) {
			Undo.RegisterUndo(this, "change align type");
			alignType = wantedType;
		}

		// Axis alignement selection
		EditorGUILayout.BeginHorizontal();
		
		EditorGUILayout.PrefixLabel("Axis");
			bool wantedAutoAxis = GUILayout.Toggle(autoAxis, "auto");
			if (wantedAutoAxis != autoAxis) {
				Undo.RegisterUndo(this, "change auto axis");
				autoAxis = wantedAutoAxis;
			}
		// Auto set the axis from the last active view camera
		if (autoAxis && SceneView.lastActiveSceneView != null && SceneView.lastActiveSceneView.camera != null) {
			Camera myCam = SceneView.lastActiveSceneView.camera;
			if (myCam != null && myCam.transform != null) {
				if (myCam.transform.forward == Vector3.forward || myCam.transform.forward == -Vector3.forward) {
					axis = Axis.Y;
				} else if (myCam.transform.forward == Vector3.right || myCam.transform.forward == -Vector3.right) {
					axis = Axis.Z;
				} else if (myCam.transform.forward == Vector3.up || myCam.transform.forward == -Vector3.up) {
					axis = Axis.X;
				}
			}
		}
		if (autoAxis)
			GUILayout.Label("Detected: " + axis);
		else {
			Axis wantedAxis = (Axis) EditorGUILayout.EnumPopup(axis);
			if (wantedAxis != axis) {
				Undo.RegisterUndo(this, "change axis");
				axis = wantedAxis;
			}
		}
		EditorGUILayout.EndHorizontal();
		// Sort by axis selection
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.PrefixLabel("Sort by");
			bool wantedUseAxis = GUILayout.Toggle(useAlignAxis, "same axis");
			if (wantedUseAxis != useAlignAxis) {
				Undo.RegisterUndo(this, "change use align axis");
				useAlignAxis = wantedUseAxis;
			}
		if (useAlignAxis) {
			// Can not sort by "all" axis, indicates that to the user (X is the default)
			sortBy = SortAxis.X;
			switch (axis) {
			case Axis.Z: sortBy = SortAxis.Z; break;
			case Axis.Y: sortBy = SortAxis.Y; break;
			}
			GUILayout.Label("align axis (" + sortBy + ")");
		}
		else {
			SortAxis wantedSortBy = (SortAxis) EditorGUILayout.EnumPopup(sortBy);
			if (wantedSortBy != sortBy) {
				Undo.RegisterUndo(this, "change sort by");
				sortBy = wantedSortBy;
			}
		}
		EditorGUILayout.EndHorizontal();

		// Buttons !
		GUILayout.Space(4);
		EditorGUILayout.BeginHorizontal();
		if (GUILayout.Button(Resources.Load("alignMin") as Texture)) {
			if (Selection.transforms.Length < 2)
				ShowNotif();
			else {
				// Align to the min value
				landmark = Landmark.minimum;
				Align();
			}
		}
		if (GUILayout.Button(Resources.Load("alignMean") as Texture)) {
			if (Selection.transforms.Length < 2)
				ShowNotif();
			else {
				// Align to the center
				landmark = Landmark.mean;
				Align();
			}
		}
		if (GUILayout.Button(Resources.Load("alignMax") as Texture)) {
			if (Selection.transforms.Length < 2)
				ShowNotif();
			else {
				// Align to the max value
				landmark = Landmark.maximum;
				Align();
			}
		}
		//if (alignType == AlignType.Position) {
			if (GUILayout.Button(Resources.Load("distributeEquals") as Texture)) {
				if (Selection.transforms.Length < 2)
					ShowNotif();
				else {
					// Distribute objects
					landmark = Landmark.lineDistributed;
					Distribute();
				}
			}
		EditorGUILayout.EndHorizontal();
	}

	// Show notification if there is not at least 2 selected objects
	void ShowNotif() {
		String errorMsg = "Select at least 2 objects in the scene or hierarchy";
		Debug.LogWarning(errorMsg);
		// TODO find how to show a notif in the scene or game view !
		// The notification can not be displayed in the editor itself because it's too small
		// It does not display right away in the lastActiveSceneView nor the first one
		//if (SceneView.sceneViews.Count > 0)
		//(SceneView.sceneViews[0] as SceneView).ShowNotification(new GUIContent(errorMsg));
	}

	// ---------- Alignment Functions
	// ---------- ----------

	// Switch for align functions
	void Align() {
		switch (alignType) {
		case AlignType.Position:
			AlignPosition();
			break;
		case AlignType.Rotation:
			AlignRotation();
			break;
		case AlignType.Scale:
			AlignScale();
			break;
		}
	}

	// Switch for distribute functions
	void Distribute() {
		switch (alignType) {
		case AlignType.Position:
			DistributePosition();
			break;
		case AlignType.Rotation:
			DistributeRotation();
			break;
		case AlignType.Scale:
			DistributeScale();
			break;
		}
	}

	// Get the maximum coordinates from selected transforms
	private Vector3 GetMaxMarkPosition() {
		Vector3 markPosition = Selection.activeTransform.position;
		foreach (Transform nextTransform in Selection.transforms) {
			// Do not take size into account when making a distribution
			Bounds bounds = new Bounds(nextTransform.position, Vector3.zero);
			if (landmark != Landmark.lineDistributed) {
				if (nextTransform.renderer)
					bounds = nextTransform.renderer.bounds;
				else if (nextTransform.collider)
					bounds = nextTransform.collider.bounds;
			}
			if (nextTransform.position.x + bounds.extents.x > markPosition.x)
				markPosition.x = nextTransform.position.x + bounds.extents.x;
			if (nextTransform.position.y + bounds.extents.y > markPosition.y)
				markPosition.y = nextTransform.position.y + bounds.extents.y;
			if (nextTransform.position.z + bounds.extents.z > markPosition.z)
				markPosition.z = nextTransform.position.z + bounds.extents.z;
		}
		return markPosition;
	}

	// Get the minimum coordinates from selected transforms
	private Vector3 GetMinMarkPosition() {
		Vector3 markPosition = Selection.activeTransform.position;
		foreach (Transform nextTransform in Selection.transforms) {
			// Do not take size into account when making a distribution
			Bounds bounds = new Bounds(nextTransform.position, Vector3.zero);
			if (landmark != Landmark.lineDistributed) {
				if (nextTransform.renderer)
					bounds = nextTransform.renderer.bounds;
				else if (nextTransform.collider)
					bounds = nextTransform.collider.bounds;
			}
			if (nextTransform.position.x - bounds.extents.x < markPosition.x)
				markPosition.x = nextTransform.position.x - bounds.extents.x;
			if (nextTransform.position.y - bounds.extents.y < markPosition.y)
				markPosition.y = nextTransform.position.y - bounds.extents.y;
			if (nextTransform.position.z - bounds.extents.z < markPosition.z)
				markPosition.z = nextTransform.position.z - bounds.extents.z;
		}
		return markPosition;
	}

	// Align position
	void AlignPosition() {
		if (Selection.transforms.Length == 0)
			return;
		
		Undo.RegisterUndo(Selection.transforms, "Align Position");
		// Get the position from the active selected object
		Vector3 activePosition = Selection.activeTransform.position;
		// If alignment is not the mean one, search the min or max positioned object
		if (landmark != Landmark.mean) {
			Vector3 markPosition = Selection.activeTransform.position;
			switch (landmark) {
			case Landmark.minimum:
				markPosition = GetMinMarkPosition();
				break;
			case Landmark.maximum:
				markPosition = GetMaxMarkPosition();
				break;
			}
			activePosition = markPosition;
		}
		
		foreach (Transform nextTransform in Selection.transforms) {
			Vector3 newPos;
			Vector3 delta = Vector3.zero;
			if (landmark == Landmark.maximum) {
				if (nextTransform.renderer)
					delta = -nextTransform.renderer.bounds.extents;
				else if (nextTransform.collider)
					delta = -nextTransform.collider.bounds.extents;
			} else if (landmark == Landmark.minimum) {
				if (nextTransform.renderer)
					delta = nextTransform.renderer.bounds.extents;
				else if (nextTransform.collider)
					delta = nextTransform.collider.bounds.extents;
			}
			newPos.x = (axis == Axis.All || axis == Axis.X) ? activePosition.x + delta.x : nextTransform.position.x;
			newPos.y = (axis == Axis.All || axis == Axis.Y) ? activePosition.y + delta.y : nextTransform.position.y;
			newPos.z = (axis == Axis.All || axis == Axis.Z) ? activePosition.z + delta.z : nextTransform.position.z;
			nextTransform.position = newPos;
		}
	}

	// Get the maximum coordinates from selected transforms
	private Vector3 GetMaxMarkRotation() {
		Vector3 markRotation = Selection.activeTransform.eulerAngles;
		foreach (Transform nextTransform in Selection.transforms) {
			if (nextTransform.eulerAngles.x > markRotation.x)
				markRotation.x = nextTransform.eulerAngles.x;
			if (nextTransform.eulerAngles.y > markRotation.y)
				markRotation.y = nextTransform.eulerAngles.y;
			if (nextTransform.eulerAngles.z > markRotation.z)
				markRotation.z = nextTransform.eulerAngles.z;
		}
		return markRotation;
	}

	// Get the minimum coordinates from selected transforms
	private Vector3 GetMinMarkRotation() {
		Vector3 markRotation = Selection.activeTransform.eulerAngles;
		foreach (Transform nextTransform in Selection.transforms) {
			if (nextTransform.eulerAngles.x < markRotation.x)
				markRotation.x = nextTransform.eulerAngles.x;
			if (nextTransform.eulerAngles.y < markRotation.y)
				markRotation.y = nextTransform.eulerAngles.y;
			if (nextTransform.eulerAngles.z < markRotation.z)
				markRotation.z = nextTransform.eulerAngles.z;
		}
		return markRotation;
	}

	// Align rotation
	void AlignRotation() {
		if (Selection.transforms.Length == 0)
			return;
		
		Undo.RegisterUndo(Selection.transforms, "Align Rotation");
		// Get the rotation from the active selected object
		Vector3 activeRotation = Selection.activeTransform.eulerAngles;
		
		// If alignment is not the mean one, search the min or max oriented object
		if (landmark != Landmark.mean) {
			Vector3 markRotation = Selection.activeTransform.eulerAngles;
			switch (landmark) {
			case Landmark.minimum:
				markRotation = GetMinMarkRotation();
				break;
			case Landmark.maximum:
				markRotation = GetMaxMarkRotation();
				break;
			}
			activeRotation = markRotation;
		}
		
		foreach (Transform nextTransform in Selection.transforms) {
			Vector3 newRot;
			newRot.x = (axis == Axis.All || axis == Axis.X) ? activeRotation.x : nextTransform.eulerAngles.x;
			newRot.y = (axis == Axis.All || axis == Axis.Y) ? activeRotation.y : nextTransform.eulerAngles.y;
			newRot.z = (axis == Axis.All || axis == Axis.Z) ? activeRotation.z : nextTransform.eulerAngles.z;
			nextTransform.rotation = Quaternion.Euler(newRot);
		}
	}

	// Get the maximum scale from selected transforms
	private Vector3 GetMaxMarkScale() {
		Vector3 markScale = Selection.activeTransform.localScale;
		foreach (Transform nextTransform in Selection.transforms) {
			if (nextTransform.localScale.x > markScale.x)
				markScale.x = nextTransform.localScale.x;
			if (nextTransform.localScale.y > markScale.y)
				markScale.y = nextTransform.localScale.y;
			if (nextTransform.localScale.z > markScale.z)
				markScale.z = nextTransform.localScale.z;
		}
		return markScale;
	}

	// Get the minimum scale from selected transforms
	private Vector3 GetMinMarkScale() {
		Vector3 markScale = Selection.activeTransform.localScale;
		foreach (Transform nextTransform in Selection.transforms) {
			if (nextTransform.localScale.x < markScale.x)
				markScale.x = nextTransform.localScale.x;
			if (nextTransform.localScale.y < markScale.y)
				markScale.y = nextTransform.localScale.y;
			if (nextTransform.localScale.z < markScale.z)
				markScale.z = nextTransform.localScale.z;
		}
		return markScale;
	}

	// Align scale
	void AlignScale() {
		if (Selection.transforms.Length == 0)
			return;
		
		Undo.RegisterUndo(Selection.transforms, "Align Scale");
		// Get the local scale from the active selected object
		Vector3 activeScale = Selection.activeTransform.localScale;
		// If alignment is not the mean one, search the min or max positioned object
		if (landmark != Landmark.mean) {
			Vector3 markScale = Selection.activeTransform.localScale;
			switch (landmark) {
			case Landmark.minimum:
				markScale = GetMinMarkScale();
				break;
			case Landmark.maximum:
				markScale = GetMaxMarkScale();
				break;
			}
			activeScale = markScale;
		}
		
		foreach (Transform nextTransform in Selection.transforms) {
			Vector3 newScale;
			newScale.x = (axis == Axis.All || axis == Axis.X) ? activeScale.x : nextTransform.localScale.x;
			newScale.y = (axis == Axis.All || axis == Axis.Y) ? activeScale.y : nextTransform.localScale.y;
			newScale.z = (axis == Axis.All || axis == Axis.Z) ? activeScale.z : nextTransform.localScale.z;
			nextTransform.localScale = newScale;
		}
	}

	// ----- -----
	// ----- Distribute Functions

	// Distribute position
	void DistributePosition() {
		if (Selection.transforms.Length == 0)
			return;
		
		Undo.RegisterUndo(Selection.transforms, "Distribute Position");
		// Get the min and max marks
		Vector3 minMarkPosition = GetMinMarkPosition();
		Vector3 maxMarkPosition = GetMaxMarkPosition();
		
		// Interval
		Vector3 distanceBetween = (maxMarkPosition - minMarkPosition) / (Selection.transforms.Length - 1);
		// Delta from minMark
		Vector3 delta = Vector3.zero;
		
		// List of selected objects, to sort from the min position to the max position
		List<Transform> list = new List<Transform>(Selection.transforms);
		
		// Sort the selected objects from their position (only one axis is taken into account)
		if (sortBy == SortAxis.Z)
			list.Sort(ByVector3PositionZ);
		else if (sortBy == SortAxis.Y)
			list.Sort(ByVector3PositionY);
		else
			list.Sort(ByVector3PositionX);

		foreach (Transform nextTransform in list) {
			Vector3 newPos;
			newPos.x = (axis == Axis.All || axis == Axis.X) ? minMarkPosition.x + delta.x : nextTransform.position.x;
			newPos.y = (axis == Axis.All || axis == Axis.Y) ? minMarkPosition.y + delta.y : nextTransform.position.y;
			newPos.z = (axis == Axis.All || axis == Axis.Z) ? minMarkPosition.z + delta.z : nextTransform.position.z;
			nextTransform.position = newPos;
			delta += distanceBetween;
		}
	}

	// Distribute rotation
	void DistributeRotation() {
		if (Selection.transforms.Length == 0)
			return;

		Undo.RegisterUndo(Selection.transforms, "Distribute Rotation");
		// Get the min and max marks
		Vector3 minMarkRotation = GetMinMarkRotation();
		Vector3 maxMarkRotation = GetMaxMarkRotation();

		// Interval
		Vector3 distanceBetween = (maxMarkRotation - minMarkRotation) / (Selection.transforms.Length - 1);
		// Delta from minMark
		Vector3 delta = Vector3.zero;

		// List of selected objects, to sort from the min position to the max position
		List<Transform> list = new List<Transform>(Selection.transforms);
		
		// Sort the selected objects from their position (only one axis is taken into account)
		if (sortBy == SortAxis.Z)
			list.Sort(ByVector3PositionZ);
		else if (sortBy == SortAxis.Y)
			list.Sort(ByVector3PositionY);
		else
			list.Sort(ByVector3PositionX);

		foreach (Transform nextTransform in list) {
			Vector3 newPos;
			newPos.x = (axis == Axis.All || axis == Axis.X) ? minMarkRotation.x + delta.x : nextTransform.eulerAngles.x;
			newPos.y = (axis == Axis.All || axis == Axis.Y) ? minMarkRotation.y + delta.y : nextTransform.eulerAngles.y;
			newPos.z = (axis == Axis.All || axis == Axis.Z) ? minMarkRotation.z + delta.z : nextTransform.eulerAngles.z;
			nextTransform.rotation = Quaternion.Euler(newPos);
			delta += distanceBetween;
		}
	}

	// Distribute scale
	void DistributeScale() {
		if (Selection.transforms.Length == 0)
			return;

		Undo.RegisterUndo(Selection.transforms, "Distribute Scale");
		// Get the min and max marks
		Vector3 minMarkScale = GetMinMarkScale();
		Vector3 maxMarkScale = GetMaxMarkScale();

		// Interval
		Vector3 distanceBetween = (maxMarkScale - minMarkScale) / (Selection.transforms.Length - 1);
		// Delta from minMark
		Vector3 delta = Vector3.zero;

		// List of selected objects, to sort from the min position to the max position
		List<Transform> list = new List<Transform>(Selection.transforms);
		
		// Sort the selected objects from their position (only one axis is taken into account)
		if (sortBy == SortAxis.Z)
			list.Sort(ByVector3PositionZ);
		else if (sortBy == SortAxis.Y)
			list.Sort(ByVector3PositionY);
		else
			list.Sort(ByVector3PositionX);

		foreach (Transform nextTransform in list) {
			Vector3 newPos;
			newPos.x = (axis == Axis.All || axis == Axis.X) ? minMarkScale.x + delta.x : nextTransform.localScale.x;
			newPos.y = (axis == Axis.All || axis == Axis.Y) ? minMarkScale.y + delta.y : nextTransform.localScale.y;
			newPos.z = (axis == Axis.All || axis == Axis.Z) ? minMarkScale.z + delta.z : nextTransform.localScale.z;
			nextTransform.localScale = newPos;
			delta += distanceBetween;
		}
	}

	// Comparer method : X axis
	int ByVector3PositionX(Transform leftMost, Transform rightMost) {
		return Mathf.RoundToInt(leftMost.position.x - rightMost.position.x);
	}
	// Comparer method : Y axis
	int ByVector3PositionY(Transform leftMost, Transform rightMost) {
		return Mathf.RoundToInt(leftMost.position.y - rightMost.position.y);
	}
	// Comparer method : Z axis
	int ByVector3PositionZ(Transform leftMost, Transform rightMost) {
		return Mathf.RoundToInt(leftMost.position.z - rightMost.position.z);
	}


	// ----- -----

	// Update the editor window when user changes something (mainly useful when selecting objects)
	void OnInspectorUpdate() {
		Repaint();
	}
}
