import User from '../../models/User.js';
import crypto from 'crypto';

const signup = async (req,res) => {
    const { userId, password } = req.body
    //s3 버킷에 multer를 연동하면 location안에 경로가 들어가있다. 
    const profileImg  = req.file.location
    console.log('req.file', req.file)

    const algorithm = 'aes-192-cbc';

    if(!userId || !password) {
        res.status(400).send('필수 항목을 입력해주세요')
    } else {
        //비밀번호 암호화하기 
        /*
        crypto.scrypt(password, 'salt', 24, (err, key) => {
            if(err) throw err;

            crypto.randomFill(new Uint8Array(16), (err, iv) => {
                if(err) throw err;

                const cipher = crypto.createCipheriv(algorithm, key, iv);

                let encrypted = cipher.update('text', 'utf8', 'hex');
                console.log('encrypted', encrypted)
                encrypted += cipher.final('hex')
                console.log('encrypted add', encrypted)
            })
        })
        */
        
        //86194bc88eb3f542b0e7398fc07a072c
        crypto.scrypt('86194bc88eb3f542b0e7398fc07a072c', 'salt', 24, (err, key) => {
            if(err) throw err;

            crypto.randomFill(new Uint8Array(16), (err, iv) => {
                if(err) throw err;

                const decipher = crypto.createDecipheriv(algorithm, key, iv);

                let decrypted = decipher.update('text', 'hex', 'utf8');
                console.log('encrypted', decrypted)
                decrypted += decipher.final('utf8')
                console.log('encrypted add', decrypted)
            })
        })
        
        await User.create({
            userId,
            password,
            profileImg
        })
        .then(data => {
            console.log(data)
            res.status(201).send({
                data: data,
                message: '회원가입 성공!'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(404).send('회원가입 실패');
        })
        
    }
}

export default signup;
//유저가 이미 있는 경우



//회원 가입 할 때 img를 multer가 uploads 파일에 올리고
//그 경로를 서버에 넣고
//응답을 보낸다. 



