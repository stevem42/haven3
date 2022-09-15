import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaList } from 'react-icons/fa';

export default function IngredientText(props) {
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div className="inline-block border m-1 border-black text-lg px-2 py-0 mb-6">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is_active' : ''}
        >
          <i>
            <FaList />
          </i>
        </button>
      </div>
    );
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: props.content || '',
    setActive: 'bulletList',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      props.updateText('ingredients', html);
    },
  });

  return (
    <div className="border border-black bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
