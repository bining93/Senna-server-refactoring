import login from './login.js';
import logout from './logout.js';
import signup from './signup.js';
import checkId from './checkId.js';
import favorite from './favorite.js';
import deleteFavorite from './deleteFavorite.js';


//엔드포인트별로 js 파일만든걸 export한다.
export default {
    login,
    logout,
    signup,
    checkId,
    favorite,
    deleteFavorite
}

