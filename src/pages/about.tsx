import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from 'components/Avatar'

import type { NextPage } from 'next'

const Page: NextPage = () => (
  <Canvas
    camera={{ position: [0, 2, 15], fov: 10 }}
    dpr={typeof window != 'undefined' ? window.devicePixelRatio : undefined}
    frameloop="demand"
    vr={true}
    style={{
      width: '100vw',
      height: '100vh',
    }}
  >
    <ambientLight intensity={1.25} />
    <ambientLight intensity={0.1} />
    <directionalLight intensity={0.4} />
    <Suspense fallback={null}>
      <Model position={[0, -0.8, 0]} />
    </Suspense>
    <OrbitControls />
  </Canvas>
)

export default Page
