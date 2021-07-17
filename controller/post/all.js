import Posting from "../../models/Posting.js";

const all = async (req, res) => {
    try {
        const allPosting = await Posting.find({status: true}).sort('-created_at')

        return res.send({
            data: allPosting,
            message: "모든 게시물"
        })
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')  
    }
}

export default all;

