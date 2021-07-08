import Search from "../../models/Search.js";
//
const hotSearch = (req, res) => {
    Search.find().sort('-searchcount').limit(1).then(
        (result) => {
            console.log(result[0].hashtag);
            res.status(200).send({
                data: result[0].hashtag,
                id: result[0]._id
            })
            //Search.findByIdAndUpdate({_id: result[0]._id}, {$inc: {searchcount: 1}}).then()
        }
    )
    
}

export default hotSearch;