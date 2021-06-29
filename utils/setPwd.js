import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

let algorithm = 'aes-192-cbc';  //사용할 알고리즘
const key = crypto.scryptSync(process.env.PWD_MAKE_KEY, process.env.PWD_SALT, 24);  //암호화, 복호화를 위한 키 생성
const iv = Buffer.alloc(16, 0);

//비밀번호 암호화  
const encryption = (data) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64')
    console.log('encrypted---', encrypted)
    return encrypted
}

//비밀번호 복호화
const decryption = (data) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv) //Decipher 객체 생성

    //인코딩 방식에 따라 복호화 .update(복호화할 대상(비밀번호), 인코딩, 인코딩)
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8')
    console.log('decry', decrypted)
    return decrypted
}
 
export { encryption, decryption }


        

