import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TipTap({ setDescription }) {
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is_active' : ''}
        >
          Bullet List
        </button>
      </div>
    );
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    setActive: 'bulletList',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
      //console.log(html);
    },
  });

  return (
    <div className="border border-black bg-white">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
