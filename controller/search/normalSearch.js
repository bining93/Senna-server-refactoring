import Posting from "../../models/Posting.js";

const normalSearch = (req, res) => {
    //console.log(req.query) --> { sch: 'value' }
    Posting.find()
    .where('favorite').in([req.query.sch])
    .then(data => {
        console.log('data', data)
    })
    .catch(err => {
        throw err;
    })
}

export default normalSearch;


//유저가 검색한 검색어를 query로 받는다.
//게시물 해시태그에 검색어가 포함되어 있는 게시글들만 조회한다. 

