import { Canvas } from '@react-three/fiber';
import { OrbitControls, Reflector } from '@react-three/drei';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full -z-10" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Reflector receiveShadow position={[0, -1, 0]} args={[10, 10]} resolution={512} mirror={1}>
        {(Material, props) => <Material color="#1e40af" metalness={0.8} roughness={0.2} {...props} />}
      </Reflector>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;