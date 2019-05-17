"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ramda_1 = require("ramda");
const design_1 = require("../models/design");
exports.get = async (id) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    const design = await designRpo.findOne(id);
    return design;
};
exports.add = async (params) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    const design = designRpo.create(params);
    return await designRpo.save(design);
};
// 模板定时
exports.timing = async (id, params) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    return await designRpo.update(id, params);
};
// 发布首页模板
exports.publishHome = async (id) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    // 找到拒绝的商家 id
    const designs = await designRpo.find({
        relations: ['refuses'],
        where: { id },
    });
    if (designs && designs.length) {
        // 处理那些没有拒绝的商家
        const { refuses } = ramda_1.head(designs);
        const shopIds = ramda_1.map(({ shopId }) => shopId, refuses);
        const ids = ramda_1.append(1, shopIds);
        const res = await designRpo.createQueryBuilder('design')
            .update(design_1.Design)
            .set({ status: design_1.DesignStatus.INIT })
            .where('shopId NOT IN (:...ids)', { ids })
            .execute();
        console.log(res);
    }
    // 发布当前模板
    return await exports.publish({ id, type: design_1.DesignType.HOME });
};
// 首页强制发布模板
exports.publishForce = async (id) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    // 先取消掉发布的模板 商家和系统默认的
    const resetRes = await designRpo.update({
        status: design_1.DesignStatus.PUBLISH,
        type: design_1.DesignType.HOME,
    }, { status: design_1.DesignStatus.INIT });
    const updateRes = await designRpo.update(id, { status: design_1.DesignStatus.PUBLISH });
    return { resetRes, updateRes };
};
// 发布模板
exports.publish = async (params) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    // 先取消掉发布的模板
    const resetRes = await designRpo.update({
        status: design_1.DesignStatus.PUBLISH,
        type: params.type,
        shopId: 1,
    }, { status: design_1.DesignStatus.INIT });
    const updateRes = await designRpo.update(params.id, { status: design_1.DesignStatus.PUBLISH });
    return { resetRes, updateRes };
};
exports.update = async (params) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    return await designRpo.createQueryBuilder('designUpdate')
        .update(design_1.Design)
        .set(params)
        .where('id = :id', { id: params.id })
        .execute();
};
exports.query = async (params) => {
    const { pageNo, pageSize, type } = params;
    const designRpo = typeorm_1.getRepository(design_1.Design);
    const list = await designRpo.createQueryBuilder('design')
        .where('design.type = :type', { type })
        .andWhere('design.shopId = :shopId', { shopId: 1 })
        .orderBy('design.createAt')
        .skip((pageNo - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
    return list;
};
// 获取发布的模板
exports.getPublish = async (type) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    return await designRpo.findOne({
        type,
        status: design_1.DesignStatus.PUBLISH,
    });
};
// 获取模板最新发布的数据
exports.getTiming = async () => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    const res = await designRpo.findOne({
        type: design_1.DesignType.HOME,
        status: design_1.DesignStatus.TIMING,
    });
    return res;
};
// 获取店铺的首页装修数据
exports.getHome = async (id) => {
    // TODO: 加 cache
    const designRpo = typeorm_1.getRepository(design_1.Design);
    const params = {
        status: design_1.DesignStatus.PUBLISH,
        type: design_1.DesignType.HOME,
        shopId: typeorm_1.In([1, id]),
    };
    const res = await designRpo.find(params);
    return res;
};
// 获取店铺历史装修数据
exports.getShopHistory = async (id) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    const params = {
        type: design_1.DesignType.HOME,
        status: design_1.DesignStatus.INIT,
        shopId: id,
    };
    const res = await designRpo.find(params);
    return res;
};
// 获取店铺当前生效的
exports.getShopPublish = async (id) => {
    const designRpo = typeorm_1.getRepository(design_1.Design);
    const params = {
        type: design_1.DesignType.HOME,
        status: design_1.DesignStatus.PUBLISH,
        shopId: id,
    };
    const res = await designRpo.findOne(params);
    return res;
};
//# sourceMappingURL=design.js.map