import { useState } from 'react'
import './App4.css'
import { Layout } from './components3/Layout'
import SelectedPost from './components4/SelectedPost';
import AllPosts from './components4/AllPosts';
import { useTheme } from './contexts/ThemeContext';

type Page='all-posts'|'selected-post';


export function App4() {
    const [currentPage, setCurrentPage] = useState<Page>('all-posts');
    const[selectedPostId, setSelectedPostId]  = useState<number|null>(null);
    const{theme, setTheme} = useTheme();

    // Обработчики с автопереключением темы
    const handlePostSelect = (id:number) =>{
        setSelectedPostId(id);
        setCurrentPage('selected-post');
        setTheme('dark')  //При переходе на пост - темная тема
    }
    const handleAllPosts = () =>{
       
        setCurrentPage('all-posts');
        setTheme('light')  //При переходе на пост - темная тема
    }
    return (
        <Layout
            title={currentPage==='all-posts' ? "All posts" : "Selected Post"}
            theme={theme}
        >
           {currentPage==='all-posts'?(
            <AllPosts onPostSelect={handlePostSelect}/>
           ):
           (<SelectedPost
           postId={selectedPostId}
           onBack={handleAllPosts}
        />
        )}
        </Layout>
    );
}

export default App4