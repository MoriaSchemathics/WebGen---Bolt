import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useEditorStore } from '../../store/editorStore';
import { PageElement } from '../../types/editor';
import { TextElement } from './Elements/TextElement';
import { ImageElement } from './Elements/ImageElement';
import { FormElement } from './Elements/FormElement';
import { ElementControls } from './ElementControls';

interface Props {
  element: PageElement;
}

export const EditableElement: React.FC<Props> = ({ element }) => {
  const { setSelectedElement } = useEditorStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });

  const style = {
    ...element.style,
    position: 'relative',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : element.style.transform,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return <TextElement element={element} />;
      case 'image':
        return <ImageElement element={element} />;
      case 'form':
        return <FormElement element={element} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      className="relative group cursor-move border-2 border-transparent hover:border-blue-500 rounded-lg"
      {...attributes}
      {...listeners}
    >
      {renderElement()}
      <ElementControls elementId={element.id} />
      <div className="absolute -top-4 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {element.type}
      </div>
    </div>
  );
};