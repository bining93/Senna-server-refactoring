import Posting from "../../models/Posting.js";

//게시물 수정 - 
const modify = async (req, res) => {
    //postingId 값이 params에 담겨져 온다. 
    //console.log('req', req.params.id)
    const { userId, image, content } = req.body;
    const postingId = req.params.id;

    if(!userId) {
        res.status(400).send('필수 요소가 들어오지 않았습니다.')
    } else {
        //new option을 써서 수정 후 값을 리턴값으로 받도록 한다.
        await Posting.findByIdAndUpdate(postingId, {image: image, content: content}, {new:true}).exec()
        .then(data => {
            console.log('data', data)
            //삭제된 게시물
            if(!data.status) {
                res.status(401).send('삭제된 게시물 입니다.')
            } else if(data.userId !== userId) {
                res.status(401).send('게시물에 수정 권한이 없는 유저입니다.')
            } else {
                res.send({
                    data: data,
                    message: "게시물 수정 성공"
                })
            }
             
        })
        .catch(err => {
            //postingId가 없을 때
            res.status(404).send('존재하지 않는 게시물입니다.')
            throw err;
        }) 
    }
}

export default modify;
