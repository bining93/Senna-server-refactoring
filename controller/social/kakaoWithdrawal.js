import User from '../../models/User.js';

const kakaoWithdrawal = async (req, res) => {
    const id = req.params.id;

    try {
        const setStatus = await User.findByIdAndUpdate(id, { status: false })
        if(!setStatus) {
            return res.status(404).send('회원탈퇴에 실패했습니다.')
        }

        return res.send({message: '회원 탈퇴가 완료되었습니다.'})
    } catch(err) {
        res.status(err.status || 500).send(err.message || 'error')
    }

}

export default kakaoWithdrawal