
import { useState } from 'react';
import { Layout } from './components/Layout';
import { SuccessMode } from './components/SuccessMode';
import { SuccessModeReg } from './components/SuccessModeReg';
import { SignInForm } from './components/SignInForm';
import { RegForm } from './components/RegForm';
import  AllPosts  from './components/AllPosts';
import  SelectedPost  from './components/SelectedPost';
import { useTheme } from './contexts/ThemeContext';
import './App.css'

export default function App() {
  const {setTheme } = useTheme();
  
  // Состояния для SignIn (как в App3)
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  
  // Состояния для Registration (как в App2)
  const [isRegSuccess, setIsRegSuccess] = useState(false);
  
  // Состояния для Posts (как в App4)
  const [showPost,setShowPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);



  return (
    <Layout title='MyApp'>
      {/* Блок входа */}
      <div className='form-block '>
        <h2>{isSignInSuccess? 'Success': 'Sign In'}</h2>
        {isSignInSuccess ? (
          <SuccessMode onAction={() => {
            setTheme('light');
            setIsSignInSuccess(false);
          }} />
        ) : (
          <SignInForm onSubmit={() => {
            setTheme('dark');
            setIsSignInSuccess(true);
          }} />
        )}
      </div>

      {/* Блок регистрации */}
      <div className="form-block">
        <h2>{isRegSuccess?'Registration Confirmation': 'Sign Up'}</h2>
        {isRegSuccess ? (
          <SuccessModeReg onReturn={() => {
            setTheme('light');
            setIsRegSuccess(false);
          }} />
        ) : (
          <RegForm onSubmit={() => {
            setTheme('dark');
            setIsRegSuccess(true);
          }} />
        )}
      </div>

      {/* Блок постов */}
      <div className="posts-block">
        <h2>{showPost? 'Selected Post': 'All posts'}</h2>
        {showPost? (
          <SelectedPost 
            postId={selectedPostId} 
            onBack={() => {
              setShowPost(false);
              setTheme('light');
            }} 
          />
        ) :(<AllPosts onPostSelect={(id) => {
            setSelectedPostId(id);
            setShowPost(true);
            setTheme('dark');
          }} />
        
          
        )}
      </div>
    </Layout>
  );
}