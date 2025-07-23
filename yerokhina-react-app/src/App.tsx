import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { Layout } from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegistrationPage from './pages/RegistrationPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import './App.css'
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import UsersPage from './pages/JsonPlaceholder/UsersPage';
import AllPosts from './components/AllPosts/AllPosts';
import { FavoritesPosts } from './pages/FavoritesPosts';
import { PopularPosts } from './pages/PopularPosts';
import CreatePostPage from './pages/CreatePostPage';
import { ActivationPage } from './pages/ActivationPage';
import { CreatePostOther } from './pages/JsonPlaceholder/CreatePostOther';
import { CreateUserForm } from './pages/JsonPlaceholder/CreateUserForm';


export default function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutWithOutlet title='MyApp' />} >
            <Route index element={<HomePage />} />

            {/* с jsonplaceholder */}
            <Route path='/create-post-other' element={<CreatePostOther/>}/>
            <Route path='/create-user' element={<CreateUserForm/>}/>

            <Route path='users' element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            } />

            <Route path='signin' element={<SignInPage />} />
            <Route path='registration' element={<RegistrationPage />} />

            <Route path='activate/:uid/:token' element={<ActivationPage />}/>

            <Route path='posts' element={<PostsPage />}>

              <Route index element={<AllPosts />} />
              {/* все посты по умолчанию */}
              <Route path='all' element={<AllPosts />} />
              <Route path='favorites' element={<FavoritesPosts />} />
              <Route path='popular' element={<PopularPosts />} />
            </Route>
            <Route path='posts/:id' element={<PostPage />} />
            <Route path='create-post' element={
              <PrivateRoute>
                <CreatePostPage />
              </PrivateRoute>
            } />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter >
  
  );
}

const LayoutWithOutlet = ({ title }: { title: string }) => {
  return (
    <Layout title={title}>
      <Outlet />
    </Layout>
  )
}

