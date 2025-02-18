import conf from "../config/conf";
import { Client, ID , Databases , Storage , Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appUrl)
            .setProject(conf.appProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , slug , content , featuredImage , status , userID}) {
        try {
            return await this.databases.createDocument(
                conf.appDatabaseID,
                conf.appCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    async updatePost(slug , {title , content , featuredImage , status}) {
        try {
            return await this.databases.updateDocument(
                conf.appDatabaseID,
                conf.appCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.error('Error updating post:', error);
        }

    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appDatabaseID,
                conf.appCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appDatabaseID,
                conf.appCollectionID,
                slug
            )
        } catch (error) {
            console.error('Error getting post:', error);
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appDatabaseID,
                conf.appCollectionID,
                [
                    Query.equal("status" , "active")
                ]
            )

        } catch (error) {
            console.error('Error getting posts:', error);
            return false;     
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appBucketID,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.error('Error uploading file:', error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appBucketID,
                fileId
            )
            return true;
        } catch (error) {
            console.error('Error deleting file:', error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appBucketID, 
            fileId
        )
    }

}


const service = new Service();
export default service