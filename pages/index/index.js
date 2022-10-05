Page({
    data: {
        src: null,
        visible: false,
        size: {
            width: 380,
            height: 180
        },
        cropSizePercent: 0.9,//裁剪尺寸百分比
        borderColor: '#fff',
        result: '',
    },
    onLoad: function () { },


    //数组去空
    delNull(array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == "" || array[i] == null || typeof (array[i]) == "undefined") {
                array.splice(i, 1);
                i = i - 1;
            }
        }
        return array;
    },

    //分割字符串（要分割的字符串，每隔几位数分割）
    division(str, digit){
        let arr = [];
        for (let i = 0, len = str.length / digit; i < len; i++) {
          let subStr = str.substr(0, digit);
          arr.push(subStr);
          str = str.replace(subStr, "");
        }
        return arr;
      },


    //拍照或选取图片进行裁剪
    chooseCropImage() {
        wx.chooseMedia({
            count: 1,
            mediaType: 'image',
            sourceType: ['album', 'camera'],
            sizeType: 'compressed',
            camera: 'back',
            success: (res) => {
                wx.clearStorage()
                this.setData({
                    visible: true,
                    src: res.tempFiles[0].tempFilePath,
                })
            }
        })
    },


    //选取图片成功回调
    uploadCallback: function (event) {
        // console.log(event);
    },

    //图片裁剪完成回调
    cropCallback: function (event) {
        this.setData({
            visible: false,
            result: event.detail.resultSrc,
        });

        wx.getFileSystemManager().readFile({
            filePath: event.detail.resultSrc, //要读取的文件的路径 (本地路径)
            encoding: "base64", //指定读取文件的字符编码
            success: (res) => {
                wx.showLoading({
                    title: '加载中',
                })
                //截图转成base64后上传到后端
                wx.request({
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'https://api.wsgsb.com/users/upload',
                    data: { "image": res.data },
                    success: res => {
                        if (res == "") {
                            wx.showToast({
                                title: '获取图片信息失败',
                                icon: 'error'
                            })
                        } else {
                            /* 格式化数据 start */
                            const arr = res.data.data.words_result
                            const regExpect = /(开奖期:\d+-\d+-\d+)|(开奖期：\d+-\d+-\d+)/g

                            const getLotteryPeriod = arr.map((item) => {
                                let ballArr = item.words.match(regExpect)
                                return ballArr
                            })
                            const expectStr = String(this.delNull(getLotteryPeriod))

                            const patt = /开奖期/g;
                            const testing = patt.test(expectStr);
                            if (!testing) {
                                wx.showToast({
                                    title: '未检测到彩票',
                                    icon: 'error'
                                })
                                return
                            }
                            const expect = expectStr.slice(4, 11)
                            let regBall = /[A-Z]\.[0-9-]+/g

                            const getBallArr = arr.map((item) => {
                                let ballArr = item.words.match(regBall)
                                return ballArr
                            })
                            let balls = this.delNull(getBallArr)
                            const formatBall = balls.map((item, index, arr) => {
                                const interceptRed = item[0].slice(2,14)
                                const interceptBlue = item[0].slice('15')
                                // const separation = interceptRed.split(/(?=(?:..)*.$)/)
                                const separation = this.division(interceptRed, 2)
                                const redBall = separation.slice(0, 6)
                                redBall.push(interceptBlue)
                                return redBall
                            })
                            /* 格式化数据 end */

                            let LotteryDataObj = {
                                expect,
                                formatBall
                            }
                            let LotteryData = JSON.stringify(LotteryDataObj)
                            wx.navigateTo({
                                url: `../confirm/confirm?LotteryData=${LotteryData}`,
                                success: res => wx.hideLoading()
                            })

                        }
                    },
                    fail: ((errMsg, code) => {
                        console.log(errMsg, code)
                    })
                })




            }
        })


        // wx.uploadFile({
        //     url: 'https//api.wsgsb.com/users/updata/screenshot',
        //     filePath: event.detail.resultSrc,
        //     header: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     name: 'file',
        //     // formData: {
        //     //   'user': 'test'
        //     // },
        //     timeout: 15000,
        //     success(res) {
        //         console.log(res)
        //     }
        // })
    },

    //取消裁剪
    closeCallback: function (event) {
        this.setData({
            visible: false,
        });
    }
})