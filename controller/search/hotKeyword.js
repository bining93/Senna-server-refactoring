import Posting from "../../models/Posting.js";
import Search from "../../models/Search.js";

const hotKeyword = async (req, res) => {
    //검색어가 search의 synonym의 배열에 없을경우, 새 hashtag로 create 해주기

    Search.find().sort('-searchcount').limit(1).then(
        (result) => {
            console.log(result[0].hashtag);
            res.status(200).send({
                keyword: result[0].hashtag,
                message: '인기 키워드'
            })
            
        }
    )
    
}

export default hotKeyword;