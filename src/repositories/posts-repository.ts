export type PostItem = {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string
}

let posts: PostItem[] = [{
    id: +(new Date()),
    title: '',
    shortDescription: 'dasda',
    content: 'dsadsa',
    bloggerId: 123,
    bloggerName: "string"
}]

export const postsRepository = {
    getPosts: async()=> {
        return posts;
    },
    getPostById: async (id: number) => {
        let foundPost = posts.find(b => b.id === id)

        if (foundPost) {
            return foundPost
        } else {
            return null;
        }
    },
    createPost: async(newPost: PostItem) => {
        posts.push(newPost)
        return newPost;
    },
    updatePost: async (id: number, updatedPost: PostItem ) => {
        posts = [...posts.filter(b => b.id !== id), updatedPost];
        return posts;
    },
    deletePost: (id: number) => {
        const found = posts.find(b => b.id === id);
        if (found) {
            let filteredPosts = posts.filter(b => b.id !== id);
            posts = filteredPosts;
            return filteredPosts
        } else {
            return null;
        }
    }
}
