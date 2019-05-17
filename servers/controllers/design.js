"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const ramda_1 = require("ramda");
const design_1 = require("../models/design");
const design_2 = require("../services/design");
const refuse_1 = require("../services/refuse");
class Design {
    // 获取单个装修
    static async getById(ctx) {
        const { id } = ctx.params;
        const res = await design_2.get(id);
        ctx.status = 200;
        if (res && res.id) {
            const { id, data } = res;
            ctx.body = { id, data };
        }
        else {
            ctx.body = '';
        }
    }
    // 获取发布中的数据
    static async getTiming(ctx) {
        const res = await design_2.getTiming();
        ctx.status = 200;
        ctx.body = res || { msg: '暂无最新模板' };
    }
    // 获取分类
    static async queryDesign(ctx) {
        const params = ctx.query;
        const res = await design_2.query(params);
        let entities = { data: [], total: 0 };
        if (ramda_1.is(Array, res)) {
            const data = ramda_1.map((_a) => {
                var { data } = _a, rest = __rest(_a, ["data"]);
                return (Object.assign({ canPublish: !!data }, rest));
            }, ramda_1.head(res));
            const total = ramda_1.last(res);
            entities = { data, total };
        }
        ctx.status = 200;
        ctx.body = entities;
    }
    // 添加模板
    static async addDesign(ctx) {
        const { body } = ctx.request;
        const res = await design_2.add(body);
        ctx.status = 200;
        ctx.body = res;
    }
    // 根据商家 id 查询正在使用的店铺模板
    static async getHome(ctx) {
        const { id } = ctx.params;
        const res = await design_2.getHome(id);
        ctx.status = 200;
        ctx.body = res;
    }
    // 发布装修数据
    static async publish(ctx) {
        const { body } = ctx.request;
        const { id, publishType, type, timer, reservation } = body;
        try {
            // 首页发布 特殊处理 需要通知商家
            if (type === '1') {
                if (publishType !== 'force') {
                    const params = { reservation, status: design_1.DesignStatus.TIMING };
                    if (timer) {
                        params.timer = timer;
                        params.status = design_1.DesignStatus.TIMER;
                        const res = await design_2.timing(id, params);
                        // 数据保存成功后 开始定时任务
                        console.log(res);
                        if (res) {
                            // 先开始定时任务
                            const timeToTimer = new Date(timer);
                            const timeToTimerJob = new cron_1.CronJob(timeToTimer, () => {
                                // 开始商家拒绝
                                console.log(`开始定时任务: id: ${id}-type: ${type}`);
                                design_2.timing(id, { status: design_1.DesignStatus.TIMING });
                            });
                            timeToTimerJob.start();
                            // 最后开始拒绝任务
                            const timeToReservation = new Date(reservation);
                            const reservationJob = new cron_1.CronJob(timeToReservation, () => {
                                // 开始发布
                                console.log(`1 首页开始发布: ${id}-${type}`);
                                design_2.publishHome(id);
                            });
                            reservationJob.start();
                        }
                    }
                    else {
                        const res = await design_2.timing(id, params);
                        if (res) {
                            const timer = new Date(reservation);
                            const reservationJob = new cron_1.CronJob(timer, () => {
                                // 立即发布 + 商家预留时间 TODO: 需要用其他的发布方法
                                console.log(`2 开始发布: ${id}-${type}`);
                                design_2.publishHome(id);
                            });
                            reservationJob.start();
                        }
                    }
                }
                else {
                    await design_2.publishForce(id);
                }
            }
            else {
                if (publishType === 'timing') {
                    const res = await design_2.timing(id, { timer, status: design_1.DesignStatus.TIMING });
                    if (res) {
                        const timeToPublish = new Date(timer);
                        const publishJob = new cron_1.CronJob(timeToPublish, () => {
                            // 定时发布
                            console.log(`3 开始发布: ${id}-${type}`);
                            design_2.publish({ id, type });
                        });
                        publishJob.start();
                    }
                }
                else {
                    await design_2.publish({ id, type });
                }
            }
            ctx.status = 200;
            ctx.body = { code: 1 };
        }
        catch (error) {
            console.log(error);
            ctx.status = 500;
            ctx.body = { msg: error };
        }
    }
    // 商家更新装修数据
    static async updateO2o(ctx) {
        const { body: { id, data, name, o2oId, shopId } } = ctx.request;
        // 如果 o2oId 和 shopId 一样则直接修改
        try {
            ctx.status = 200;
            if (+o2oId === +shopId) {
                await design_2.update({ id, data });
                ctx.body = { id, data, name, shopId };
            }
            else {
                const res = await design_2.add({
                    name,
                    data,
                    shopId: o2oId,
                    type: design_1.DesignType.HOME,
                    status: design_1.DesignStatus.PUBLISH,
                });
                if (res && res.id) {
                    ctx.body = Object.assign({}, res);
                }
                else {
                    ctx.body = null;
                }
            }
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { msg: '数据更新失败', error: error.message };
        }
    }
    // 更新装修数据
    static async update(ctx) {
        const { body } = ctx.request;
        const res = await design_2.update(body);
        if (res && res.raw && res.raw.affectedRows) {
            ctx.status = 200;
            ctx.body = res;
        }
        else {
            ctx.status = 500;
            ctx.body = { msg: '更新失败' };
        }
    }
    // 获取首页模板
    static async getO2o(ctx) {
        const { shopId } = ctx.query;
        try {
            let body = null;
            const res = await design_2.getHome(shopId);
            if (res && ramda_1.is(Array, res) && res.length) {
                const design = ramda_1.find(ramda_1.propEq('shopId', +shopId), res) || ramda_1.last(res);
                if (design && design.id) {
                    const { id, name, data, shopId } = design;
                    body = { id, name, data, shopId };
                }
            }
            ctx.status = 200;
            ctx.body = body;
        }
        catch (error) {
            ctx.status = 500;
            ctx.body = { msg: error.message };
        }
    }
    // 获取商家历史模板数据
    static async getHistory(ctx) {
        const { shopId } = ctx.query;
        const res = await design_2.getShopHistory(shopId);
        ctx.status = 200;
        ctx.body = res;
    }
    // 商家拒绝
    /**
     * 需要处理: 如果当前商家有拒绝过 而且存在已经发布的模板 则不处理 如果商家是第一次拒绝 则获取到当前生效的模板 为其创建一条数据
     * 并设置 status 为 3
     */
    static async reject(ctx) {
        const { body } = ctx.request;
        const refuse = await refuse_1.getRefuse(body);
        if (refuse && refuse.id) {
            ctx.status = 200;
            ctx.body = {
                msg: '已经拒绝过该模板',
                code: -1,
            };
        }
        else {
            const current = await design_2.getShopPublish(body.shopId);
            // 当前商家是否有发布的模板
            if (!current) {
                // 如果商家没有发布的模板 则获取当前生效的模板 给当前这个商家
                const design = await design_2.getPublish(design_1.DesignType.HOME);
                if (design && design.id) {
                    const { name, data, type, status } = design;
                    await design_2.add({ name, data, type, status, shopId: body.shopId });
                }
            }
            // 如果有的话 添加数据到拒绝表 防止最新版本的覆盖
            const res = await refuse_1.addRefuse(body);
            if (res) {
                ctx.status = 200;
                ctx.body = res;
            }
        }
    }
}
exports.default = Design;
//# sourceMappingURL=design.js.map