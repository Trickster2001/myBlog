const conf = {
  appUrl: String(import.meta.env.VITE_APPWRITEURL),
  projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  commentId: String(import.meta.env.VITE_COMMENT_ID),
  rteId: String(import.meta.env.VITE_RTE_ID)
}

export default conf;