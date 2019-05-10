import { Context } from 'koa'

// 权限验证和用户区分(商家和 admin)
export default async (ctx:Context, next: () => void) => {
  const cookie:String = ctx.cookies.get('msid')
  // 数据权限判断 如果访问装修数据
  // 如果用户在商城退出了 当前的商家账号 登录 admin 需要重新定位到管理页面或者商家页面
  if (!cookie) {
    ctx.throw(401, '用户登录过期')
  } else {
    await next()
  }
}
