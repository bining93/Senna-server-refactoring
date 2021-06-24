//엔드포인트별로 js 파일만든걸 export한다.
export default {
    //작업한 js파일 추가하기 
    //ex) login : require('./login');

    login: require('./login'),
    logout: require('./logout'),
    signup: require('./signup'),
}

