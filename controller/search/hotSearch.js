import Posting from "../../models/Posting.js";
import Search from "../../models/Search.js";
//
const hotSearch = async (req, res) => {
    //검색어가 search의 synonym의 배열에 없을경우, 새 hashtag로 create 해주기

    Search.find().sort('-searchcount').limit(1).then(
        (result) => {
            console.log(result[0].hashtag);
            res.status(200).send({
                data: result[0].hashtag,
                id: result[0]._id
            })
            
        }
    )
    
}

export default hotSearch;