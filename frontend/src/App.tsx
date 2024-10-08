import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Home from "./pages/Home.tsx"
import NotFound from "./pages/NotFound.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {Navbar} from "./components/Navbar.tsx";
import GlobalContainer from "./components/GlobalContainer.tsx";
import MusicPage from "./pages/MusicPage.tsx";
import AddMusicPage from "./pages/AddMusicPage.tsx";
import AlbumPage from "./pages/AlbumPage.tsx";

function Logout() {
    localStorage.clear();
    return <Navigate to="/auth/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

const AppContent = () => {
    const location = useLocation();
    const isAuthPath = location.pathname.startsWith('/auth');

    return (
        <GlobalContainer>
            {!isAuthPath && <Navbar />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }/>

                <Route
                    path="/music"
                    element={
                        <ProtectedRoute>
                            <MusicPage/>
                        </ProtectedRoute>
                    }/>

                <Route
                    path="/addmusic"
                    element={
                        <ProtectedRoute>
                            <AddMusicPage/>
                        </ProtectedRoute>
                    }/>
                <Route
                    path="/albums"
                    element={
                        <ProtectedRoute>
                            <AlbumPage/>
                        </ProtectedRoute>
                    }/>

                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/register" element={<RegisterAndLogout/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </GlobalContainer>
    );
};

function App() {

    return (
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    );
}


export default App