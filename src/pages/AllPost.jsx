import { Container , Postcard } from './../components';
import appwriteService from '../appwrite/config';
import { useEffect, useState } from 'react';

export default function AllPost() {

    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])

    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>)
                    ))}
                </div>
                </Container>
        </div>
    )
}
