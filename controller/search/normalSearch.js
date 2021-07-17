import Posting from "../../models/Posting.js";
import Search from "../../models/Search.js";

//유저가 검색어를 입력한다.
//입력한 검색어가 hashtag나 synonym과 일치하는지 찾는다.
//synonym과 일치하는지 어떻게 찾을까

const normalSearch = async (req, res) => {
    const search = req.query.sch;
    
    console.log('req.query',search) 

    if(!search) {
        return res.status(400).send('query가 들어오지 않았습니다.')
    } 
    
    try{
        let filter = [
            {hashtag: new RegExp(search, 'i')},
            {synonym: new RegExp(search, 'i')}
        ]
        const postInfo = await Search.findOne({$or: filter})
        console.log('find', postInfo)
        let words = []
        if(postInfo) {
            let arr = [...postInfo.synonym, postInfo.hashtag]
            words = arr.map(word => new RegExp(word, 'i'))
            await Search.findByIdAndUpdate(postInfo._id, {$inc: {searchcount: 1}})
        }
  
        let searchFd = [
            {content: new RegExp(search, 'i')},
            {hashtag: new RegExp(search, 'i')},
            {hashtag: {$in: words}}
        ]
    
        const postings = await Posting.find({$or: searchFd}).where('status').equals('true').sort('-created_at')

        return res.send({
            word: search,
            data: postings,
            message: '검색 결과입니다.'
        })

    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default normalSearch;


//유저가 검색한 검색어를 query로 받는다.
//게시물 해시태그나 게시글에 검색어가 포함되어 있는 게시글들만 조회한다. 

