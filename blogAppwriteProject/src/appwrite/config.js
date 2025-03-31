import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug,  content, feturedTmage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedTmage,
                    status,
                    userId
                }

            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error)
        }
    }

    async updatePost(slug, {title,  content, feturedTmage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedTmage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug 
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error)            
        }
    }

    //File uplode service
    
    async uploadeFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteStoragetId.at,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadeFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            conf.appwriteStoragetId,
            fileId
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error)
            return false
        }
    }

    async getFilePreview(fileId){
        return this.storage.getFileView(
            conf.appwriteStoragetId,
            fileId
        )
    }

}

const service = new Service();
export default service;