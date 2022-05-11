type PostItem = {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: number,
    bloggerName: string
}

let posts: PostItem[] = []

export const postsRepository = {
    getPosts: () => {
        return posts;
    },
    getPostById: (id: number) => {
        let findedPost = posts.find(b => b.id === id)

        if (findedPost) {
            return findedPost
        } else {
            return false;
        }
    },
    createPost: (title: string, shortDescription: string, content: string, bloggerId: number ) => {
        const newPost = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName: "string"
        }
        posts.push(newPost)
        return newPost;
    },
    updatePost: (id: number, title: string, shortDescription: string, content: string, bloggerId: number ) => {
    const updatedPost = {
        id,
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: "string"
    }
        posts = [...posts.filter(b => b.id !== id), updatedPost];
    console.log(posts);
        return posts;
    },
    deletePost: (id: number) => {
        const finded = posts.find(b => b.id === id);
        if (finded) {
            let filteredPosts = posts.filter(b => b.id !== id);
            posts = filteredPosts;
            return filteredPosts
        } else {
            return null;
        }
    }
}
