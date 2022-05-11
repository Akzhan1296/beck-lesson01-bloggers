type BloggerItem = {
    id: number
    name: string
    youtubeUrl: string
}

export let bloggers: BloggerItem[] = []

export const bloggersRepository = {
    getBloggers: () => {
    return bloggers;
    },
    getBloggerById: (id: number) => {
        let findedBlogger = bloggers.find(b => b.id === id)

        if (findedBlogger) {
            return findedBlogger;
        } else {
            return null;
        }
    },
    createBlogger: (name: string, youtubeUrl: string) => {
        const newBlogger = {
            id: +(new Date()),
            name,
            youtubeUrl,
        }
        bloggers.push(newBlogger)

        return newBlogger;
    },
    updateBlogger: (id: number, name: string, youtubeUrl: string) => {

        const updatedBloger = {
            id,
            name,
            youtubeUrl,
        }
        bloggers = [...bloggers.filter(b => b.id !== id), updatedBloger];
        return updatedBloger;
    },
    deleteBlogger: (id: number) => {
        const finded = bloggers.find(b => b.id === id);
        if (finded) {
            let newBlogger = bloggers.filter(b => b.id !== id);
            bloggers = newBlogger;
            return newBlogger
        } else {
            return null
        }
    },
}



