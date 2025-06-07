import { useState } from 'react'
import './App4.css'
import { Layout } from './components3/Layout'
import SelectedPost from './components4/SelectedPost';
import AllPosts from './components4/AllPosts';

type Page='all-posts'|'selected-post';


export function App4() {
    const [currentPage, setCurrentPage] = useState<Page>('all-posts');
    const[SelectedPostId, setSelectedPostId]  = useState<number|null>(null)
    return (
        <Layout
            title={currentPage==='all-posts' ? "All posts" : "Selected Post"}
            theme={currentPage==='all-posts' ? 'light' : 'dark'}
        >
           {currentPage==='all-posts'?(
            <AllPosts onPostSelect={(id)=>{
                setSelectedPostId(id);
                setCurrentPage('selected-post');
            }}/>
           ):
           (<SelectedPost
           postId={SelectedPostId}
           onBack={()=>setCurrentPage('all-posts')}
        />
        )}
        </Layout>
    );
}

export default App4