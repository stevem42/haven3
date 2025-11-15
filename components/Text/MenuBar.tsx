import { FaList, FaListOl, FaBold, FaHeading } from 'react-icons/fa';
import { Editor } from '@tiptap/react';

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className=" inline-block px-2 ml-5 mr-2 text-xl pt-2 my-1 hover:text-white hover:bg-lakersPurple">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is_active' : ''}
        >
          <i>
            <FaList />
          </i>
        </button>
      </div>
      <div className=" inline-block px-2 mr-2 text-xl pt-2 my-1 hover:text-white hover:bg-lakersPurple border-l-2">
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
