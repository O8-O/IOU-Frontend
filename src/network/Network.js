import RNFetchBlob from "rn-fetch-blob";


/*
    201030 - feature_user_preference
*/
class _Network {
    constructor(){
        this.option = {
            method: "",
            headers: {
                //Accept: 'application/json',
                //'Content-Type': 'application/json',
            },
            body: ""
        };

        this.state = {
            ID:""
        };
        this.link = 'http://code-giraffe.iptime.org:35000';
        this.pictureLink = 'http://code-giraffe.iptime.org:35001';
        this.header= { "Content-Type": "multipart/form-data" };//파일들은 fetch할 때 다른 header필요한듯
    }
    getNetworkId(){
        return this.state.ID
    }
    requirePwChange(_email,_pw){
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
            email:_email,
            password:_pw,
        }
        return this.fetchWrapper(this.link+'/user/reset_password',this.option)
    }
    requireRegister(_id,_pw,_email){//회원가입 정보 전송
        this.option.method='post';
        this.option.headers={
            'Content-Type': 'application/json',
        }
        this.option.body={
            id: _id,
            password: _pw,
            email:_email
        }
        return this.fetchWrapper(this.link+'/user/sign_in',this.option)
    }
    prepareLogin(_id,_pw){
        this.option.method='post';
        this.option.headers={
            'Content-Type': 'application/json',
        }
        this.option.body={
            id: _id,
            password: _pw
        }
        this.state.ID=_id;//나중에 다른곳에서 id쓰이는 것 대비해서 저장해둠.
        return this.fetchWrapper(this.link+'/user/log_in',this.option)
    } 

    getMainBoardPosts(){ //MainBoard에서 사용.
        this.option.method='post';
        this.option.body={}
        return this.fetchWrapper(this.link+'/hot_board/show',this.option)
    }
    getFreeBoardPosts(){ //FreeBoard에서 사용.
        this.option.method='post';
        this.option.body={}
        return this.fetchWrapper(this.link+'/free_board/show_all',this.option)
    }
    sendVotePost(_title,_contentText,img1,img2){//write 에서 변환할 사진이 있을때 서버로 보낼 때 씀.
        this.option.method='post';
        this.option.body={
            title:_title,
            contentText:_contentText,
            id:this.state.ID,
            imgFile:img1,
            imgFile:img2,
        }
        return this.VoteBoardImageWrapper(this.link+'/vote_board/create',this.option,img1.uri,img2.uri)
    }
    getVoteBoardPosts(){
        this.option.method='post';
        this.option.body={}
        return this.fetchWrapper(this.link+'/vote_board/show_all',this.option)
    }
    sendVoteResult(_postNum,_choice){
        this.option.method='post';
        this.option.body={
            id : this.state.ID,
            postNum : _postNum,
            choice : _choice,
        }
        return this.fetchWrapper(this.link+'/vote_board/vote',this.option)
    }
    showVoteResult(_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
        }
        return this.fetchWrapper(this.link+'/vote_board/show_one',this.option)
    }
    checkFreeLiked(_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id:this.state.ID,
        }
        return this.fetchWrapper(this.link+'/recommend/exist_free',this.option)
    }
    checkVoteLiked(_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id:this.state.ID,
        }
        return this.fetchWrapper(this.link+'/recommend/exist_vote',this.option)
    }
    getMyFreeBoardPosts(){ //Profile > MyFreeBoard에서 사용.
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
        }
        return this.fetchWrapper(this.link+'/free_board/show_all_user_board',this.option)
    }
    deleteFreeBoard(_id,_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id:_id,
        }
        return this.fetchWrapper(this.link+'/free_board/delete',this.option)
    }
    deleteVoteBoard(_id,_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id:_id,
        }
        return this.fetchWrapper(this.link+'/vote_board/delete',this.option)
    }
    numToImg(num){ // selectedPic 에서 사용. 이미지 num을 주소로.
        return new Promise((res, rej) => {
            console.log('api에 붙는 num')
            console.log(num)
            //console.log(this.link+'/user/download/'+num)
            fetch(this.link+'/user/download/'+num)
            //.then((response) => response.text())  <-이거 get은 안써도 되는듯
            .then(resp=>{
                console.log("NW의 numToImg 성공")
                console.log(resp)
                res(resp)
            })
            .catch(err=>{
                console.log('Network의 numToTmg 함수에서 에러남')
                console.log(err)
            })
        })
    }  

    firstPreferenceResult(_list){//사용자가 선호도 조사에서 선택한 사진결과를 서버로 보내기.
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
            list:_list
        }
        console.log('보낼것')
        console.log(this.option.body.id)
        console.log(this.option.body.list)
        return this.fetchWrapper(this.link+'/user/save_preference',this.option)
    }
    preferenceResult(_list){// firstPreferenceResult 이후에 선호도 조사를 수정해서 다시할 때
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
            list:_list
        }
        console.log('보낼것')
        console.log(this.option.body.id)
        console.log(this.option.body.list)
        return this.fetchWrapper(this.link+'/user/edit_preference',this.option)
    }
    loadUserPreference(id){//사용자가 선호도 조사에서 선택했던 결과들 가져오기
        this.option.method='post';
        this.option.body={
            id:id,
        }
        return this.fetchWrapper(this.link+'/user/show_user_preference',this.option)
    }
    loadUserPreference2(){//선호도 사진 보기화면에선 id없어서 함수 따로 만듦
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
        }
        return this.fetchWrapper(this.link+'/user/show_user_preference',this.option)
    }
    
    getRecommendImg(){// 아직 안만들어짐. RecommendPic 에서 recommend사진 가져올 때 씀
        this.option.method='post';
        this.option.body={
            id:this.state.ID
        }
        return this.fetchWrapper(this.link+'/user/show_preference',this.option)
    }
    getFurnitureImg(img){ //세부인테리어 변경에서 추천 변경 가구 사진들 서버로부터 가져오기
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
            imgFile:img
        }

        return this.imageWrapper(this.link+'/user/upload_image',this.option,img.uri)
    }

    getComment(_postType,_postNum){ // freeboard 에서 사용. 게시물의 댓글 불러오기
        this.option.method='post';
        this.option.body={
            postType : _postType,
            postNum : _postNum,
        }
        return this.fetchWrapper(this.link+'/comment/show',this.option)
    }
    sendCommentToServer(_postType,_postNum,_content){//사용자가 쓴 댓글 서버로 보내기
        this.option.method='post';
        this.option.body={
            postType : _postType,
            postNum : _postNum,
            content:_content,
            id:this.state.ID,
        }
        return this.fetchWrapper(this.link+'/comment/make',this.option)
    }
    sendUserPic(img){//select style에서 변환할 사진 서버로 보낼 때 씀.
        console.log('보낼사진 img는 : '+img.uri);
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
            imgFile:img,
        }
        return this.sendUserPicImageWrapper(this.link+'/user/upload_image',this.option,img.uri)
    }
    sendUserPicWithLight(img,_lightColor){//select style에서 변환할 사진 서버로 보낼 때 씀.
        console.log('보낼사진 img는 : '+img.uri);
        this.option.method='post';
        this.option.body={
            id:this.state.ID,
            imgFile:img,
            lightColor:_lightColor,
        }
        return this.sendUserPicWithLightImageWrapper(this.link+'/user/upload_image',this.option,img.uri)
    }

    sendFreePost(_title,_contentText,_images){//write 에서 변환할 사진이 있을때 서버로 보낼 때 씀.
        console.log('보낼사진 img는 : '+img.uri);
        this.option.method='post';
        this.option.body={
            title:_title,
            contentText:_contentText,
            id:this.state.ID,
            imgFile:_images
        }
        return this.freeBoardImageWrapper(this.link+'/free_board/create',this.option,_images)
    }
    sendFreePostNoPic(_title,_contentText){//write 에서 변환할 사진이 없을때 서버로 보낼 때 씀.
        this.option.method='post';
        this.option.body={
            title:_title,
            contentText:_contentText,
            id:this.state.ID,
            //imgFile:i
        }
        return this.fetchWrapper(this.link+'/free_board/create',this.option)
    }
    deleteComment(_id,_commentNum){
        this.option.method='post';
        this.option.body={
            id:_id,
            commentNum:_commentNum,
        }
        return this.fetchWrapper(this.link+'/comment/delete',this.option)
    }
    increaseFreeLike(_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id : this.state.ID,
        }
        return this.fetchWrapper(this.link+'/recommend/make_free',this.option)
    }
    decreaseFreeLike(_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id : this.state.ID,
        }
        return this.fetchWrapper(this.link+'/recommend/cancel_free',this.option)
    }

    increaseVoteLike(_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id : this.state.ID,
        }
        return this.fetchWrapper(this.link+'/recommend/make_vote',this.option)
    }
    decreaseVoteLike(_postNum){
        this.option.method='post';
        this.option.body={
            postNum : _postNum,
            id : this.state.ID,
        }
        return this.fetchWrapper(this.link+'/recommend/cancel_vote',this.option)
    }

    FreeBoardImageWrapper(url,opt,_images){// for write to send freeboard post to server   
        var images = [];
        _images.map((image) => {
            images.push({
                data: RNFetchBlob.wrap(image.uri),
                name: 'imgFile',
                type: "image/jpeg",
            });
        });
        let title = {
            name: "title",
            data: opt.body.title,
        }
        let contentText = {
            name: "contentText",
            data: opt.body.contentText,
        }
        let id = {
            name: "id",
            data: opt.body.id,
        }
        return new Promise((res, rej) => {
            opt.body.title = JSON.stringify(opt.body.title)
            opt.body.contentText = JSON.stringify(opt.body.contentText)
            opt.body.id = JSON.stringify(opt.body.id)
            RNFetchBlob.fetch('POST',url,{}, [images,title,contentText,id])//[fileBody,opt.body])
            .then(resp=>{
                console.log('Vote 사진 fetch성공')
                res(resp)
            })
            .catch(err=>{
                console.log('Vote 사진 fetch 에러')
                rej(err)
            })
        })
    }

    VoteBoardImageWrapper(url,opt,img1,img2){// for write to send freeboard post to server   
        let fileBody1 = {
            name: 'imgFile',
            filename: img1+".jpg",
            type: "image/jpeg",
            data: RNFetchBlob.wrap(img1)
        }
        let fileBody2 = {
            name: 'imgFile',
            filename: img2+".jpg",
            type: "image/jpeg",
            data: RNFetchBlob.wrap(img2)
        }
        let title = {
            name: "title",
            data: opt.body.title,
        }
        let contentText = {
            name: "contentText",
            data: opt.body.contentText,
        }
        let id = {
            name: "id",
            data: opt.body.id,
        }
        return new Promise((res, rej) => {
            opt.body.title = JSON.stringify(opt.body.title)
            opt.body.contentText = JSON.stringify(opt.body.contentText)
            opt.body.id = JSON.stringify(opt.body.id)
            RNFetchBlob.fetch('POST',url,{}, [fileBody1,fileBody2,title,contentText,id])//[fileBody,opt.body])
            .then(resp=>{
                console.log('Vote 사진 fetch성공')
                res(resp)
            })
            .catch(err=>{
                console.log('Vote 사진 fetch 에러')
                rej(err)
            })
        })
    }

    sendUserPicImageWrapper(url,opt,img){//조명이 없는 이미지 전송
        let fileBody = {
            name: 'imgFile',
            type: "image/jpeg",
            data: RNFetchBlob.wrap(img)
        }
        let id = {
            name: "id",
            data: opt.body.id,
        }
        return new Promise((res, rej) => {
            console.log('fetch전'+opt.body.id)
            RNFetchBlob.fetch('POST',url,{}, [fileBody,id])//[fileBody,opt.body])
            .then(resp=>{
                console.log('사진 fetch성공')
                res(resp)
            })
            .catch(err=>{
                console.log('사진 fetch 에러')
                rej(err)
            })
        })
    }
    sendUserPicWithLightImageWrapper(url,opt,img){//조명 선택 시 이미지 전송
        let fileBody = {
            name: 'imgFile',
            type: "image/jpeg",
            data: RNFetchBlob.wrap(img)
        }
        let id = {
            name: "id",
            data: opt.body.id,
        }
        let lightColor ={
            name: 'lightColor',
            data: opt.body.id,
        }
        opt.body.id = JSON.stringify(opt.body.id)
        opt.body.lightColor = JSON.stringify(opt.body.lightColor)
        return new Promise((res, rej) => {
            console.log('sendUserPicWithLightImageWrapper fetch전')
            console.log(opt.body.id)
            RNFetchBlob.fetch('POST',url,{}, [fileBody,id,lightColor])//[fileBody,opt.body])
            .then(resp=>{
                console.log('사진 fetch성공')
                res(resp)
            })
            .catch(err=>{
                console.log('사진 fetch 에러')
                rej(err)
            })
        })
    }

    fetchWrapper(url,opt){
        return new Promise((res, rej) => {
            opt.body = JSON.stringify(opt.body)
            console.log('json한거')
            console.log(opt.body)
            console.log('fetch전 입니다')
            fetch(url,opt)
            .then(resp=>{
                console.log('fetch성공')
                res(resp)
            })
            .catch(err=>{
                console.log("fetch 에러났어!")
                console.log(err)
                rej(err)
            })
        })
    }


}

const Network = new _Network()

export default Network