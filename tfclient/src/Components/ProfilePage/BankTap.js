import React from 'react';
import ParticleImage from "react-particle-image";

const particleOptions = {
    filter: ({ x, y, image }) => {
      // Get pixel
      const pixel = image.get(x, y);
      // Make a particle for this pixel if blue > 50 (range 0-255)
      return pixel.b > 90;
    },
    color: ({ x, y, image }) => "#61dafb"
  };

const BankTap = () => {
    return(
        <ParticleImage
      src={"/Tapfunds.svg"}
      scale={0.75}
      entropy={20}
      maxParticles={4200}
      particleOptions={particleOptions}
    />
    );
};

export default BankTap;