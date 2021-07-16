import Posting from "../../models/Posting.js";

const all = async (req, res) => {
    try {
        //최신 작성한 게시물 순으로 정렬
        const allPosting = await Posting.find({status: true}).sort('-created_at')
        console.log(allPosting)
        return res.send({
            data: allPosting,
            message: "모든 게시물"
        })
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')  
    }
}

export default all;
//DB에 저장된 모든 게시물의 정보를 보내주는 엔드포인트 
//DB에서 모든 데이터를 꺼내오는데 status가 true인 것만 꺼내온다.
