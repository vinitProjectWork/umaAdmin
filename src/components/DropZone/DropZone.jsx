import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { DeleteProductMediaById } from "../../services";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: 100,
  padding: 4,
  boxSizing: "border-box",
  justifyContent: "center",
};

const thumbInner = {
  display: "flex",
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

const Previews = ({ data, setData }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: (acceptedFiles) => {
      const _files = acceptedFiles.map((file, index) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          order: (index + 1 + (data?.media?.length ?? 0)) * 100,
        })
      );
      data.media = data?.media ? [...data?.media, ..._files] : _files;
      setData({ ...data, media });
    },
  });

  const handleReorderIndex = (value, index) => {
    let _files = data?.media;
    let _currentFile = _files[index];
    _currentFile.order = value;
    // const _sortedMedia = [..._files].sort((a, b) => a.order - b.order);
    setData({ ...data, media: _files });
  };

  const handleReorder = () => {
    let _files = data?.media;
    // let _currentFile = _files[index];
    // _currentFile.order = value;
    const _sortedMedia = [..._files].sort((a, b) => a.order - b.order);
    setData({ ...data, media: _sortedMedia });
  };

  const thumbs = data?.media?.map((file, index) => (
    <div
      className="flex flex-col justify-center gap-2 border-2 m-1 border-indigo-500 p-2 rounded-md shadow-md"
      key={file.name}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={file.order}
          className="border-2 w-36 text-center px-2 outline-none rounded-md"
          onChange={(e) =>
            handleReorderIndex(
              e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"),
              index
            )
          }
        />
      </div>
      <div style={thumb}>
        <div style={thumbInner} className="flex flex-col">
          {["video/mp4", ".mp4"].includes(file.type) ? (
            <video
              src={file.preview}
              style={img}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          ) : (
            <img
              src={file.preview}
              style={img}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          )}
        </div>
      </div>
      <p className="text-slate-500 text-xs">{`${
        file.type === "video/mp4" ? "Video: " : "Image: "
      } ${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
      {file.id && (
        <button
          type="button"
          onClick={() => {
            if (confirm("Sure You want to delete?")) {
              // DeleteProductMediaById(file?.id).then(resp => {
              // })
              const media = data?.media?.filter((item) => item.id !== file?.id);
              setData({ ...data, media });
            }
          }}
          className="flex justify-center w-full mt-2 font-medium border-2 bg-red-900 text-slate-100 rounded-sm"
        >
          Delete
        </button>
      )}
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      data?.media?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <section className="border-2 border-dashed rounded-md cursor-pointer border-slate-400 p-5 h-40 flex justify-center items-center flex-col">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="text-lg text-slate-400">
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      </section>
      <div className="w-full flex justify-end">
        <button
          className="p-2 w-max bg-sky-900 text-slate-100 rounded-md mt-4"
          onClick={() => handleReorder()}
        >
          Reorder
        </button>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  );
};

export default Previews;
