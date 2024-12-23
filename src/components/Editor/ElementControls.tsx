import React from 'react';
import { Trash2, Copy, Move } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

interface Props {
  elementId: string;
}

export const ElementControls: React.FC<Props> = ({ elementId }) => {
  const { removeElement, duplicateElement } = useEditorStore();

  return (
    <div className="absolute -top-4 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={(e) => {
          e.stopPropagation();
          duplicateElement(elementId);
        }}
        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        title="Duplicate"
      >
        <Copy className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeElement(elementId);
        }}
        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      <div className="p-1 bg-gray-500 text-white rounded cursor-move" title="Drag to move">
        <Move className="w-4 h-4" />
      </div>
    </div>
  );
};