import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function IngredientText(props) {
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div className="border-b-2 border-black">
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
