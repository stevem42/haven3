import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaListOl } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

export default function DirectionText(props) {
  const liButtonRef = useRef(null);

  useEffect(() => {
    if (editor) {
      document.getElementById('btn').click();
    }
  }, []);

  let newValues;
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div className="inline-block border m-1 border-black text-lg px-2 py-0 mb-6">
        <button
          id="btn"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is_active' : ''}
        >
          <FaListOl />
        </button>
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
    <div className="border border-black bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
