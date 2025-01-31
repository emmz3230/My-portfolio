/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useFBX, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Avatar(props) {
  const { animation } = props;
  const { headFollow, cursorFollow, wireframe } = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  });

  const group = useRef();

  const { nodes, materials } = useGLTF(
    "models/6672093c813a8e7f2303a4db.glb"
  );

  const { animation: typingAnimation } = useFBX(
    "animations/Typing.fbx"
  );
  const { animation: standingAnimation } = useFBX(
    "animations/Standing Idle.fbx"
  );
  const { animation: fallingAnimation } = useFBX(
    "animations/Falling Idle.fbx"
  );

  // Ensure animations are loaded and are arrays
  if (Array.isArray(typingAnimation) && typingAnimation.length > 0) {
    typingAnimation[0].name = "Typing";
  }
  if (
    Array.isArray(standingAnimation) &&
    standingAnimation.length > 0
  ) {
    standingAnimation[0].name = "Standing";
  }
  if (
    Array.isArray(fallingAnimation) &&
    fallingAnimation.length > 0
  ) {
    fallingAnimation[0].name = "Falling";
  }

  const { actions } = useAnimations(
    [
      typingAnimation ? typingAnimation[0] : null,
      standingAnimation ? standingAnimation[0] : null,
      fallingAnimation ? fallingAnimation[0] : null,
    ].filter((animation) => animation !== null), // Filter out null animations
    group
  );

  useFrame((state) => {
    if (headFollow) {
      group.current
        .getObjectByName("Head")
        .lookAt(state.camera.position);
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(
        state.mouse.x,
        state.mouse.y,
        1
      );
      group.current.getObjectByName("Spine2").lookAt(target);
    }
  });

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation].reset().fadeIn(0.5).play();
      return () => {
        actions[animation].reset().fadeOut(0.5);
      };
    }
  }, [actions, animation]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          frustumCulled={false}
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={
            nodes.Wolf3D_Head.morphTargetDictionary
          }
          morphTargetInfluences={
            nodes.Wolf3D_Head.morphTargetInfluences
          }
        />
        <skinnedMesh
          frustumCulled={false}
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={
            nodes.Wolf3D_Teeth.morphTargetDictionary
          }
          morphTargetInfluences={
            nodes.Wolf3D_Teeth.morphTargetInfluences
          }
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Glasses.geometry}
          material={materials.Wolf3D_Glasses}
          skeleton={nodes.Wolf3D_Glasses.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/6672093c813a8e7f2303a4db.glb");
