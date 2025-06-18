import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { Layout } from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegistrationPage from './pages/RegistrationPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import './App.css'
import NotFound from './components/NotFound/NotFound';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import type { ReactNode } from 'react';


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutWithOutlet title='MyApp' />} >
            <Route index element={<HomePage />} />
            <Route path='signin' element={<SignInPage />} />
            <Route path='registration' element={<RegistrationPage />} />
            <Route path='posts' element={
              <PrivateRoute>
                <PostsPage />
              </PrivateRoute>
            } />
            <Route path='posts/:id' element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>

            } />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </AuthProvider>
  );
}

const LayoutWithOutlet = ({ title }: { title: string }) => {
  return (
    <Layout title={title}>
      <Outlet />
    </Layout>
  )
}

const PrivateRoute = ({ children }: {children:ReactNode}) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to='/signin' replace />
}