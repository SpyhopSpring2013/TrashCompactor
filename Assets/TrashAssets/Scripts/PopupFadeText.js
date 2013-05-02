#pragma strict

class PopupFadeText
{
	private var m_position:Vector2;
	private var m_velocity:Vector2;
	private var m_drag:Vector2;
	private var m_timer:float;
	private var m_alpha:float;
	public var m_text:String;
	public var m_fontSize:int;
	public var m_width:int;
	public var m_height:int;

	private var m_cycleTime:float;
	private var m_alphaDif:float;


	public function PopupFadeText(position:Vector2, text:String, fontSize:int, velocity:Vector2, drag:Vector2, cycleTime:float)
	{
		m_position = position;
		m_fontSize= fontSize;
		m_width = m_height = 100;
		m_velocity = velocity;
		m_drag = drag;
		m_timer = 0;
		m_alpha = 1.0;
		m_text = text;

		setCycleTime(cycleTime);
		}

	public function PopupFadeText(position:Vector2, text:String)
	{
		m_position = position;
		m_fontSize = 0;
		m_width = m_height = 100;
		m_velocity = Vector2(0,-10);
		m_drag = Vector2(0,1);
		m_timer = 0;
		m_alpha = 1.0;
		m_text = text;

		setCycleTime(2.0);
	}

	public function update(deltaTime:float):void
	{
		m_position.x += m_velocity.x * deltaTime;
		m_position.y += m_velocity.y * deltaTime;

		m_velocity.x += m_drag.x * deltaTime;
		m_velocity.y += m_drag.y * deltaTime;

		m_alpha -= m_alphaDif * deltaTime;

		m_timer += deltaTime;
	}

	public function draw(skin:GUISkin)
	{
		GUI.color.a = m_alpha;
		var oldSize:int = GUI.skin.label.fontSize;
		GUI.skin.label.fontSize = m_fontSize;
		GUI.Label(Rect(m_position.x, m_position.y, m_width, m_height), m_text, skin.label);
		GUI.skin.label.fontSize = oldSize;
		GUI.color.a = 1.0;
	}

	public function draw():void
	{
		GUI.color.a = m_alpha;
		var oldSize:int = GUI.skin.label.fontSize;
		GUI.skin.label.fontSize = m_fontSize;
		GUI.Label(Rect(m_position.x, m_position.y, m_width, m_height), m_text);
		GUI.skin.label.fontSize = oldSize;
		GUI.color.a = 1.0;
	}

	public function setCycleTime(time:float):void
	{
		m_cycleTime = time;
		m_alphaDif = 1/time;
	}

	function isDone():boolean
	{
		return m_timer > m_cycleTime;
	}

}