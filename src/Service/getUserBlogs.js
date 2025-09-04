function getUserBlogs(id) {
    let blogs = {
        title: 'Lorem ispum dolor Dummy Text of The Printing and Typescripting Typescripting...',
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                Lorem Ipsum is simply dummy text of the printing and typesetting industry 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                Lorem Ipsum is simply dummy text of the printing and typesetting industry `, 
        stars: 4 
    }
    const userBlogs = []; 
    for (let i = 1; i <= 22; ++i) {
        let copy = {...blogs , title : i + blogs.title}
        userBlogs.push(copy);   //Neu push blogs thi 22 phan tu deu cung tro toi 1 phan tu blogs 
    }
        return userBlogs;
}
export { getUserBlogs }