Page({

    /**
     * 页面的初始数据
     */
    data: {
        redBallList: [0, 0, 0, 0, 0, 0],
        blueBall: 0,
        delay: "500",
        btnDis: false,
        redDuration: 1500,
        blueDuration: 1500
    },

    startRoll() {
        const p = new Promise((resolve, reject) => {
            this.randomNum()
            for (let i = 0; i < 6; i++) {
                var t1 = setTimeout(() => {
                    this.selectComponent(`#reds${[i]}`).start();
                    this.setData({
                        btnDis: true
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
                    btnDis: false
                })
            }, this.data.blueDuration);
        })
    },

    //获取随机数
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