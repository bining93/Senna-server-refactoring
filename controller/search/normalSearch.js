import Posting from "../../models/Posting.js";
import Search from "../../models/Search.js";

const normalSearch = async (req, res) => {
    const search = req.query.sch;

    if(!search) {
        res.status(400).send('query가 들어오지 않았습니다.')
    } else {
        let filter = [
            {hashtag: new RegExp(search, 'i')},
            {synonym: new RegExp(search, 'i')}
        ]

        // * 검색어가 synonym 배열이나 hastag에 포함되는 doc 찾기 *
        const postInfo = await Search.findOne({$or: filter})

        let words = []
        if(postInfo) {
            let arr = [...postInfo.synonym, postInfo.hashtag]
            words = arr.map(word => new RegExp(word, 'i'))

            // * search count 1증가 *
            await Search.findByIdAndUpdate(postInfo._id, {$inc: {searchcount: 1}})
        }
  
        let searchFd = [
            {content: new RegExp(search, 'i')},
            {hashtag: new RegExp(search, 'i')},
            {hashtag: {$in: words}}
        ]
        
        // * 검색어와 일치하는 게시물 찾기 *
        const postings = await Posting.find({$or: searchFd}).where('status').equals('true').sort('-created_at')

        res.send({
            word: search,
            data: postings,
            message: '검색 결과입니다.'
        })

    }
}

export default normalSearch;