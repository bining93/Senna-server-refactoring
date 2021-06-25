import Posting from "../../models/Posting.js";

const all = (req, res) => {
    //docs는 검색결과를 배열에 담는다.
    Posting.find({status: true}, (err, docs) => {
        if(err) {
            res.status(404).send('게시물을 찾을 수 없습니다.')
            return console.log(err)        
        } else {
            res.send({
                data: docs,
                message: "모든 게시물"
            })
        }
    })
}


export default all;
//DB에 저장된 모든 게시물의 정보를 보내주는 엔드포인트 
//DB에서 모든 데이터를 꺼내오는데 status가 true인 것만 꺼내온다.
