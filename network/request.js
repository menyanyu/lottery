const baseUrl = "http://localhost:3000/users"
const request = (options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            url: baseUrl + options.url,
            timeout: 10000,
            data:options.data,
            success: function (res) {
                resolve(res.data)
            },
            fail: function (error) {
                reject(error)
            }
        })
    })
}

export { request}
