import React from 'react';

const PlaceHolder: React.FC = () => {
  return (
    <React.Fragment>
    <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className=" text-3xl font-bold text-gray-900">
            Feature Soon Come 
          </h1>
        </div>
      </header>
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
            
      <body className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
        <img src="./logo2.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-blue-300"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Taiwlind with React TypeScript
        </a>
      </body>
    </div>
    </React.Fragment>
  );
}

export default PlaceHolder;