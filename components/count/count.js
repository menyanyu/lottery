Component({
    properties: {
        startVal: {
            type: Number,
            value: 0,
        },
        endVal: {
            type: Number,
            value: 100,
        },
        duration: {
            type: Number,
            value: 2000,
        },
        useEasing: {
            type: Boolean,
            value: false
        },
        size: {
            type: Number,
            value: 50
        },
        color: {
            type: String,
            value: "#606266"
        },
        bold:{
            type:Boolean,
            value:false
        }
    },
    data: {

    },
    methods: {
        
        // 开始滚动
        start() {
            var time = Math.ceil(this.properties.duration / this.properties.endVal)
            if (this.properties.useEasing) {
                var promise = new Promise((resolve, reject) => {
                    let t1 = setInterval(() => {
                        this.setData({
                            startVal: this.properties.startVal + 1
                        })
                        if (this.properties.startVal == (this.properties.endVal - 4)) {
                            clearInterval(t1)
                            resolve(this.properties.startVal)
                        }
                    }, time);
                });
                promise.then((res) => {
                    var num = this.properties.endVal - res
                    for (let i = 0; i < num; i++) {
                        let t2 = setTimeout(() => {
                            this.setData({
                                startVal: ++res
                            })
                            if (this.properties.startVal == this.properties.endVal) {
                                clearInterval(t2)
                                this.properties.startVal = 0
                            }
                        }, i * i * i *  20);
                    }
                })
            } else {
                let t3 = setInterval(() => {
                    this.setData({
                        startVal: this.properties.startVal + 1
                    })
                    if (this.properties.startVal >= this.properties.endVal) {
                        clearInterval(t3)
                        this.properties.startVal = 0
                    }
                }, time);
            }
        },
    }
})
