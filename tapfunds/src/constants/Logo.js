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
      color: ({ x, y, image }) => "#004966",
      radius: () => Math.random() * 1.5 + 0.5,
      mass: () => 40,
      friction: () => 0.15,
      initialPosition: ({ canvasDimensions }) => {
        return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
      }
  };

const motionForce = (x, y) => {
    return forces.disturbance(x, y, 5);
}

const Logo = () => {

    return(
        <ParticleImage
      src={"/Bank_of_America_logo.svg"}
      width={window.innerWidth}
      height={window.innerHeight}
      scale={0.75}
      entropy={20}
      maxParticles={4200}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="white"
    />
    );
};

