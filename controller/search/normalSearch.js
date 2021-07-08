import Posting from "../../models/Posting.js";
import Search from "../../models/Search.js";

const normalSearch = (req, res) => {
    //const hashtag = req.query.sch;

    //검색어가 search의 synonym의 배열에 없을경우, 새 hashtag로 create 해주기

    /*
        const tags = Search.find() 서치의 모든 값에서
        const tag = tags.map(syn => {
            syn.synonym.includes(hashtag) 해시태그와 일치하는 값을 찾아서
            return syn 해당 값을 리턴해준것을 tag에 담아놓기
        })
        if(!tag) { 일치하는 값이 없을 경우
            //추가해주거나 에러 리턴 (어떤게 나을까?)
        }else{ 찾았으면
            해당 값의 searchcount 더해주기
        }
    */
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
                word: req.query.sch,
                data: result,
                message: '검색 결과입니다.'
            })
        })
        .catch(err => {
            throw err;
        })
        
    }
}
//
export default normalSearch;


//유저가 검색한 검색어를 query로 받는다.
//게시물 해시태그나 게시글에 검색어가 포함되어 있는 게시글들만 조회한다. 

