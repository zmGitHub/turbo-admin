// 模板组件注册
import Text from './Text/template.config'
import Image from './Image/template.config'
import ThermalZone from './ThermalZone/template.config'
import Swiper from './Swiper/template.config'
import ArticleCard from './ArticleCard/template.config'
import CouponCard from './Coupon/template.config'

// 同时导出所有的模板
export default {
  text: Text,
  image: Image,
  thermalZone: ThermalZone,
  swiper: Swiper,
  noticeCard: Text,
  articleCard: ArticleCard,
  coupon: CouponCard
}
