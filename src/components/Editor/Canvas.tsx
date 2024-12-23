import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useEditorStore } from '../../store/editorStore';
import { EditableElement } from './EditableElement';

export const Canvas: React.FC = () => {
  const { elements, updateElementPosition } = useEditorStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    if (active) {
      updateElementPosition(active.id as string, {
        x: delta.x,
        y: delta.y
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8" onClick={() => useEditorStore.getState().setSelectedElement(null)}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="max-w-4xl mx-auto space-y-4">
          {elements.map((element) => (
            <EditableElement key={element.id} element={element} />
          ))}
        </div>
        <DragOverlay>
          {/* Add overlay if needed */}
        </DragOverlay>
      </DndContext>
    </div>
  );
};