import Posting from "../../models/Posting.js";

const normalSearch = (req, res) => {
    console.log('req.query',req.query.sch) //--> { sch: 'value' }

    if(!req.query.sch) {
        res.status(400).send('query가 들어오지 않았습니다.')
    } else {
        let searchFd = [
            {content: new RegExp(req.query.sch, 'i')},
            {hashtag: new RegExp(req.query.sch, 'i')}
        ]
    
        //정규표현식 객체 이용 
        //두번째 인자 -> i는 대소문자 구분 false
        Posting.find({ $or : searchFd})
        .then(result => {
            console.log('result', result)
            res.send({
                data: result,
                message: '검색 결과입니다.'
            })
        })
        .catch(err => {
            throw err;
        })
    }
}

export default normalSearch;


//유저가 검색한 검색어를 query로 받는다.
//게시물 해시태그나 게시글에 검색어가 포함되어 있는 게시글들만 조회한다. 

