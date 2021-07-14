import User from '../../models/User.js'
import { checkType, deleteOne } from '../../utils/multer.js';
import { encryption } from '../../utils/setPwd.js';

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

        const updateFunc = async (pwd, img) => {
            console.log('img', img)
            console.log('pwd', pwd)
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
            console.log('info', newProfile)
            return res.status(200).send("회원정보가 수정되었습니다");
        }

        const normalNewProfile = await updateFunc(encryptedPwd, profileImg)
        if(normalNewProfile === 'img') {
            deleteOne(userInfo.profileImg)
        }
        console.log('normal', normalNewProfile)
        return res.status(200).send("회원정보가 수정되었습니다");
        
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }
}

export default updateProfile
