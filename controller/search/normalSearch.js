import Posting from "../../models/Posting.js";
import Search from "../../models/Search.js";

const normalSearch = async (req, res) => {
    const hashtag = req.query.sch;

    console.log('req.query',req.query.sch)

    if(!req.query.sch) {
        res.status(400).send('query가 들어오지 않았습니다.')
    } else {
        let searchFd = [
            {content: new RegExp(req.query.sch, 'i')},
            {hashtag: new RegExp(req.query.sch, 'i')}
        ]
        //정규표현식 객체 이용 
        //두번째 인자 -> i는 대소문자 구분 false
        await Posting.find({ $or : searchFd})
        .then(result => {
            console.log('result', result)
            res.send({
                word: req.query.sch,
                data: result,
                message: '검색 결과입니다.'
            })
        })
        .catch(err => {
            throw err;
        })
        const tags = await Search.find()
        .where('searchcount').gte(0);
        let isExist = false;
        tags.map(el => {
            if(el.hashtag === hashtag) {
                Search.findByIdAndUpdate({_id: el._id}, {$inc: {searchcount: 1}}).then()
                isExist = true
            }else{
                el.synonym.map(e => {
                    if(e === hashtag) {
                        isExist = true;
                        Search.findByIdAndUpdate({_id: el._id}, {$inc: {searchcount: 1}}).then();
                    }
                })
            }

        })
        if(isExist === false){
            const checkPost = await Posting.find({ $or : searchFd})
            console.log(checkPost.length)
            if(checkPost.length !== 0){
                Search.create({hashtag:hashtag})
            }
        }

    }
}

export default normalSearch;


//유저가 검색한 검색어를 query로 받는다.
//게시물 해시태그나 게시글에 검색어가 포함되어 있는 게시글들만 조회한다.