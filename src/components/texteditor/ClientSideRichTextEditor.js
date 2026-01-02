'use client'

import dynamic from 'next/dynamic';

const ClientSideRichTextEditor = dynamic( () => import( './RichTextEditor' ), { ssr: false } );

export default ClientSideRichTextEditor;