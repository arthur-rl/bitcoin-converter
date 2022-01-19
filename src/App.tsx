import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './pages/menu';
import Task1 from './pages/task1';
import Task2 from './pages/task2';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/task1" element={<Task1/>}/>
                <Route path="/task2" element={<Task2/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
