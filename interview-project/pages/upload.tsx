export default function Upload() {
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
