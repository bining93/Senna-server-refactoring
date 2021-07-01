import Search from "../../models/Search.js";

const hotSearch = (req, res) => {
    const info = Search.find();
    info.sort('-searchcount').limit(1).then(
        (result) => {
            console.log(result[0].hashtag);
            res.status(200).send({
                data: result.hashtag
            })
        }
    )
    
}

export default hotSearch;