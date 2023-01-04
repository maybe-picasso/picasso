import { useEffect,useMemo, useRef } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { extend, useLoader } from '@react-three/fiber';
extend({ TextGeometry });

const fontsrc = 'fonts/Jua_Regular-picaso.json';

const Typo3D = ({
  children,
  style = '',
  vAlign = 'center',
  hAlign = 'center',
  size = 1,
  color = '#000000',
  ...props
}) => {
  const font = useLoader(FontLoader, fontsrc);

  const config = useMemo(
    () => ({
      font,
      size: 3,
      height: 0.5, //앞뒤 두께감
      curveSegments: 1.5, //너무 높게하면 리렌더링 오래걸림
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.1,
      bevelOffset: 0.01,
      bevelSegments: 10,
    }),
    [font]
  );

  /** 센터 정렬 */
  const mesh = useRef(null);
  useEffect(() => {
    if (mesh.current) {
      mesh.current.children[0].geometry.center();
    }
  }, [children]);

  return (
    <group ref={mesh} {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshPhongMaterial shininess={200} color={color} attach="material" />
      </mesh>
    </group>
  );
};

export default Typo3D;
