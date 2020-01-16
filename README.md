# ncc 构建
> npm i -g @zeit/ncc

change log:
添加多sku处理
// TODO: 添加多sku逻辑处理 start
let itemPrice = formatPrice(highPrice);
if (skus.length) {
  const defaultSku = find(({ extra }) => extra.isDefaultSku === '1', skus);
  if (defaultSku && defaultSku.id) {
    itemPrice = formatPrice(defaultSku.price);
  }
}
// 多sku逻辑处理end
