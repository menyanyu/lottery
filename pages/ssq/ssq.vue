<template>
	<div class="box">
		<div class="ball">
			<div class="redball">
				<div class="redball-item" v-for="(item, index) in 6" :key="index"></div>
				<div class="blueball"></div>
			</div>



			<div class="rednum">
				<div v-for="(item, index) in redBallList" :key="index">
					<u-count-to class="rednum-item" ref="redCountTo" :fontSize="fontSize" :color="countToColor"
						:autoplay='autoplay' :end-val='item' :duration='duration'>
					</u-count-to>
				</div>
				<u-count-to class="rednum-item" ref="bluecountTo" :fontSize="fontSize" :autoplay='autoplay'
					:color="countToColor" :end-val="blueBall" :duration='duration'>
				</u-count-to>
			</div>
		</div>



		<div class="suiji">
			<span class="btn">
				<u-button type="primary" @click="sub" shape="circle" text="随机一注"></u-button>
			</span>
			<span class="btn">
				<u-button type="warning" @click="sub" shape="circle" text="计算概率"></u-button>
			</span>
		</div>
		
		<view class="fenxi">
			<u-alert type="error" :description="description"></u-alert>
		</view>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				redBallList: [null, null, null, null, null, null],
				blueBall: null,
				autoplay: false,
				duration: 5000,
				delay: 500,
				countToColor: "#FFFFFF",
				fontSize: "18",
				description: '经过计算分析，红号出现5的概率为20%'
			}
		},

		methods: {
			//随机一注
			sub() {
				this.randomNum()
				for (let i = 0; i < 6; i++) {
					setTimeout(() => {
						this.$refs.redCountTo[i].start()
					}, i * this.delay);
				}
				setTimeout(() => {
					this.$refs.bluecountTo.start()
				}, 8 * this.delay);

				// 33*32*31*30*29*28/123456相乘的商得出110万再乘16就知道了

			},

			//获取随机数
			randomNum() {
				let list = [];
				let blue = Math.ceil(Math.random() * 16);
				while (list.length < 6) {
					let num = Math.ceil(Math.random() * 33);
					if (list.indexOf(num) == -1) {
						list.push(num)
						list.sort(function(a, b) {
							return a - b
						});
					}
				}
				this.redBallList = list
				this.blueBall = blue

			}


		}
	}
</script>

<style scoped>
	.box {
		margin: 40rpx
	}

	.suiji {
		display: flex;
		justify-content: space-around;
		padding: 50rpx 0;
	}

	.btn {
		width: 200rpx;
	}

	.ball {
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.redball {
		/* margin-left: 20rpx; */
		height: 70rpx;
		position: absolute;
	}

	.redball-item {
		display: flex;
		margin: 10rpx;
		float: left;
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		background-color: #e60213;
	}

	.blueball {
		margin: 10rpx;
		float: left;
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		background-color: #0C81E2;
	}

	.rednum {
		/* margin-left: 20rpx; */
		position: relative;
		height: 70rpx;
		display: flex;
	}

	.rednum-item {
		height: 80rpx;
		width: 80rpx;
		margin: 10rpx;
		line-height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fenxi {
		margin-bottom: 10rpx;
	}
</style>
