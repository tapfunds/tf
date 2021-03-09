import React from 'react';
import ParticleImage, {
    Vector,
    forces
} from "react-particle-image";

const particleOptions = {
    filter: ({ x, y, image }) => {
        // Get pixel
        const pixel = image.get(x, y);
        // Make a particle for this pixel if blue > 50 (range 0-255)
        return pixel.b > 50;
      },
      color: ({ x, y, image }) => "white",
      radius: () => Math.random() * 1.5 + 0.5,
      mass: () => 70,
      friction: () => 0.15,
      initialPosition: ({ canvasDimensions }) => {
        return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
      }
  };

const motionForce = (x, y) => {
    return forces.disturbance(x, y, 5);
}

export function TypographyOne() {

    return (
        <ParticleImage
            src={"/transfer_money_fast.svg"}
            width={window.innerWidth/2}
            height={window.innerHeight/2}
            scale={0.40}
            entropy={20}
            maxParticles={4200}
            particleOptions={particleOptions}
            mouseMoveForce={motionForce}
            touchMoveForce={motionForce}
            backgroundColor="#48A9FF" />
    );
}


const particleOptions2 = {
    filter: ({ x, y, image }) => {
        // Get pixel
        const pixel = image.get(x, y);
        // Make a particle for this pixel if blue > 50 (range 0-255)
        return pixel.b > 50;
      },
      color: ({ x, y, image }) => "#48A9FF",
      radius: () => Math.random() * 1.5 + 0.5,
      mass: () => 70,
      friction: () => 0.15,
      initialPosition: ({ canvasDimensions }) => {
        return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
      }
  };

export function TypographyTwo() {

    return (
        <ParticleImage
            src={"/understand_spending_habits.svg"}
            width={window.innerWidth/2}
            height={window.innerHeight/2}
            scale={0.40}
            entropy={20}
            maxParticles={8200}
            particleOptions={particleOptions2}
            mouseMoveForce={motionForce}
            touchMoveForce={motionForce}
            backgroundColor="bg-green-500" />
    );
}


const particleOptions3 = {
    filter: ({ x, y, image }) => {
        // Get pixel
        const pixel = image.get(x, y);
        // Make a particle for this pixel if blue > 50 (range 0-255)
        return pixel.b > 50;
      },
      color: ({ x, y, image }) => "white",
      radius: () => Math.random() * 1.5 + 0.5,
      mass: () => 70,
      friction: () => 0.15,
      initialPosition: ({ canvasDimensions }) => {
        return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
      }
  };

export function TypographyThree() {

    return (
        <ParticleImage
            src={"/integrate_any_bank_account.svg"}
            width={window.innerWidth/2}
            height={window.innerHeight/2}
            scale={0.40}
            entropy={20}
            maxParticles={8200}
            particleOptions={particleOptions3}
            mouseMoveForce={motionForce}
            touchMoveForce={motionForce}
            backgroundColor="#48A9FF" />
    );
}