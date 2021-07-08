import Posting from "../../models/Posting.js";
import User from '../../models/User.js';

const userKeyword = async (req, res) => {
    //유저 아이디를 받아올 때 토큰 or param??? 
    const userFavorite = await User.findOne({userId: 'test77'}).select('favorite')
    //console.log('user', userFavorite.favorite)
    //해시태그만 뽑아온다....
    let hashtag = userFavorite.favorite.map(info => info.hashtag).flat()
    //카운트 구하기 (효율적 알고리즘이 뭘까유)
    let count = {}
    hashtag.forEach(el => {
        console.log('el', el)
    })

    //해시태그에서 나온 값들을 카운트한다...
    //카운트해서 가장 많이 나온 해시태그들 3개를 뽑는다.
    //너무 단순한 알고리즘이야... 
    //관련 있는것들만 보내줘?
    console.log('hashtag', hashtag)

    
    
    /*
    [
        {"image":["https://senna-image.s3.ap-northeast-2.amazonaws.com/1625139405510.jpeg"],
            "hashtag":["japan"],"likes":2,"likeUser":["mimi","cho"],
            "status":true,"_id":"60dda8cd339543216c055953",
            "userId":"mimi", "content":"test",
            "created_date":"2021-07-01T11:36:45.842Z","__v":0},
        {"image":["https://senna-image.s3.ap-northeast-2.amazonaws.com/1625652641775.jpeg"],
            "hashtag":["japan"],"likes":0,"likeUser":[],
            "status":true,"_id":"60e57da2a39371c141fe62e3",
            "userId":"test77","content":"ㅇㅎㅇㄴ",
            "created_date":"2021-07-07T10:10:42.064Z","__v":0},
        {"image":["https://senna-image.s3.ap-northeast-2.amazonaws.com/1625652841074.jpeg"],
            "hashtag":["korea"],"likes":0,"likeUser":[],
            "status":true,"_id":"60e57e69a39371c141fe62e7",
            "userId":"test77","content":"?",
            "created_date":"2021-07-07T10:14:01.133Z","__v":0
        }
    ]
    */
}

export default userKeyword;