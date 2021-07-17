import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

let algorithm = 'aes-192-cbc';  //사용할 알고리즘
const key = crypto.scryptSync(process.env.PWD_MAKE_KEY, process.env.PWD_SALT, 24);  //암호화, 복호화를 위한 키 생성
const iv = Buffer.alloc(16, 0);

// * 패스워드 암호화 *  
const encryption = (data) => {
    if(!data) {
        return ''
    }
    const cipher = crypto.createCipheriv(algorithm, key, iv);   //Cipher 객체 생성
    //인코딩 방식에 따라 암호화한다. data의 인자로 password가 넘어온다. 비밀번호는 utf8 형식 
    let encrypted = cipher.update(data, 'utf8', 'base64'); 
    //base64 형식으로 암호화 
    encrypted += cipher.final('base64')
    return encrypted
}

// * 패스워드 복호화 *
const decryption = (data) => {
    if(!data) {
        return ''
    }
    const decipher = crypto.createDecipheriv(algorithm, key, iv) //Decipher 객체 생성

    //인코딩 방식에 따라 복호화 .update(복호화할 대상(비밀번호), 인코딩, 인코딩)
    let decrypted = decipher.update(data, 'base64', 'utf8');
    //암호화 했던 것을 utf8형식으로 인코딩해줌
    decrypted += decipher.final('utf8')
    return decrypted
}
 
export { encryption, decryption }


        

