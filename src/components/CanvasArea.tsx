import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { TOOLBAR_HEIGHT } from '../const';
import { rootStore } from '../store';

export const CanvasArea = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onResize = () =>
      rootStore.canvasStore.setCanvasSize(
        window.innerWidth,
        window.innerHeight - TOOLBAR_HEIGHT,
      );
    rootStore.canvasStore.canvas = canvasRef.current;
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <canvas
      key="canvas"
      ref={canvasRef}
      id="overlay"
      width={rootStore.canvasStore.canvasSize.width}
      height={rootStore.canvasStore.canvasSize.height}
      onClick={(e) => {
        e.preventDefault();
        if (!rootStore.canvasStore.selectedTool) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();

        rootStore.canvasStore.addLayers({
          ctx,
          mousePosition: {
            x: e.clientX - rect.x,
            y: e.clientY - rect.y,
          },
        });
      }}
    />
  );
});
