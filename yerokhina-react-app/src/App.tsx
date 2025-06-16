
// import { useState } from 'react';
// import './App.css'
// import { Layout } from './components/Layout';
// import { RegForm } from './components/RegForm';
// import { SuccessMode } from './components/SuccessMode';
// import { useTheme } from './contexts/ThemeContext';
// import { SignInForm } from './components/SignInForm';
// import AllPosts from './components/AllPosts';
// import SelectedPost from './components/SelectedPost';
// import { SuccessModeReg } from './components/SuccessModeReg';

// type Page = 'all-posts' | 'selected-post'

// function App() {
//   const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
//   const [currentMode, setCurrentMode] = useState<Page>('all-posts');
//   // const [state, setState] = useState<'active' | 'inactive'>('inactive');  //хранит текущее состояние кнопки
//   const { theme, setTheme } = useTheme();

//   // Обработчики с автопереключением темы
//   const handlePostSelect = (id: number) => {
//     setSelectedPostId(id);
//     setCurrentMode('selected-post');
//     setTheme('dark')

//   }
//   const handleAllPosts = () => {
//     setTheme('light')
//     setCurrentMode('all-posts');
//   }

//   const handleSignIn =()=>{
//     setCurrentMode('sign-in')
//   }
//   const handleSignUp =()=>{
//     setCurrentMode('sign-up')
//   }
//   const handleSignUp =()=>{
//     setCurrentMode('sign-up')
//   }
//   const handleSignInSuccess =()=>{
//     setCurrentMode('sign-in-success')
//   }
//   const handleSignUpSuccess =()=>{
//     setCurrentMode('sign-in-success')
//   }



//   // const handleClick = () => {    //переключатель из одного состояния в другое
//   //   setState(state === 'active' ? 'inactive' : 'active')
//   // }
//   // const { theme, setTheme } = useTheme(); //получаем тему и Ф для ее изменения




//   return (
//     <>
//       <Layout
//         title={getTitle(currentMode)}
//         theme={theme}  //используем тему из контекста
//       >
        
//         {/* <SuccessModeReg onReturn={console.log} />

//         <SignInForm onSubmit={console.log} />
//         <SuccessMode onAction={console.log} /> */}


//         {currentMode === 'all-posts' && (
//           <AllPosts onPostSelect={handlePostSelect} />
//         ) }
//         {currentMode === 'selected-post' && (
//           <SelectedPost
//           postId={selectedPostId}
//           onBack={handleAllPosts}
//         />
//         ) }
//         {currentMode === 'sign-in' && (
//           <SignInForm onSubmit={handleSignInSuccess} />
//         ) }
//         {currentMode === 'sign-up' && (
//           <RegForm onSubmit={handleSignUpSuccess} />
//         ) }
//         {currentMode === 'sign-in-success' && (
//           <SuccessMode onAction={handleHome} />
//         ) }
//         {currentMode === 'sign-up-success' && (
//           <SuccessModeReg onReturn={handleHome} />
//         ) }

      
//       </Layout>

//     </>
//   )
// }

// export default App
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
  const { setTheme } = useTheme();
  
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
      <div className="form-block">
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