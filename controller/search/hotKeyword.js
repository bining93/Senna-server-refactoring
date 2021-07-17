import Posting from "../../models/Posting.js";
import Search from "../../models/Search.js";

const hotKeyword = async (req, res) => {
    // * search count가 가장 많은 keyword 찾기 *
    Search.find().sort('-searchcount').limit(1).then(
        (result) => {
            res.status(200).send({
                keyword: result[0].hashtag,
                message: '인기 검색어'
            })  
        }
    )
    
}

export default hotKeyword;