import useSWR from "swr";

export default function Classify() {
  const { data, error } = useSWR("/api/images");
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-center mb-3">Images</h1>
      <div className="flex space-x-3">
        {data &&
          data.map((url: string) => (
            <img
              className="h-[100px] w-[100px] border-black border-4"
              src={url}
              key={url}
            />
          ))}
      </div>
    </div>
  );
}
