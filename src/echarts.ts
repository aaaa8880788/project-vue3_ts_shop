import * as echarts from 'echarts/core'
import {
  EffectScatterChart,
  EffectScatterSeriesOption,
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  PieChart,
  PieSeriesOption,
  LinesChart,
  LineChart,
  LineSeriesOption,
  MapChart,
  MapSeriesOption
} from 'echarts/charts'
import {
  VisualMapComponent,
  VisualMapComponentOption,
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | EffectScatterSeriesOption
  | VisualMapComponentOption
  | DataZoomComponentOption
  | LineSeriesOption
  | ToolboxComponentOption
  | BarSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
  | MapSeriesOption
>

// 注册必须的组件
echarts.use([
  VisualMapComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  DataZoomComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
  CanvasRenderer,
  PieChart,
  LinesChart,
  LineChart,
  MapChart,
  EffectScatterChart
])

export default echarts
