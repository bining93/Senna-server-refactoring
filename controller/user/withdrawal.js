import User from '../../models/User.js';

const withdrawal = async (req,res) => {
    const { password } = req.body;
    await User.findById(req.params.id)
    .then((data) => {
          if(!data) {
            res.status(404).send('잘못된 접근입니다');
          } else {
              console.log(data.password);
              console.log(password);
              if(data.password === password){
                const id = data._id;
                User.findByIdAndUpdate(id, { status: false },
                    function (err, docs) {
                        if (err){
                            console.log(err)
                        } else {
                            res.status(200).send("회원 탈퇴가 완료 되었습니다");
                        }
                    }
                );  
              }else{
                  res.status(401).send("비밀번호를 확인해주세요");
              }  
          }
    
      })
}

export default withdrawal