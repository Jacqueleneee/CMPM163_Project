// JavaScript source code
var lightningVS = 
`
	#define SCALE 3.0
	precision mediump float;
	uniform mat4 modelMatrix;
	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;

	uniform float time;


	attribute vec3 position;

	float noiseX(float y)
	{
		float x = 0.0;
	    x += fract((sin(y * 1.0 / SCALE + time * 1.0) + cos(y * 3.3 / SCALE + time * 1.5) + tan(y * 4.3 / SCALE + time * 0.2)));
		return x;
	}

	float noiseY(float y)
	{
		float x = 0.0;
	    x += fract((tan(y * 1.0 / SCALE + time * 1.0) + cos(y * 3.3 / SCALE + time * 4.5) + sin(y * 1.3 / SCALE + time * 0.6)));
		return x;
	}

	void main()
	{
		vec3 pos = position;

		float strength = .5;

		pos.x += strength * noiseX(pos.y);
		pos.y += strength * noiseY(pos.y);

		gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
	}
`;

var lightningFS = 
`
	precision mediump float;

	uniform float time;

	void main()
	{
		if(time == 0.0 || time <= 5.0)
		{
			gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
		}
		else
		{
			gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
		}
	}
`;