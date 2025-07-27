type CaloriesDisplayProps = {
  nombre: string;
  calories: number;
};
export default function CaloriesDisplay({
  nombre,
  calories,
}: CaloriesDisplayProps) {
  return (
    <>
      <p className="text-white text-center font-bold rounded-full grid grid-cols-1 gap-3">
        <span className="text-6xl">{calories}</span>
        {nombre}
      </p>
    </>
  );
}
