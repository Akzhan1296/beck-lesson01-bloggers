type BloggerItem = {
    id: number
    name: string
    youtubeUrl: string
}

export let bloggers: BloggerItem[] = [{
    id: 13,
    name: '231',
    youtubeUrl: 'https://www.youtube.com/watch?v=8sNkA53jAMU'
}]

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

        const updatedBlogger = {
            id,
            name,
            youtubeUrl,
        }
        bloggers = [...bloggers.filter(b => b.id !== id), updatedBlogger];
        return updatedBlogger;
    },
    deleteBlogger: (id: number) => {
        const found = bloggers.find(b => b.id === id);
        if (found) {
            let newBlogger = bloggers.filter(b => b.id !== id);
            bloggers = newBlogger;
            return newBlogger
        } else {
            return null
        }
    },
}



