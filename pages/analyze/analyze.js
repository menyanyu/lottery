Page({

    /**
     * 页面的初始数据
     */
    data: {
        redBallList: [0, 0, 0, 0, 0, 0],
        ball: null,
        blueBall: 0,
        delay: "500",
        btnDis1: false,
        btnDis2: true,
        redDuration: 1500,
        blueDuration: 1500,
        display: false,
        analysisResults: null,
        blueAnalysis: null
    },


    //开始滚动
    startRoll() {
        const p = new Promise((resolve, reject) => {
            this.randomNum()
            let redBall = this.data.redBallList
            const strArr = redBall.map(item => {
                let str = item.toString()
                if (str.length == 1) { str = "0" + str }
                return str
            })
            let blue = this.data.blueBall.toString()
            if (blue.length == 1) { blue = "0" + blue }
            const str = strArr.toString() + "+" + blue
            this.setData({
                ball: str
            })

            for (let i = 0; i < 6; i++) {
                var t1 = setTimeout(() => {
                    this.selectComponent(`#reds${[i]}`).start();
                    this.setData({
                        btnDis1: true
                    })
                }, i * this.data.delay);
            }
            const t2 = setTimeout(() => {
                this.selectComponent("#blue").start();
                resolve()
            }, 8 * this.data.delay);
        }).then(() => {
            const t3 = setTimeout(() => {
                this.setData({
                    btnDis1: false,
                    btnDis2: false
                })
            }, this.data.blueDuration);
        })
    },

    //获取随机红球和蓝球
    randomNum() {
        let list = [];
        let blue = Math.ceil(Math.random() * 16);
        while (list.length < 6) {
            let num = Math.ceil(Math.random() * 33);
            if (list.indexOf(num) == -1) {
                list.push(num)
                list.sort(function (a, b) {
                    return a - b
                });
            }
        }

        this.setData({
            redBallList: list,
            blueBall: blue
        })
    },

    //开始分析
    startAnalysis() {
        wx.showLoading({
            title: '分析中',
        })

        wx.request({
            method: "GET",
            url: 'https://api.wsgsb.com/users/lottery/red/count',
            data: { data: this.data.ball },
            timeout: 10000,
            success: res => {
                let json = []
                for (let i = 0; i < 6; i++) {
                    let redAttribute = res.data.data.redForget[i]
                    if (redAttribute > 6) {
                        redAttribute = "冷号"
                    } else {
                        redAttribute = "热号"
                    }
                    json.push({
                        redAppearCount: res.data.data.redAppearCount[i],
                        redForget: res.data.data.redForget[i],
                        redProbabilit: res.data.data.redProbability[i],
                        redBall: this.data.redBallList[i],
                        redAttribute
                    })
                }
                let blueAttribute = res.data.data.blueForget
                if (blueAttribute > 6) {
                    blueAttribute = "冷号"
                } else {
                    blueAttribute = "热号"
                }
                let blueObj = {
                    blueAppearCount: res.data.data.blueAppearCount,
                    blueForget: res.data.data.blueForget,
                    blueProbability: res.data.data.blueProbability,
                    blueAttribute
                }
                this.setData({
                    analysisResults: json,
                    blueAnalysis: blueObj
                })
            },
            fail: err => {
                wx.showToast({
                    title: '服务器连接失败',
                })
            }
        })




        setTimeout(() => {
            wx.hideLoading({
                success: (res) => {
                    this.setData({
                        display: true
                    })
                },
            })
        }, 500);
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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