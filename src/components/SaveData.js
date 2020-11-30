import AsyncStorage from '@react-native-async-storage/async-storage';
var resImageKey = "RES_IMAGE_KEY";
var reqImageKey = "REQ_IMAGE_KEY";

function saveImageData(imageNameList, changedInfor) {
    return new Promise((res, rej) => {
        try{
            AsyncStorage.setItem(resImageKey, {
                imageNameList: imageNameList,
                changedInfor: changedInfor
            }, () => {
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
                res(JSON.parse(value));
            }
            else {
                rej(err);
            }
        })
    });
}

function saveReqData(imageName) {
    return new Promise((res, rej) => {
        try{
            AsyncStorage.setItem(reqImageKey, {
                reqName: imageName
            }, () => {
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
        AsyncStorage.getItem(reqImageKey, (err, value) => {
            if(err == null) {
                res(JSON.parse(value));
            }
            else {
                rej(err);
            }
        })
    });
}

// At recommand screen`s method...
class screen {
    componentDidMount() {
        callReqData().then((value) => {
            if(value.reqName == null || value.reqName.length == 0) {
                // 요청한 데이터가 있습니다.
                callImageData().then((value) => {
                    if(value.imageNameList.length == 0) {
                        // 요청 데이터가 있고, 결과가 오긴 했지만 아직 결과가 저장되지 않았습니다.
                        // 대기 메시지 출력
                    }
                    else {
                        // 요청 데이터에 대한 결과가 왔습니다. -> 결과창으로 이동
                    }
                })
            }
            else {
                // 이미 요청한게 있습니다.
                // 대기 메시지 출력.
            }
        });
    }

    onRequestUpload() {
        // ...

        saveImageData("", {});
        saveReqData("Requested/Image/Data.jpg");
    }

    onResult() {
        // ...

        saveImageData(
            ["recommend1.jpg","recommend2.jpg","recommend3.jpg"], 
            {"색이 어쩌고 한 정보 저장" : "#2347CD"}
        );
        saveReqData("");
    }
}