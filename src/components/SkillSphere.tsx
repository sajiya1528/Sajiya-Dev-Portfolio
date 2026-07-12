import React, { useEffect, useRef, useState } from "react";

interface Tag {
  text: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
}

const SKILL_TAGS = [
  "React", "TypeScript", "Node.js", "Express", "MongoDB", "MySQL", 
  "Java", "Python", "SQL", "Git", "Docker", "Framer Motion", 
  "Tailwind", "Figma", "REST API", "Vite", "AI", "Machine Learning", 
  "Data Science", "Postman", "Vercel", "HTML", "CSS", "JavaScript"
];

export const SkillSphere: React.FC = () => {
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const rotationRef = useRef({ x: 0.005, y: 0.005 }); // initial rotation speeds
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);

  // Initialize tags on a sphere using Fibonacci sphere algorithm
  useEffect(() => {
    const N = SKILL_TAGS.length;
    const radius = 140; // Sphere radius
    const initialTags: Tag[] = SKILL_TAGS.map((text, i) => {
      // Golden spiral distribution
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      return {
        text,
        x,
        y,
        z,
        scale: 1,
        opacity: 1,
      };
    });

    setTags(initialTags);
  }, []);

  // Update positions at 60fps
  useEffect(() => {
    let animationFrameId: number;

    const rotateTags = () => {
      // Determine rotation speeds based on mouse position relative to center
      let rx = rotationRef.current.x;
      let ry = rotationRef.current.y;

      if (isHoveredRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Scale speeds based on mouse distance from center
        ry = (mousePosRef.current.x - centerX) * 0.0001;
        rx = -(mousePosRef.current.y - centerY) * 0.0001;
      } else {
        // Slow decay back to base rotation
        rotationRef.current.x += (0.003 - rotationRef.current.x) * 0.05;
        rotationRef.current.y += (0.003 - rotationRef.current.y) * 0.05;
        rx = rotationRef.current.x;
        ry = rotationRef.current.y;
      }

      setTags((prevTags) =>
        prevTags.map((tag) => {
          // Rotate around X-axis
          const cosX = Math.cos(rx);
          const sinX = Math.sin(rx);
          const y1 = tag.y * cosX - tag.z * sinX;
          const z1 = tag.y * sinX + tag.z * cosX;

          // Rotate around Y-axis
          const cosY = Math.cos(ry);
          const sinY = Math.sin(ry);
          const x2 = tag.x * cosY - z1 * sinY;
          const z2 = tag.x * sinY + z1 * cosY;

          // Perspective projections
          const depth = 280; // Distance to camera
          const scale = depth / (depth + z2); // 3D projection scaling factor
          const opacity = Math.max(0.2, 1 - (z2 + 140) / 280); // Fades when far away

          return {
            ...tag,
            x: x2,
            y: y1,
            z: z2,
            scale,
            opacity,
          };
        })
      );

      animationFrameId = requestAnimationFrame(rotateTags);
    };

    animationFrameId = requestAnimationFrame(rotateTags);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <svg
        ref={containerRef}
        width="100%"
        height="360"
        viewBox="-200 -200 400 400"
        className="max-w-[400px] cursor-grab active:cursor-grabbing select-none overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Subtle glowing center radial background */}
        <defs>
          <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="160" fill="url(#sphereGlow)" />

        {/* 3D projected text tags */}
        {tags.map((tag, idx) => {
          const fontSize = 12 + tag.scale * 4;
          // Colors based on tag index/depth to create gradient structure
          const isFront = tag.z < 0;
          const fontColor = isFront
            ? "fill-purple-600 dark:fill-cyan-400 font-bold"
            : "fill-gray-400/70 dark:fill-gray-600/50 font-normal";

          return (
            <text
              key={`tag-${idx}`}
              x={tag.x}
              y={tag.y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: `${fontSize}px`,
                opacity: tag.opacity,
                transition: "fill 0.3s ease",
              }}
              className={`${fontColor} select-none transition-all duration-300 font-display hover:fill-rose-500 hover:scale-110 cursor-pointer`}
            >
              {tag.text}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
