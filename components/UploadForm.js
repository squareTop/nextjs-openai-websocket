"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export function UploadForm({ emailRef, ...props }) {
  const [files, setFiles] = useState();

  const onEmbed = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/qa/embed?email=${emailRef?.current?.value}`,
        {
          method: "POST",
        }
      );
      if (!res.ok) throw new Error(await res.text());
      toast.success((await res.json()).message);
    } catch (error) {
      // Handle errors here
      console.error(e);
      toast.error(e.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!files || !files.length) return;
    console.log(files);

    try {
      const data = new FormData();
      for (let i = 0; i < files.length; ++i) data.append(`files`, files[i]);

      console.log("Email:", emailRef?.current?.value);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/documents/upload?email=${emailRef?.current?.value}`,
        {
          method: "POST",
          body: data,
        }
      );
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      toast.success((await res.json()).message);
      setFiles(null);
    } catch (e) {
      // Handle errors here
      console.error(e);
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={onSubmit} {...props}>
      <label
        htmlFor="file"
        className="rounded border-2 border-[#0d6efd] p-2 text-sm flex-1 text-center"
      >
        🟡 Files
      </label>
      <input
        type="file"
        name="file"
        id="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        hidden
      />
      <input
        type="submit"
        value="✅ Upload"
        className="rounded border-2 border-[#b02a37] ml-2 p-2 text-sm flex-1 text-center"
        style={{ visibility: files?.length > 0 ? "visible" : "hidden" }}
      />
      <button
        className="rounded border-2 border-[#198754] ml-2 p-2 text-sm flex-1 text-center visible"
        onClick={onEmbed}
      >
        🔒 Embed
      </button>
    </form>
  );
}
