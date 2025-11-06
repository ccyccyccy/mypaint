import { useEffect, useState } from 'react';
import './App.css';
import { CanvasArea } from './components/CanvasArea';
import { Layer } from './components/Layers';
import { ToolDetails } from './components/ToolDetails';
import { ToolSelector } from './components/ToolSelector';

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setWindowSize({ width: window.innerWidth, height: innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="relative">
      <div className="z-0 absolute">
        <CanvasArea width={windowSize.width} height={windowSize.height} />
      </div>
      <div className="z-10 absolute top-0 w-full h-10">
        <ToolSelector />
      </div>
      <div className="z-10 absolute top-12 left-2">
        <ToolDetails />
      </div>
      <div className="z-10 absolute top-12 right-2">
        <Layer />
      </div>
    </div>
  );
};

export default App;
