import React, { useState } from 'react';
import { useEditorStore } from '../../../store/editorStore';
import { PageElement } from '../../../types/editor';

interface Props {
  element: PageElement;
}

export const TextElement: React.FC<Props> = ({ element }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateElement } = useEditorStore();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateElement(element.id, { content: e.target.value });
  };

  if (isEditing) {
    return (
      <textarea
        value={element.content}
        onChange={handleContentChange}
        className="w-full p-2 border rounded min-h-[100px]"
        autoFocus
        onBlur={() => setIsEditing(false)}
        style={element.style}
      />
    );
  }

  return (
    <div 
      onDoubleClick={() => setIsEditing(true)}
      style={element.style}
      className="min-h-[2em]"
    >
      {element.content || 'Double click to edit text'}
    </div>
  );
};