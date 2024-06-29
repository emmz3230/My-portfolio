import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect } from "react";
import { framerMotionConfig } from "../config";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { Office } from "./Office";
import { useState, useRef } from "react";
import { Projects } from "./Project";

export const Experience = (props) => {
  const { menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;
  const officeScaleRatio = Math.max(
    0.5,
    Math.min(0.9 * responsiveRatio, 0.9)
  );

  const [section, setSection] = useState();

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -5 : 0, {
      ...framerMotionConfig,
    });
    animate(cameraLookAtX, menuOpened ? 5 : 0, {
      ...framerMotionConfig,
    });
  }, [menuOpened]);

  const characterContainerAboutRef = useRef();

  const [characterAnimation, setCharacterAnimation] =
    useState("Typing");
  useEffect(() => {
    setCharacterAnimation("Falling");
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  const characterGroup = useRef();

  useFrame((state) => {
    // Ensure data and its properties are defined
    if (data && data.scroll && data.pages !== undefined) {
      let curSection = Math.floor(data.scroll.current * data.pages);

      if (curSection > 3) {
        curSection = 3;
      }

      if (curSection !== section) {
        setSection(curSection);
      }
    } else {
      console.error(
        "Data, data.scroll, or data.pages is not defined"
      );
    }

    // Get camera position and lookAt values
    const cameraPositionXValue = cameraPositionX.get();
    const cameraLookAtXValue = cameraLookAtX.get();

    // Ensure the values are valid
    if (
      typeof cameraPositionXValue === "number" &&
      typeof cameraLookAtXValue === "number"
    ) {
      state.camera.position.x = cameraPositionXValue;
      state.camera.lookAt(cameraLookAtXValue, 0, 0);
    } else {
      console.error("Invalid camera position or look at values", {
        cameraPositionXValue,
        cameraLookAtXValue,
      });
    }
  });

  return (
    <>
      <Background />
      <motion.group
        position={[
          1.9072935059634513, 0.14400000000000002, 2.681801948466054,
        ]}
        rotation={[
          -3.141592653589793, 1.2053981633974482, 3.141592653589793,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        animate={"" + section}
        transition={{
          duration: 0.6,
        }}
        variants={{
          0: {
            scaleX: officeScaleRatio,
            scaleY: officeScaleRatio,
            scaleZ: officeScaleRatio,
          },
          1: {
            y: -viewport.height + 0.5,
            x: isMobile ? 0.3 : 0,
            z: 7,
            rotateX: 0,
            rotateY: isMobile ? -Math.PI / 2 : 0,
            rotateZ: 0,
            scaleX: isMobile ? 1.5 : 1,
            scaleY: isMobile ? 1.5 : 1,
            scaleZ: isMobile ? 1.5 : 1,
          },
          2: {
            x: isMobile ? -1.4 : -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
          3: {
            y: -viewport.height * 3 + 1,
            x: 0.24,
            z: 8.5,
            rotateX: 0,
            rotateY: -Math.PI / 4,
            rotateZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
          },
        }}
      >
        <Avatar
          animation={characterAnimation}
          wireframe={section === 1}
        />
      </motion.group>
      <ambientLight intensity={1} />
      <motion.group
        position={[
          isMobile ? 0 : 1.5 * officeScaleRatio,
          isMobile ? -viewport.height / 6 : 2,
          3,
        ]}
        scale={[officeScaleRatio, officeScaleRatio, officeScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobile ? -viewport.height / 6 : 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <Office section={section} />
        <group
          ref={characterContainerAboutRef}
          name="CharacterSpot"
          position={[0.07, 0.16, -0.57]}
          rotation={[-Math.PI, 0.42, -Math.PI]}
        ></group>
      </motion.group>
      {/* SKILLS */}
      <motion.group
        position={[
          0,
          isMobile ? -viewport.height : -1.5 * officeScaleRatio,
          -10,
        ]}
        animate={{
          z: section === 1 ? 0 : -10,
          y:
            section === 1
              ? -viewport.height
              : isMobile
              ? -viewport.height
              : -1.5 * officeScaleRatio,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <Float>
          <mesh position={[1, -3, -15]} scale={[2, 2, 2]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[3, 3, 3]} position={[3, 1, -18]}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={1}
              speed={5}
              color="yellow"
            />
          </mesh>
        </Float>
        <Float>
          <mesh scale={[1.4, 1.4, 1.4]} position={[-3, -1, -11]}>
            <boxGeometry />
            <MeshWobbleMaterial
              opacity={0.8}
              transparent
              factor={1}
              speed={5}
              color={"blue"}
            />
          </mesh>
        </Float>
      </motion.group>
      <Projects />
    </>
  );
};
