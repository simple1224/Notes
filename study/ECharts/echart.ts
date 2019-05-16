import * as echarts from "echarts";

export class Echarts {
	/**
	 * 显示图表
	 */
	public static Describe($echart: any, data: any): void {
		const chart = echarts.init($echart);
		chart.setOption(new Object({
			// 调色盘颜色列表
			color: ["#5477a9", "#c50e12", "#494949"],
			// 提示框组件。
			tooltip: {
				trigger: "axis"//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
			},
			// 图例的数据数组
			legend: {
				data: data.legendData
			},
			// 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
			// 可以在网格上绘制折线图，柱状图，散点图（气泡图）。
			grid: {
				left: "3%",//grid 组件离容器左侧的距离。
				right: "8%",//grid 组件离容器右侧的距离。
				bottom: "6%",//grid 组件离容器下侧的距离。
				containLabel: true //grid 区域是否包含坐标轴的刻度标签。
			},
			// 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，
			// 多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
			xAxis: {
				type: "category",//类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
				data: data.xAxisData,//类目数据，在类目轴（type: 'category'）中有效
				splitLine: { //坐标轴在 grid 区域中的分隔线。
					show: true //是否显示分隔线。默认数值轴显示，类目轴不显示。
				}
			},
			// 直角坐标系 grid 中的 y 轴，一般情况下单个 grid 组件最多只能放左右两个 y 轴，
			// 多于两个 y 轴需要通过配置 offset 属性防止同个位置多个 Y 轴的重叠。
			yAxis: {
				name: data.yAxisName, //坐标轴名称。
				type: "value" // 数值轴，适用于连续数据。
			},
			// dataZoom 组件 用于区域缩放，从而能自由关注细节的数据信息，或者概览数据整体，或者去除离群点的影响。
			dataZoom: data.dataZoom,
			//系列列表。每个系列通过 type 决定自己的图表类型
			series: data.series 
		}));
	};
};