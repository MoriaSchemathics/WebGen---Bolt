import { create } from 'zustand';
import { PageElement } from '../types/editor';

interface Position {
  x: number;
  y: number;
}

interface EditorStore {
  elements: PageElement[];
  selectedElement: PageElement | null;
  setElements: (elements: PageElement[]) => void;
  setSelectedElement: (element: PageElement | null) => void;
  updateElement: (id: string, updates: Partial<PageElement>) => void;
  addElement: (element: PageElement) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  updateElementPosition: (id: string, position: Position) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  elements: [],
  selectedElement: null,
  setElements: (elements) => set({ elements }),
  setSelectedElement: (element) => set({ selectedElement: element }),
  updateElement: (id, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
      selectedElement: state.selectedElement?.id === id 
        ? { ...state.selectedElement, ...updates }
        : state.selectedElement,
    })),
  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElement: state.selectedElement?.id === id ? null : state.selectedElement,
    })),
  duplicateElement: (id) =>
    set((state) => {
      const elementToDuplicate = state.elements.find((el) => el.id === id);
      if (!elementToDuplicate) return state;

      const newElement = {
        ...elementToDuplicate,
        id: crypto.randomUUID(),
        style: {
          ...elementToDuplicate.style,
          transform: `translate(20px, 20px)`,
        },
      };

      return {
        elements: [...state.elements, newElement],
      };
    }),
  updateElementPosition: (id, position) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id
          ? {
              ...el,
              style: {
                ...el.style,
                transform: `translate(${position.x}px, ${position.y}px)`,
              },
            }
          : el
      ),
    })),
}));