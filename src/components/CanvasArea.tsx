type Props = {
  width: number;
  height: number;
};

export const CanvasArea = ({ width, height }: Props) => {
  return <canvas id="overlay" width={width} height={height} />;
};
