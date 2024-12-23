import React, { useState } from 'react';
import { useEditorStore } from '../../../store/editorStore';
import { PageElement } from '../../../types/editor';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
  element: PageElement;
}

export const ImageElement: React.FC<Props> = ({ element }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateElement } = useEditorStore();

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, { content: e.target.value });
  };

  if (isEditing) {
    return (
      <div className="p-4 border rounded bg-white">
        <input
          type="text"
          value={element.content}
          onChange={handleImageUrlChange}
          placeholder="Enter image URL"
          className="w-full p-2 border rounded mb-2"
          autoFocus
        />
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="relative group" onDoubleClick={() => setIsEditing(true)}>
      {element.content ? (
        <img
          src={element.content}
          alt="Content"
          className="w-full h-full object-cover rounded"
          style={element.style}
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-100 min-h-[200px] rounded">
          <ImageIcon className="w-12 h-12 text-gray-400" />
          <p className="text-gray-500 ml-2">Double click to add image URL</p>
        </div>
      )}
    </div>
  );
};