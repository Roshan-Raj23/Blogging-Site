import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, Postcard} from '../components'
import { useSelector } from 'react-redux';
import authService from "../appwrite/auth";

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    })

    const logged = useSelector((state) => state.status);
    useEffect(() => {
        if (logged) {
            console.log("HELLO this is logged in");
        } else {
            console.log("NO user found")
        }
    } , [logged])
    
    
    if (posts.length === 0) {
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
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home