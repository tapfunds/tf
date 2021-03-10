import React from "react";

const BankTap = (props) => {
  return (
    <div>
        <div class="bg-gray-100 py-6 flex-1 flex-col justify-start sm:py-9">
          <div style={{width:"55%"}} class="relative  sm:max-w-xl sm:mx-auto ">
            <div  class="absolute inset-0 shadow-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 sm:rounded-3xl"></div>
            <div class="relative sm:p-20">
              <h1 class="max-w-md mx-auto">{props.name}</h1>
            </div>
          </div>

        </div>
      
      </div>
  );
};

export default BankTap;
