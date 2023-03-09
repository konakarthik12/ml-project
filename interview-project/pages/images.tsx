import useSWR from "swr";
import Layout from "@/components/Layout";
import Image from "next/image";

export function Upload() {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("/api/upload", {
      method: "POST",
      body: data,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Image File</span>
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Image Label</span>
          </label>
          <input
            name="label"
            type="text"
            placeholder="ex. red cat"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export function Img({id, name, src}) {
  const {mutate} = useSWR("/api/images");
  const deleteImage = async ({id}) => {
    const res = await fetch(`/api/images?id=${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      await mutate();
    }
  }
  return (
    <div className="relative w-[200px] h-[200px] border-black border-4">
      <Image fill alt="Mountains" src={src} sizes="100px"/>
      <span className="absolute top-0 left-0 bg-black text-white p-2">
        {name}
      </span>
      <button className="absolute bottom-0 right-0 bg-black text-white p-2" onClick={() => deleteImage({id})}>
        Delete
      </button>
    </div>
  );
}

export default function Images() {
  const {data, error} = useSWR("/api/images");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-center mb-3">Images</h1>
        <div className="flex space-x-3">
          {data && data.map(({name, src, id}) => <Img key={id} id={id} name={name} src={src}/>)}
        </div>
      </div>
      <Upload/>
    </div>
  );
}

Images.layout = Layout;
