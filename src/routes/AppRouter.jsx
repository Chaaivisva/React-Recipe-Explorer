import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/recipeDashboard';
import ProtectedRoute from '../shared/context/ProtectedRoute';
import RecipeDetail from '../dashboard/recipeDetail';
import NotFound from '../shared/NotFound';
import Navbar from '../shared/components/Navbar';

function AppRouter() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/recipes/:id" element={
                    <ProtectedRoute>
                        <RecipeDetail />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
            </Routes>
         </BrowserRouter>
    );
}

export default AppRouter;