import React from 'react';
import { Type, Image, Layout, FormInput } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

export const Toolbar: React.FC = () => {
  const { elements, setElements } = useEditorStore();

  const addElement = (type: 'text' | 'image' | 'form' | 'container') => {
    const newElement = {
      id: crypto.randomUUID(),
      type,
      content: type === 'text' ? 'Edit this text' : '',
      style: {
        width: '100%',
        padding: '1rem',
      },
    };
    setElements([...elements, newElement]);
  };

  return (
    <div className="fixed left-0 top-20 bg-white p-4 shadow-lg rounded-r-lg">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => addElement('text')}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Add Text"
        >
          <Type className="w-6 h-6" />
        </button>
        <button
          onClick={() => addElement('image')}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Add Image"
        >
          <Image className="w-6 h-6" />
        </button>
        <button
          onClick={() => addElement('container')}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Add Container"
        >
          <Layout className="w-6 h-6" />
        </button>
        <button
          onClick={() => addElement('form')}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Add Form"
        >
          <FormInput className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};