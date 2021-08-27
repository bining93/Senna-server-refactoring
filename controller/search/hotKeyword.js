import Search from "../../models/Search.js";

const hotKeyword = async (req, res) => {
    // * search count가 가장 많은 keyword 찾기 *
    try {
        let findKeyword = await Search.find().sort('-searchcount').limit(1)  
        if(findKeyword) {
            res.status(200).send({
                keyword: findKeyword[0].hashtag,
                message: '인기 검색어'
            })
        }
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }

}

export default hotKeyword;