import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config";

export default function Postcard({...post}) {

    return (
        <Link to={`/post/${post.$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl" />

                </div>

                <h2 className="text-xl font-bold"
                >{post.title}</h2>
            </div>

        </Link>
    )
}
