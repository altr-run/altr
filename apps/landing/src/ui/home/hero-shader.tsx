'use client'

import { useEffect, useMemo, useRef } from 'react'

type HeroShaderProps = {
	isHovered: boolean
}

const VERTEX_SHADER_SOURCE = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

void main() {
	gl_Position = a_position;
}
`

const DITHERING_FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;
uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec3 permute(vec3 x) {
	return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
	const vec4 C = vec4(
		0.211324865405187,
		0.366025403784439,
		-0.577350269189626,
		0.024390243902439
	);
	vec2 i = floor(v + dot(v, C.yy));
	vec2 x0 = v - i + dot(i, C.xx);
	vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
	vec4 x12 = x0.xyxy + C.xxzz;
	x12.xy -= i1;
	i = mod(i, 289.0);
	vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
	vec3 m = max(
		0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
		0.0
	);
	m = m * m;
	m = m * m;
	vec3 x = 2.0 * fract(p * C.www) - 1.0;
	vec3 h = abs(x) - 0.5;
	vec3 ox = floor(x + 0.5);
	vec3 a0 = x - ox;
	m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
	vec3 g;
	g.x = a0.x * x0.x + h.x * x0.y;
	g.yz = a0.yz * x12.xz + h.yz * x12.yw;
	return 130.0 * dot(m, g);
}

float hash11(float p) {
	p = fract(p * 0.3183099) + 0.1;
	p *= p + 19.19;
	return fract(p * p);
}

float hash21(vec2 p) {
	p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
	p += dot(p, p + 19.19);
	return fract(p.x * p.y);
}

float getSimplexNoise(vec2 uv, float t) {
	float noise = 0.5 * snoise(uv - vec2(0.0, 0.3 * t));
	noise += 0.5 * snoise(2.0 * uv + vec2(0.0, 0.32 * t));
	return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
	0, 8, 2, 10,
	12, 4, 14, 6,
	3, 11, 1, 9,
	15, 7, 13, 5
);
const int bayer8x8[64] = int[64](
	0, 32, 8, 40, 2, 34, 10, 42,
	48, 16, 56, 24, 50, 18, 58, 26,
	12, 44, 4, 36, 14, 46, 6, 38,
	60, 28, 52, 20, 62, 30, 54, 22,
	3, 35, 11, 43, 1, 33, 9, 41,
	51, 19, 59, 27, 49, 17, 57, 25,
	15, 47, 7, 39, 13, 45, 5, 37,
	63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
	ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
	int index = pos.y * size + pos.x;
	if (size == 2) return float(bayer2x2[index]) / 4.0;
	if (size == 4) return float(bayer4x4[index]) / 16.0;
	if (size == 8) return float(bayer8x8[index]) / 64.0;
	return 0.0;
}

void main() {
	float t = 0.5 * u_time;
	float pxSize = u_pxSize * u_pixelRatio;
	vec2 pxSizeUV = gl_FragCoord.xy - 0.5 * u_resolution;
	pxSizeUV /= pxSize;
	vec2 canvasPixelizedUV = (floor(pxSizeUV) + 0.5) * pxSize;
	vec2 normalizedUV = canvasPixelizedUV / u_resolution;
	vec2 ditheringNoiseUV = canvasPixelizedUV;
	vec2 shapeUV = normalizedUV;
	vec2 boxOrigin = vec2(0.5 - u_originX, u_originY - 0.5);
	vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
	givenBoxSize = max(givenBoxSize, vec2(1.0)) * u_pixelRatio;
	float r = u_rotation * PI / 180.0;
	mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
	float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
	vec2 boxSize = vec2(
		(u_worldWidth == 0.0) ? u_resolution.x : givenBoxSize.x,
		(u_worldHeight == 0.0) ? u_resolution.y : givenBoxSize.y
	);

	if (u_shape > 3.5) {
		vec2 objectBoxSize = vec2(0.0);
		objectBoxSize.x = min(boxSize.x, boxSize.y);
		if (u_fit == 1.0) {
			objectBoxSize.x = min(u_resolution.x, u_resolution.y);
		} else if (u_fit == 2.0) {
			objectBoxSize.x = max(u_resolution.x, u_resolution.y);
		}
		objectBoxSize.y = objectBoxSize.x;
		vec2 objectWorldScale = u_resolution.xy / objectBoxSize;
		shapeUV *= objectWorldScale;
		shapeUV += boxOrigin * (objectWorldScale - 1.0);
		shapeUV += vec2(-u_offsetX, u_offsetY);
		shapeUV /= u_scale;
		shapeUV = graphicRotation * shapeUV;
	} else {
		vec2 patternBoxSize = vec2(0.0);
		patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
		float patternWorldNoFitBoxWidth = patternBoxSize.x;
		if (u_fit == 1.0) {
			patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
		} else if (u_fit == 2.0) {
			patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
		}
		patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
		vec2 patternWorldScale = u_resolution.xy / patternBoxSize;
		shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
		shapeUV += boxOrigin;
		shapeUV -= boxOrigin / patternWorldScale;
		shapeUV *= u_resolution.xy;
		shapeUV /= u_pixelRatio;
		if (u_fit > 0.0) {
			shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
		}
		shapeUV /= u_scale;
		shapeUV = graphicRotation * shapeUV;
		shapeUV += boxOrigin / patternWorldScale;
		shapeUV -= boxOrigin;
		shapeUV += 0.5;
	}

	float shape = 0.0;
	if (u_shape < 1.5) {
		shapeUV *= 0.001;
		shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
		shape = smoothstep(0.3, 0.9, shape);
	} else if (u_shape < 2.5) {
		shapeUV *= 0.003;
		for (float i = 1.0; i < 6.0; i++) {
			shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
			shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
		}
		shape = 0.15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
		shape = smoothstep(0.02, 1.0, shape);
	} else if (u_shape < 3.5) {
		shapeUV *= 0.05;
		float stripeIdx = floor(2.0 * shapeUV.x / TWO_PI);
		float rand = hash11(stripeIdx * 10.0);
		rand = sign(rand - 0.5) * pow(0.1 + abs(rand), 0.4);
		shape = sin(shapeUV.x) * cos(shapeUV.y - 5.0 * rand * t);
		shape = pow(abs(shape), 6.0);
	} else if (u_shape < 4.5) {
		shapeUV *= 4.0;
		float wave = cos(0.5 * shapeUV.x - 2.0 * t)
			* sin(1.5 * shapeUV.x + t)
			* (0.75 + 0.25 * cos(3.0 * t));
		shape = 1.0 - smoothstep(-1.0, 1.0, shapeUV.y + wave);
	} else if (u_shape < 5.5) {
		float dist = length(shapeUV);
		float waves = sin(pow(dist, 1.7) * 7.0 - 3.0 * t) * 0.5 + 0.5;
		shape = waves;
	} else if (u_shape < 6.5) {
		float l = length(shapeUV);
		float angle = 6.0 * atan(shapeUV.y, shapeUV.x) + 4.0 * t;
		float twist = 1.2;
		float offset = 1.0 / pow(max(l, 1e-6), twist) + angle / TWO_PI;
		float mid = smoothstep(0.0, 1.0, pow(l, twist));
		shape = mix(0.0, fract(offset), mid);
	} else {
		shapeUV *= 2.0;
		float d = 1.0 - pow(length(shapeUV), 2.0);
		vec3 pos = vec3(shapeUV, sqrt(max(0.0, d)));
		vec3 lightPos = normalize(vec3(cos(1.5 * t), 0.8, sin(1.25 * t)));
		shape = 0.5 + 0.5 * dot(lightPos, pos);
		shape *= step(0.0, d);
	}

	int type = int(floor(u_type));
	float dithering = 0.0;
	switch (type) {
		case 1:
			dithering = step(hash21(ditheringNoiseUV), shape);
			break;
		case 2:
			dithering = getBayerValue(pxSizeUV, 2);
			break;
		case 3:
			dithering = getBayerValue(pxSizeUV, 4);
			break;
		default:
			dithering = getBayerValue(pxSizeUV, 8);
			break;
	}

	dithering -= 0.5;
	float res = step(0.5, shape + dithering);
	vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
	float fgOpacity = u_colorFront.a;
	vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
	float bgOpacity = u_colorBack.a;
	vec3 color = fgColor * res;
	float opacity = fgOpacity * res;
	color += bgColor * (1.0 - opacity);
	opacity += bgOpacity * (1.0 - opacity);
	fragColor = vec4(color, opacity);
}
`

const SHADER_FIT_NONE = 0
const DITHERING_SHAPE_WARP = 2
const DITHERING_TYPE_4X4 = 3
const DEFAULT_MIN_PIXEL_RATIO = 2
const DEFAULT_MAX_PIXEL_COUNT = 1920 * 1080 * 4
const BASE_SPEED = 0.2
const HOVER_SPEED = 0.6
const ANIMATION_START_DELAY_MS = 1000

function parseHexColor(hex: string): [number, number, number, number] {
	let normalized = hex.replace(/^#/, '')
	if (normalized.length === 3) {
		normalized = normalized
			.split('')
			.map((char) => char + char)
			.join('')
	}
	if (normalized.length === 6) {
		normalized += 'ff'
	}

	return [
		parseInt(normalized.slice(0, 2), 16) / 255,
		parseInt(normalized.slice(2, 4), 16) / 255,
		parseInt(normalized.slice(4, 6), 16) / 255,
		parseInt(normalized.slice(6, 8), 16) / 255,
	]
}

function compileShader(
	gl: WebGL2RenderingContext,
	type: number,
	source: string,
): WebGLShader {
	const shader = gl.createShader(type)
	if (!shader) {
		throw new Error('Failed to create shader')
	}

	gl.shaderSource(shader, source)
	gl.compileShader(shader)

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const error = gl.getShaderInfoLog(shader)
		gl.deleteShader(shader)
		throw new Error(error ?? 'Shader compile failed')
	}

	return shader
}

function createProgram(gl: WebGL2RenderingContext): WebGLProgram {
	const program = gl.createProgram()
	if (!program) {
		throw new Error('Failed to create shader program')
	}

	const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
	const fragmentShader = compileShader(
		gl,
		gl.FRAGMENT_SHADER,
		DITHERING_FRAGMENT_SHADER,
	)

	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)

	gl.deleteShader(vertexShader)
	gl.deleteShader(fragmentShader)

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const error = gl.getProgramInfoLog(program)
		gl.deleteProgram(program)
		throw new Error(error ?? 'Shader link failed')
	}

	return program
}

export default function HeroShader({ isHovered }: HeroShaderProps) {
	const mountRef = useRef<HTMLDivElement | null>(null)
	const speedRef = useRef(BASE_SPEED)
	const colorBack = useMemo(() => parseHexColor('#00000000'), [])
	// Radix indigo-7 (sRGB) = #aec0f5 — a light indigo that reads cleanly under
	// multiply blend on a warm off-white background, matching the brand indigo accent.
	// We use a lighter shade (7 vs 9) because multiply with dark colors on light bg
	// produces an overly heavy effect; this value gives a gentle blue-violet wash.
	const colorFront = useMemo(() => parseHexColor('#aec0f5'), [])

	useEffect(() => {
		const mount = mountRef.current
		if (!mount) return

		const canvas = document.createElement('canvas')
		canvas.className = 'absolute inset-0 block h-full w-full'
		mount.prepend(canvas)

		const gl = canvas.getContext('webgl2', {
			alpha: true,
			antialias: false,
			depth: false,
			stencil: false,
			powerPreference: 'high-performance',
			premultipliedAlpha: true,
		})

		if (!gl) {
			canvas.remove()
			return
		}

		const program = createProgram(gl)
		gl.useProgram(program)

		const positionBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW,
		)
		gl.enableVertexAttribArray(0)
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

		const uniformLocations = {
			time: gl.getUniformLocation(program, 'u_time'),
			resolution: gl.getUniformLocation(program, 'u_resolution'),
			pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
			originX: gl.getUniformLocation(program, 'u_originX'),
			originY: gl.getUniformLocation(program, 'u_originY'),
			worldWidth: gl.getUniformLocation(program, 'u_worldWidth'),
			worldHeight: gl.getUniformLocation(program, 'u_worldHeight'),
			fit: gl.getUniformLocation(program, 'u_fit'),
			scale: gl.getUniformLocation(program, 'u_scale'),
			rotation: gl.getUniformLocation(program, 'u_rotation'),
			offsetX: gl.getUniformLocation(program, 'u_offsetX'),
			offsetY: gl.getUniformLocation(program, 'u_offsetY'),
			pxSize: gl.getUniformLocation(program, 'u_pxSize'),
			colorBack: gl.getUniformLocation(program, 'u_colorBack'),
			colorFront: gl.getUniformLocation(program, 'u_colorFront'),
			shape: gl.getUniformLocation(program, 'u_shape'),
			type: gl.getUniformLocation(program, 'u_type'),
		}

		gl.uniform1f(uniformLocations.originX, 0.5)
		gl.uniform1f(uniformLocations.originY, 0.5)
		gl.uniform1f(uniformLocations.worldWidth, 0)
		gl.uniform1f(uniformLocations.worldHeight, 0)
		gl.uniform1f(uniformLocations.fit, SHADER_FIT_NONE)
		gl.uniform1f(uniformLocations.scale, 0.88)
		gl.uniform1f(uniformLocations.rotation, 0)
		gl.uniform1f(uniformLocations.offsetX, 0)
		gl.uniform1f(uniformLocations.offsetY, 0)
		gl.uniform1f(uniformLocations.pxSize, 1.45)
		gl.uniform4fv(uniformLocations.colorBack, colorBack)
		gl.uniform4fv(uniformLocations.colorFront, colorFront)
		gl.uniform1f(uniformLocations.shape, DITHERING_SHAPE_WARP)
		gl.uniform1f(uniformLocations.type, DITHERING_TYPE_4X4)

		let rafId = 0
		let idleId: number | null = null
		let timeoutId = 0
		let lastRenderTime = 0
		let frame = 0
		let renderScale = 1
		let hasAnimationStarted = false

		const resize = () => {
			const rect = mount.getBoundingClientRect()
			const dpr = Math.max(window.devicePixelRatio, DEFAULT_MIN_PIXEL_RATIO)
			const targetWidth = Math.max(1, Math.round(rect.width * dpr))
			const targetHeight = Math.max(1, Math.round(rect.height * dpr))
			const maxScale = Math.min(
				1,
				Math.sqrt(DEFAULT_MAX_PIXEL_COUNT / (targetWidth * targetHeight)),
			)
			const width = Math.max(1, Math.round(targetWidth * maxScale))
			const height = Math.max(1, Math.round(targetHeight * maxScale))

			renderScale = width / Math.max(1, Math.round(rect.width))
			canvas.width = width
			canvas.height = height
			gl.viewport(0, 0, width, height)
			gl.uniform2f(uniformLocations.resolution, width, height)
			gl.uniform1f(uniformLocations.pixelRatio, renderScale)
		}

		const render = (now: number) => {
			const dt = lastRenderTime === 0 ? 16.67 : now - lastRenderTime
			lastRenderTime = now
			frame += dt * speedRef.current
			gl.uniform1f(uniformLocations.time, frame * 0.001)
			gl.clear(gl.COLOR_BUFFER_BIT)
			gl.drawArrays(gl.TRIANGLES, 0, 6)
			rafId = window.requestAnimationFrame(render)
		}

		const renderStaticFrame = () => {
			lastRenderTime = performance.now()
			gl.uniform1f(uniformLocations.time, frame * 0.001)
			gl.clear(gl.COLOR_BUFFER_BIT)
			gl.drawArrays(gl.TRIANGLES, 0, 6)
		}

		const resizeObserver = new ResizeObserver(() => {
			resize()
			if (!hasAnimationStarted) {
				renderStaticFrame()
			}
		})

		const handleVisibilityChange = () => {
			speedRef.current = document.hidden
				? 0
				: isHovered
					? HOVER_SPEED
					: BASE_SPEED
		}

		const startAnimation = () => {
			if (hasAnimationStarted) return
			hasAnimationStarted = true
			handleVisibilityChange()
			lastRenderTime = performance.now()
			rafId = window.requestAnimationFrame(render)
		}

		const scheduleAnimationStart = () => {
			timeoutId = window.setTimeout(startAnimation, ANIMATION_START_DELAY_MS)
			if ('requestIdleCallback' in window) {
				idleId = window.requestIdleCallback(startAnimation, {
					timeout: ANIMATION_START_DELAY_MS,
				})
			}
		}

		resizeObserver.observe(mount)
		resize()
		speedRef.current = 0
		renderStaticFrame()
		window.requestAnimationFrame(() => {
			scheduleAnimationStart()
		})
		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			window.cancelAnimationFrame(rafId)
			if (idleId !== null && 'cancelIdleCallback' in window) {
				window.cancelIdleCallback(idleId)
			}
			window.clearTimeout(timeoutId)
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			resizeObserver.disconnect()
			gl.deleteBuffer(positionBuffer)
			gl.deleteProgram(program)
			gl.getExtension('WEBGL_lose_context')?.loseContext()
			canvas.remove()
		}
	}, [colorBack, colorFront])

	useEffect(() => {
		speedRef.current = document.hidden
			? 0
			: isHovered
				? HOVER_SPEED
				: BASE_SPEED
	}, [isHovered])

	return (
		<div
			ref={mountRef}
			className="pointer-events-none absolute inset-0 z-0"
			style={{
				opacity: 0.48,
				mixBlendMode: 'multiply',
				maskImage:
					'radial-gradient(ellipse 76% 78% at 50% 34%, #000 0%, rgba(0,0,0,0.92) 48%, transparent 90%)',
			}}
			aria-hidden="true"
		>
			<div
				className="absolute inset-0"
				style={{
					background:
						'radial-gradient(ellipse 72% 68% at 50% 34%, color-mix(in srgb, var(--acc) 32%, transparent), transparent 74%)',
				}}
			/>
		</div>
	)
}
