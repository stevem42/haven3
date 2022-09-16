import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaListOl, FaBold, FaHeading } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

export default function DirectionText(props) {
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div>
        <div className=" inline-block px-2 ml-5 mr-2 text-xl pt-2 my-1 hover:text-white hover:bg-lakersPurple">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is_active' : ''}
          >
            <i>
              <FaListOl />
            </i>
          </button>
        </div>
        <div className=" inline-block px-2 text-xl pt-2 my-1 hover:text-white hover:bg-lakersPurple border-l-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is_active' : ''}
          >
            <i>
              <FaBold />
            </i>
          </button>
        </div>
        <div className=" inline-block px-2 text-xl pt-2 my-1 hover:text-white hover:bg-lakersPurple border-l-2">
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive('heading', { level: 6 }) ? 'is_active' : ''
            }
          >
            <i>
              <FaHeading />
            </i>
          </button>
        </div>
      </div>
    );
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: props.content || '',
    setActive: 'orderedList',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      props.updateText('directions', html);
    },
  });

  return (
    <div className="border border-lakersPurple bg-white mt-1">
      <div className="border-b border-lakersPurple mb-8">
        <MenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
