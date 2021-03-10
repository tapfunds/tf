import React from "react";

const BankTap = (props) => {
  return (
    <div>
        <div class="bg-gray-100 py-6 flex-1 flex-col justify-start sm:py-12">
          <div style={{width:"75%"}} class="relative  sm:max-w-xl sm:mx-auto ">
            <div style={{backgroundImage: `linear-gradient(to right, ${props.color}, #eeee)`,width:"62%" }} class="absolute inset-0 shadow-lg  sm:rounded-3xl"></div>
            <div class="relative sm:p-20">
              <h1 class="max-w-md mx-auto">{props.name}</h1>
            </div>
          </div>

        </div>
      
      </div>
  );
};

export default BankTap;
