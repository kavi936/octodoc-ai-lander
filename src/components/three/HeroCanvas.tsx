"use client";

import { useEffect, useRef } from "react";

type HeroCanvasProps = {
  className?: string;
};

/**
 * Chaos → order particle field. Mouse is a resolution field.
 * One shared WebGLRenderer; DPR capped at 2; RAF paused off-screen.
 * Falls back silently if WebGL unavailable (SVG motif remains in DOM).
 */
export function HeroCanvas({ className }: HeroCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let raf = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let geometry: import("three").BufferGeometry | null = null;
    let material: import("three").ShaderMaterial | null = null;
    let points: import("three").Points | null = null;
    let scene: import("three").Scene | null = null;
    let camera: import("three").OrthographicCamera | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let visible = true;
    let pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const onPointer = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = 1 - (e.clientY - rect.top) / rect.height;
    };

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;

        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(w, h, false);
        renderer.setClearColor(0xf7fafb, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.pointerEvents = "none";
        host.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const count = Math.min(2800, Math.floor((w * h) / 180));
        geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const seeds = new Float32Array(count);
        const arms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const arm = i % 8;
          const r = 0.15 + Math.random() * 0.85;
          positions[i * 3] = Math.cos(a + arm) * r * (0.6 + Math.random() * 0.5);
          positions[i * 3 + 1] = Math.sin(a + arm * 0.7) * r * (0.5 + Math.random() * 0.55);
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
          seeds[i] = Math.random();
          arms[i] = arm;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        geometry.setAttribute("aArm", new THREE.BufferAttribute(arms, 1));

        material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.NormalBlending,
          uniforms: {
            uTime: { value: 0 },
            uResolve: { value: reduced ? 1 : 0.15 },
            uPointer: { value: new THREE.Vector2(0.5, 0.5) },
            uAspect: { value: w / h },
            uColorInk: { value: new THREE.Color("#0B1F2A") },
            uColorTeal: { value: new THREE.Color("#0E7490") },
            uColorBlot: { value: new THREE.Color("#B8C5CC") },
          },
          vertexShader: /* glsl */ `
            attribute float aSeed;
            attribute float aArm;
            uniform float uTime;
            uniform float uResolve;
            uniform vec2 uPointer;
            uniform float uAspect;
            varying float vMix;
            varying float vSeed;

            void main() {
              vSeed = aSeed;
              vec3 p = position;
              float angle = aArm / 8.0 * 6.28318;
              vec2 ordered = vec2(cos(angle), sin(angle)) * (0.25 + aSeed * 0.55);
              ordered.x /= uAspect;

              vec2 chaos = p.xy;
              chaos += vec2(
                sin(uTime * 0.35 + aSeed * 12.0) * 0.04,
                cos(uTime * 0.28 + aSeed * 9.0) * 0.04
              );

              vec2 ndc = chaos;
              vec2 ptr = (uPointer - 0.5) * vec2(2.0, 2.0);
              ptr.x *= uAspect;
              float d = length(ndc - ptr);
              float local = smoothstep(0.85, 0.05, d);
              float resolve = clamp(uResolve + local * 0.75, 0.0, 1.0);
              vMix = resolve;

              vec2 pos = mix(chaos, ordered, resolve);
              float size = mix(2.2, 1.35, resolve) * (0.8 + aSeed * 0.6);
              vec4 mv = modelViewMatrix * vec4(pos, p.z * (1.0 - resolve * 0.8), 1.0);
              gl_Position = projectionMatrix * mv;
              gl_PointSize = size * (90.0 / max(60.0, length(mv.xyz) * 40.0));
            }
          `,
          fragmentShader: /* glsl */ `
            uniform vec3 uColorInk;
            uniform vec3 uColorTeal;
            uniform vec3 uColorBlot;
            varying float vMix;
            varying float vSeed;

            void main() {
              vec2 uv = gl_PointCoord - 0.5;
              float d = length(uv);
              if (d > 0.5) discard;
              float alpha = smoothstep(0.5, 0.15, d) * mix(0.35, 0.85, vMix);
              vec3 blot = mix(uColorBlot, uColorInk, vSeed);
              vec3 col = mix(blot, mix(uColorInk, uColorTeal, vSeed), vMix);
              gl_FragColor = vec4(col, alpha);
            }
          `,
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);

        const resize = () => {
          if (!renderer || !camera || !material || !host) return;
          const nw = host.clientWidth || 1;
          const nh = host.clientHeight || 1;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(nw, nh, false);
          material.uniforms.uAspect.value = nw / nh;
        };

        resizeObserver = new ResizeObserver(() => {
          // debounce via rAF
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            resize();
            if (visible) frame(performance.now());
          });
        });
        resizeObserver.observe(host);

        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !reduced) raf = requestAnimationFrame(frame);
          },
          { threshold: 0.05 },
        );
        intersectionObserver.observe(host);

        window.addEventListener("pointermove", onPointer, { passive: true });

        let start = performance.now();
        const frame = (now: number) => {
          if (disposed || !renderer || !scene || !camera || !material) return;
          if (!visible) return;
          const t = (now - start) / 1000;
          material.uniforms.uTime.value = t;
          if (!reduced) {
            const target = Math.min(0.55 + Math.sin(t * 0.15) * 0.05, 0.72);
            material.uniforms.uResolve.value +=
              (target - material.uniforms.uResolve.value) * 0.02;
          } else {
            material.uniforms.uResolve.value = 1;
          }
          pointer.x += (pointer.tx - pointer.x) * 0.08;
          pointer.y += (pointer.ty - pointer.y) * 0.08;
          material.uniforms.uPointer.value.set(pointer.x, pointer.y);
          renderer.render(scene, camera);
          if (!reduced) raf = requestAnimationFrame(frame);
        };

        if (reduced) {
          material.uniforms.uResolve.value = 1;
          renderer.render(scene, camera);
        } else {
          raf = requestAnimationFrame(frame);
        }
      } catch {
        // WebGL unavailable — SVG fallback already in hero
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (points && scene) scene.remove(points);
      geometry?.dispose();
      material?.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        const canvas = renderer.domElement;
        canvas.parentElement?.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden="true"
    />
  );
}
