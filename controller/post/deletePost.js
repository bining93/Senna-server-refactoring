
const deletePost = async (req, res) => {
    const postingId = req.params.id;
    console.log('postingId')
}

export default deletePost;

//삭제가 되어야할 게시물 id를 path param으로 받는다. 
//Post collection에서 맞는 doc를 찾아 status를 false로 변경한다. 
//