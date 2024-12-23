import React from 'react';
import { useEditorStore } from '../../store/editorStore';

export const StyleEditor: React.FC = () => {
  const { selectedElement, updateElement } = useEditorStore();

  if (!selectedElement) return null;

  const handleStyleChange = (property: string, value: string) => {
    updateElement(selectedElement.id, {
      style: { ...selectedElement.style, [property]: value },
    });
  };

  return (
    <div className="fixed right-0 top-20 bg-white p-6 shadow-lg rounded-l-lg w-72 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <h3 className="font-bold mb-6 text-lg">Style Editor</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Color
          </label>
          <input
            type="color"
            value={selectedElement.style.color || '#000000'}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            className="w-full h-10 rounded border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <input
            type="color"
            value={selectedElement.style.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="w-full h-10 rounded border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size ({selectedElement.style.fontSize || '16px'})
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={parseInt(selectedElement.style.fontSize || '16')}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Padding ({selectedElement.style.padding || '0px'})
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={parseInt(selectedElement.style.padding || '0')}
            onChange={(e) => handleStyleChange('padding', `${e.target.value}px`)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text Align
          </label>
          <select
            value={selectedElement.style.textAlign || 'left'}
            onChange={(e) => handleStyleChange('textAlign', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Weight
          </label>
          <select
            value={selectedElement.style.fontWeight || 'normal'}
            onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Light</option>
          </select>
        </div>
      </div>
    </div>
  );
};