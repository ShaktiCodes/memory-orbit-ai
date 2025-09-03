import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Memory Node Component
function MemoryNode({ position, color, size, label, onClick }: {
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
  onClick?: () => void;
}) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Generate sample memory nodes
function generateMemoryNodes() {
  const memories = [
    { id: 1, label: 'Tokyo Trip', type: 'photo', category: 'travel' },
    { id: 2, label: 'Project Ideas', type: 'note', category: 'work' },
    { id: 3, label: 'Dream Journal', type: 'audio', category: 'personal' },
    { id: 4, label: 'Sunset Beach', type: 'photo', category: 'nature' },
    { id: 5, label: 'Meeting Notes', type: 'note', category: 'work' },
    { id: 6, label: 'Birthday Party', type: 'photo', category: 'social' },
  ];

  const colors = {
    photo: '#8B5CF6', // Primary purple
    note: '#06B6D4',  // Accent teal
    audio: '#F59E0B'   // Warning amber
  };

  return memories.map((memory, index) => ({
    ...memory,
    position: [
      (Math.cos(index * 1.2) * 4) + (Math.random() - 0.5) * 2,
      (Math.sin(index * 0.8) * 3) + (Math.random() - 0.5) * 2,
      (Math.sin(index * 1.5) * 2) + (Math.random() - 0.5) * 2,
    ] as [number, number, number],
    color: colors[memory.type as keyof typeof colors],
    size: 0.3 + Math.random() * 0.2,
  }));
}

export function MemoryGalaxy({ className }: { className?: string }) {
  const memoryNodes = useMemo(() => generateMemoryNodes(), []);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          
          {/* Background Stars */}
          <Stars 
            radius={300} 
            depth={60} 
            count={1000} 
            factor={7} 
            saturation={0.5}
            fade 
          />
          
          {/* Memory Nodes */}
          {memoryNodes.map((memory) => (
            <MemoryNode
              key={memory.id}
              position={memory.position}
              color={memory.color}
              size={memory.size}
              label={memory.label}
              onClick={() => console.log(`Clicked: ${memory.label}`)}
            />
          ))}
          
          {/* Orbital Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={20}
            autoRotate
            autoRotateSpeed={0.2}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}