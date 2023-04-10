import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { MenuBar } from './MenuBar';
import { UseFormSetValue } from 'react-hook-form';

interface DirectionTextProps {
  updateText: UseFormSetValue<{
    title: string;
    course: string;
    ingredients: string;
    directions: string;
    notes: string;
    user_id: string;
  }>;
  content: string | undefined;
}

export default function DirectionText(props: DirectionTextProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: props.content || '',
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
