"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function RichTextEditor({ value, onChange }) {
  return (
    <div className="rounded-lg overflow-hidden border bg-white">
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
