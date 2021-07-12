import User from '../../models/User.js'
import s3 from '../../config/s3.js'
import { checkType } from '../../utils/multer.js';
import { encryption } from '../../utils/setPwd.js';

//프로필 업데이트 할 때 카카오 유저 조건 분리
const updateProfile = async (req, res) => {
   
    const { password } = req.body;
    const encryptedPwd = encryption(password);
    //console.log('enenenen', encryptedPwd)
    let profileImg, type = ''   

    if(req.file !== undefined) {
        profileImg = req.file.location;
        type = req.file.mimetype.split('/')[1]
        //console.log('type', type)

        if(!checkType(type)) {
            return res.status(400).send('잘못된 파일 형식입니다.')
        }
    }
    
    try{
        const userInfo =  await User.findById(req.params.id)
        if(!userInfo) {
            return res.status(404).send('유저를 찾을 수 없습니다.')
        }

        const updateFunc = async (pwd, img) => {
            console.log('img', img)
            console.log('pwd', pwd)
            let update = ''
            if(pwd && img) {
                await User.updateOne({userId: userInfo.userId}, { password: pwd, profileImg: img })
                update = 'img'
            } else if(pwd) {           
                await User.updateOne({userId: userInfo.userId}, { password: pwd })
            } else if(img) {
                await User.updateOne({userId: userInfo.userId}, { profileImg: img })
                update = 'img'
            } 
            return update
        }

        if(userInfo.provider === 'kakao' || !userInfo.profileImg) {
            const newProfile = await updateFunc(encryptedPwd, profileImg)
            console.log('info', newProfile)
            return res.status(200).send("회원정보가 수정되었습니다");
        }
        


        const normalNewProfile = await updateFunc(encryptedPwd, profileImg)
        if(normalNewProfile === 'img') {
            //이거 따로 빼야돼..
            const oldImg = userInfo.profileImg.split('com/')[1];
            s3.deleteObject({
                Bucket: 'senna-image',
                Key: oldImg
            }, (err, data) => {
                if(err) {
                    console.log(err)
                }
                console.log('기존 이미지 삭제', data)
            });
        }
        console.log('normal', normalNewProfile)
        return res.status(200).send("회원정보가 수정되었습니다");
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default updateProfile

//일반 유저이면 