


TODO: 覆盖 andt 的样式问题 必须放在 loader 中去配置

TODO: react 版本现状: 16.7.0-alpha.0 待正式时 升级到最新(支持 hook)

> 如果出现 webpack import 语法错误
* 删除 node_modules
* npm update acorn --depth 20
* npm dedupe


TODO: 添加 Route 权限控制

```
// wrapping/composing
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```
sudo docker exec -it dbb2d1a6a4b4 /bin/bash
