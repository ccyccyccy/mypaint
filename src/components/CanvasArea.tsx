import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { TOOLBAR_HEIGHT } from '../const';
import { canvasStore } from '../store';

export const CanvasArea = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onResize = () =>
      canvasStore.setCanvasSize(
        window.innerWidth,
        window.innerHeight - TOOLBAR_HEIGHT,
      );
    canvasStore.canvas = canvasRef.current;
    canvasStore.previewCanvas = previewCanvasRef.current;
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'u') {
        canvasStore.undo();
      } else if (e.key.toLowerCase() === 'y') {
        canvasStore.redo();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <canvas
        key="overlay"
        className="absolute z-20 pointer-events-none"
        ref={previewCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight - TOOLBAR_HEIGHT}
      />
      <canvas
        key="canvas"
        className="absolute z-10"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - TOOLBAR_HEIGHT}
        onClick={(e) => {
          e.preventDefault();
          if (!canvasStore.selectedTool) return;

          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const rect = canvas.getBoundingClientRect();

          canvasStore.selectedTool.onClick({
            ctx,
            mousePosition: {
              x: e.clientX - rect.x,
              y: e.clientY - rect.y,
            },
          });
        }}
      />
    </>
  );
});
