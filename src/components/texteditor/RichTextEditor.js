"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Essentials, Paragraph, BlockQuote, Bold, Italic, Font, Link, List, Table } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export default function RichTextEditor({ value, onChange }) {
  return (
    <div className="rounded-lg overflow-hidden border bg-white">
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        onChange={(event, editor) => {
          onChange(editor.getData());
        }}
        config={{
          licenseKey: 'GPL',
          plugins: [  Essentials, Paragraph, BlockQuote, Bold, Italic, Font, Link, List, Table ],
          toolbar: {
            items: [
              'undo', 'redo',
              '|',
              'bold',
              'italic',
              'fontSize',
              'fontFamily',
              'fontColor',
              '|',
              'link',
              'bulletedList',
              'numberedList',
              'blockQuote',
              '|',
              'table'
            ],
          },
          link: {
            addTargetToExternalLinks: true,
          }
        }}
      />
    </div>
  );
}
