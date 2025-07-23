import { NavLink, Outlet, useLocation } from "react-router";


const PostsPage = () => {
    const location = useLocation();
    const isActiveTab = (path:string)=>location.pathname.includes(path) ? 'active':'';
    return (
        <div className="posts__block">
            <div className='posts__tabs'>
                <NavLink to={'all'}><button className={isActiveTab('all')}
                >
                    All posts
                </button></NavLink>
                <NavLink to={'favorites'}><button className={isActiveTab('favorites')}

                >
                    My favorites posts
                </button>
                </NavLink>
                <NavLink to={'popular'}>
                    <button className={isActiveTab('popular')}

                    >
                        Popular posts
                    </button>
                </NavLink>
                <NavLink to={'my-posts'}>
                    <button className={isActiveTab('my-posts')}

                    >
                       My posts
                    </button>
                </NavLink>
            </div>
            
            <Outlet/>
        </div>
    );
};

export default PostsPage;