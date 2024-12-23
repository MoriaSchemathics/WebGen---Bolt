import React from 'react';
import { Canvas } from './components/Editor/Canvas';
import { Toolbar } from './components/Editor/Toolbar';
import { StyleEditor } from './components/Editor/StyleEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Page Editor</h1>
        </div>
      </header>
      <main className="relative">
        <Toolbar />
        <Canvas />
        <StyleEditor />
      </main>
    </div>
  );
}

export default App;