// import { myBallObj } from "./config.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        myBallObj: null,
        myBallArr: null,
        expect: "",
        lotteryNumber: "",
        lotteryNumberRed: null,
        lotteryNumberBlue: "",
        analysisResults: false,
        analysisResultTitle: "分析结果：分析结果仅供参考，最终结果请核对彩票官网，感谢您的使用，祝您中大奖！",
        analysisResult: null
    },

    //重新识别
    retry() {
        wx.redirectTo({
            url: '../index/index'
          })
    },

    submit() {
        wx.request({
            method: "POST",
            url: 'https://api.wsgsb.com/users/lottery/period',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: { expect: this.data.expect },
            success: res => {
                let lotteryNumber = res.data.data[0].openCode.slice(0, 17)
                let blueBall = res.data.data[0].openCode.slice(18)
                let redBallArr = lotteryNumber.split(',')

                this.setData({
                    lotteryNumberRed: redBallArr,
                    lotteryNumberBlue: blueBall,
                    lotteryNumber: res.data.data[0].openCode
                })
                const myBallObj = this.data.myBallObj
                const lotteryNumberRed = this.data.lotteryNumberRed
                const lotteryNumberBlue = this.data.lotteryNumberBlue

                let count = myBallObj.map((item, index) => {
                    let filterRed = item.myRedBall.filter(res => {
                        return res == lotteryNumberRed[0] || res == lotteryNumberRed[1] || res == lotteryNumberRed[2] || res == lotteryNumberRed[3] || res == lotteryNumberRed[4] || res == lotteryNumberRed[5]
                    })

                    let filterBlue = item.myBlueBall.indexOf(lotteryNumberBlue)
                    const Obj = {
                        filterRed: filterRed.length,
                        filterBlue
                    }
                    return Obj
                })

                const countText = count.map(item => {
                    let count = item.filterRed + "+" + (item.filterBlue + 1)
                    if (count == "6+1") {
                        count = count + "(一等奖)"
                    } else if (count == "6+0") {
                        count = count + "(二等奖)"
                    } else if (count == "5+1") {
                        count = count + "(三等奖,单注奖金3000元)"
                    } else if (count == "5+0" || count == "4+1") {
                        count = count + "(四等奖,单注奖金200元)"
                    } else if (count == "4+0" || count == "3+1") {
                        count = count + "(五等奖,单注奖金10元)"
                    } else if (count == "2+1" || count == "1+1" || count == "0+1") {
                        count = count + "(六等奖,单注奖金5元)"
                    } else {
                        count = count + "(未中奖)"
                    }
                    return count
                })

                myBallObj.map((item, index) => {
                    return item.analysisResult = countText[index]
                })
                this.setData({
                    myBallObj,
                    analysisResults: true,
                })
            },
            fail: ((errMsg, code) => {
                console.log(errMsg, code)
            })
        })

    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        let array = JSON.parse(options.LotteryData)


        let myBlueBall = array.formatBall.map(item => {
            let blueArr = item.slice(6, 7).join()
            return blueArr
        })

        let myBallArr = array.formatBall
        let temp = myBallArr.map((item) => {
            item.slice(0, 6).push(myBlueBall)
        })


        let myBallObj = array.formatBall.map((item, index) => {
            return item = { "myRedBall": item.slice(0, 6), "myBlueBall": myBlueBall[index] }
        })

        this.setData({
            myBallArr,
            myBallObj,
            expect: array.expect
        })

        // console.log(myBallArr)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})





