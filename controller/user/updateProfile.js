import User from '../../models/User.js'
import { checkType, deleteOne } from '../../utils/multer.js';
import { encryption } from '../../utils/setPwd.js';

const updateProfile = async (req, res) => {
   
    const { password } = req.body;
    const encryptedPwd = encryption(password);
    let profileImg, type = ''   

    if(req.file !== undefined) {
        profileImg = req.file.location;
        type = req.file.mimetype.split('/')[1]

        // * 파일 형식 검사 *
        if(!checkType(type)) {
            deleteOne(profileImg)
            return res.status(400).send('잘못된 파일 형식입니다.')
        }
    }
    
    try{
        const userInfo =  await User.findById(req.params.id)
        if(!userInfo) {
            deleteOne(profileImg)
            return res.status(404).send('유저를 찾을 수 없습니다.')
        }

        // * 수정사항 DB 업데이트 *
        const updateFunc = async (pwd, img) => {
            let update = ''
            if(pwd) {           
                await User.updateOne({userId: userInfo.userId}, { password: pwd })
            }   
            if(img) {
                await User.updateOne({userId: userInfo.userId}, { profileImg: img })
                update = 'img'
            } 
            return update
        }

        if(userInfo.provider === 'kakao' || !userInfo.profileImg) {
            const newProfile = await updateFunc(encryptedPwd, profileImg)
            return res.status(200).send("회원정보가 수정되었습니다");
        }

        const normalNewProfile = await updateFunc(encryptedPwd, profileImg)
        if(normalNewProfile === 'img') {
            deleteOne(userInfo.profileImg)
        }
        return res.status(200).send("회원정보가 수정되었습니다");
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default updateProfile
