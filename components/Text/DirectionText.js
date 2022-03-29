import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function DirectionText(props) {
  let newValues;
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }

    return (
      <div>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is_active' : ''}
        >
          Ordered List
        </button>
      </div>
    );
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    setActive: 'orderedList',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      props.updateText('directions', html);
      //setText(html);
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
