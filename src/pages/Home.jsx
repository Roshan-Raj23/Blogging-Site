import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, Postcard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    let show;
    const [posts, setPosts] = useState([])

    // const logged = useSelector(state => state.auth.status);
    // const userData = useSelector((state) => state.auth.userData);

    // Same meaning with different syntax
    const { status : logged , userData } = useSelector(state => state.auth)


    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    })
    
    if (!logged) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // You can may be remove or keep the text inside this 
    // This will be shown when there is a reload only 
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {/* Try adding some posts */}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => {
                        // if user is owner of the post or post is active then show the post
                        show = post.status == "active" ||
                        (userData && post.userID === userData.$id);

                        return show && <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>;
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Home