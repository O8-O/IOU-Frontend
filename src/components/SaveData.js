import AsyncStorage from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-community/async-storage';
//npm i @react-native-async-storage/async-storage

var resImageKey = "RES_IMAGE_KEY";
var reqImageKey = "REQ_IMAGE_KEY";

function saveImageData(result){// (imageNameList, changedInfor) {//추천받은 정보에 대해서 저장
    console.log('이미지 데이터 저장해 ㅜㅜㅜㅜㅜㅜㅜㅜ')
    return new Promise((res, rej) => {
        try{
           // const result = JSON.stringify(_result)
            AsyncStorage.setItem(resImageKey, JSON.stringify({
                imageResult: result
            }), () => {
                res();
            });
        }
        catch(err) {
            console.log(err);
            rej(err);g
        }
    });
}

function callImageData() {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(resImageKey, (err, value) => {
            if(err == null) {
                console.log("parse해줘")
                console.log(value)
                res(JSON.parse(value));
            }
            else {
                rej(err);
            }
        })
    });
}

function saveReqData(imageNum) {//client가 요청한 정보에 대해서 저장하고 있습니다
    return new Promise((res, rej) => {
        try{
            //const imageNum = JSON.stringify(_imageNum)
            AsyncStorage.setItem(reqImageKey, JSON.stringify({//setItem 으로 저장함
                reqNum: imageNum
            }), () => {
                res();
            });
        }
        catch(err) {
            console.log(err);
            rej(err);
        }
    });
}

function callReqData() {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(reqImageKey, (err, value) => {//getItem 으로 불러옴 
            if(err == null) {
                console.log("parse해줘")
                console.log(value)
                res(JSON.parse(value));
                
            }
            else {
                rej(err);
            }
        })
    });
}

function onRequestUpload(imageNum) {//REQUEST보낼땐 이거 사용
        // 
    // ...

    saveImageData("");
    saveReqData(imageNum);
}

function onResult(_result) {//결과가 있어서 결과를 받을때에는 이거 사용.
//imagedata에는 결과 넣어주고 요청은 해결했으니까 ""으로 초기화.
// ...
    
    saveImageData(_result);
    saveReqData("");
}
function clearAll() {//결과가 있어서 결과를 받을때에는 이거 사용.
    //imagedata에는 결과 넣어주고 요청은 해결했으니까 ""으로 초기화.
    // ...
        saveImageData("");
        saveReqData("");
    }

export{ callImageData,callReqData,onRequestUpload,onResult,clearAll};
