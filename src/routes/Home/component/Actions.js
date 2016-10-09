import { query } from 'containers/fetch';
import Notification from 'components/Notification';
import {
  RECEIVE_GENERAL_ANALYSIS,
  LOAD_DATA_INITIATION,
  LOAD_DATA_FAILURE
} from 'containers/constants';

const DATA = {
    "success": true,
    "code": 200,
    "result": {
        "generalAnalyses": [
            {
                "productMapping": "制冷",
                "ticketAmount": 691214,
                "settlementCost": 26518400,
                "monthOfYear": "2016-07"
            },
            {
                "productMapping": "厨电",
                "ticketAmount": 147291,
                "settlementCost": 4417050,
                "monthOfYear": "2016-07"
            },
            {
                "productMapping": "彩电",
                "ticketAmount": 247217,
                "settlementCost": 5504260,
                "monthOfYear": "2016-07"
            },
            {
                "productMapping": "洗衣机",
                "ticketAmount": 808176,
                "settlementCost": 18763600,
                "monthOfYear": "2016-07"
            },
            {
                "productMapping": "电热",
                "ticketAmount": 555488,
                "settlementCost": 23633100,
                "monthOfYear": "2016-07"
            },
            {
                "productMapping": "空调",
                "ticketAmount": 2159995,
                "settlementCost": 179818000,
                "monthOfYear": "2016-07"
            }
        ],
        "delayWarning": {
            "name": "工单延误量",
            "rate": 13.2,
            "amount": 608239
        },
        "complainWarning": {
            "name": "工单差评量",
            "rate": 0.01,
            "amount": 684
        },
        "averageSettlementWarning": {
            "name": "平均结算费用",
            "amount": 56.11
        },
        "averageOperatingWarning": {
            "name": "平均操作费用",
            "amount": 51.14
        },
        "ticketAmountMapDtos": [
            {
                "auditMap": {
                    "id": 652,
                    "branchId": 20030917000362,
                    "branchName": "青岛工贸公司售后",
                    "siteCode": "HR130606A",
                    "siteName": "青岛海恒顺工贸有限公司A",
                    "siteNameForShort": "海恒顺A",
                    "siteAddress": "青岛胶州",
                    "siteLocation": "{\"lng\":119.95942122689219,\"lat\":36.24803145848278}",
                    "createdAt": null,
                    "updatedAt": 1473302319000
                },
                "location": {
                    "lat": 36.24803,
                    "lng": 119.95942
                },
                "ticketAmount": 4149,
                "settlementCost": 196421.6,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 440,
                    "branchId": 20030917000282,
                    "branchName": "沈阳工贸公司售后",
                    "siteCode": "HR340043",
                    "siteName": "沈阳海兴鑫鑫商贸有限公司",
                    "siteNameForShort": "沈阳海兴",
                    "siteAddress": "辽宁省沈阳市于洪区黑山路8甲1号",
                    "siteLocation": "{\"lng\":123.41598247747893,\"lat\":41.86945050735774}",
                    "createdAt": null,
                    "updatedAt": 1473302312000
                },
                "location": {
                    "lat": 41.86945,
                    "lng": 123.415985
                },
                "ticketAmount": 4148,
                "settlementCost": 132636.4,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 501,
                    "branchId": 20030917000737,
                    "branchName": "北京工贸公司售后",
                    "siteCode": "HR010646",
                    "siteName": "北京君梅盛达科技发展有限公司",
                    "siteNameForShort": "北京君梅盛达",
                    "siteAddress": "北京市丰台区南宛新宫商业街1号C区4号",
                    "siteLocation": "{\"lng\":116.36765625013804,\"lat\":39.82377763698229}",
                    "createdAt": null,
                    "updatedAt": 1473302313000
                },
                "location": {
                    "lat": 39.823776,
                    "lng": 116.36765
                },
                "ticketAmount": 4147,
                "settlementCost": 82386.6,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 38,
                    "branchId": 20030917000449,
                    "branchName": "锦州工贸公司售后",
                    "siteCode": "HR360061",
                    "siteName": "朝阳润星电器维修有限公司",
                    "siteNameForShort": "朝阳万林",
                    "siteAddress": "辽宁省朝阳市双塔区友谊大街二段二号",
                    "siteLocation": "{\"lng\":120.45352440622058,\"lat\":41.59411478385964}",
                    "createdAt": null,
                    "updatedAt": 1473302299000
                },
                "location": {
                    "lat": 41.594116,
                    "lng": 120.45352
                },
                "ticketAmount": 4136,
                "settlementCost": 286327.2,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 729,
                    "branchId": 20030917000598,
                    "branchName": "杭州工贸公司售后",
                    "siteCode": "HR090154",
                    "siteName": "杭州好迪电器有限公司",
                    "siteNameForShort": "杭州好迪",
                    "siteAddress": "浙江省杭州市下城区白石巷56号",
                    "siteLocation": "{\"lng\":120.17141556366134,\"lat\":30.31414490426218}",
                    "createdAt": null,
                    "updatedAt": 1473302321000
                },
                "location": {
                    "lat": 30.314144,
                    "lng": 120.17142
                },
                "ticketAmount": 4132,
                "settlementCost": 223070.4,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 2211,
                    "branchId": 20030917000743,
                    "branchName": "重庆工贸公司售后",
                    "siteCode": "HR320220",
                    "siteName": "江北区新干线电器服务中心",
                    "siteNameForShort": "江北新干线",
                    "siteAddress": "重庆市江北区大石坝上九村176号附6号",
                    "siteLocation": "{\"lng\":106.4836736521983,\"lat\":29.611987791321862}",
                    "createdAt": null,
                    "updatedAt": 1473302366000
                },
                "location": {
                    "lat": 29.611988,
                    "lng": 106.48367
                },
                "ticketAmount": 4126,
                "settlementCost": 189203,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1705,
                    "branchId": 20030917000264,
                    "branchName": "石家庄工贸公司售后",
                    "siteCode": "HR060285",
                    "siteName": "石家庄苏宁云商商贸有限公司",
                    "siteNameForShort": "石家庄石宁苏宁",
                    "siteAddress": "河北省石家庄市桥西区中山西路64号",
                    "siteLocation": "{\"lng\":114.48886205729592,\"lat\":38.0494867015953}",
                    "createdAt": null,
                    "updatedAt": 1473302351000
                },
                "location": {
                    "lat": 38.049488,
                    "lng": 114.48886
                },
                "ticketAmount": 4104,
                "settlementCost": 464370,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1313,
                    "branchId": 20030917000161,
                    "branchName": "厦门工贸公司售后",
                    "siteCode": "HR280028",
                    "siteName": "厦门市湖里区金立林电气维修服务部",
                    "siteNameForShort": "厦门金立林",
                    "siteAddress": "福建省厦门市枋湖工业区闽江局1号店面",
                    "siteLocation": "{\"lng\":118.14329173228738,\"lat\":24.518974888658068}",
                    "createdAt": null,
                    "updatedAt": 1473302339000
                },
                "location": {
                    "lat": 24.518974,
                    "lng": 118.143295
                },
                "ticketAmount": 4103,
                "settlementCost": 161742.5,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 2167,
                    "branchId": 20030917000234,
                    "branchName": "天津工贸公司售后",
                    "siteCode": "HR020264",
                    "siteName": "天津市北辰区超瑞家电商行",
                    "siteNameForShort": "天津奥瑞达",
                    "siteAddress": "天津市北辰区北仓道奥都商贸中心底东段南",
                    "siteLocation": "{\"lng\":117.18345798199327,\"lat\":39.24655366638401}",
                    "createdAt": null,
                    "updatedAt": 1473302365000
                },
                "location": {
                    "lat": 39.246555,
                    "lng": 117.18346
                },
                "ticketAmount": 4073,
                "settlementCost": 224472.2,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 741,
                    "branchId": 20030917000721,
                    "branchName": "长春工贸公司售后",
                    "siteCode": "HR370296",
                    "siteName": "长春市铭信电器制冷服务有限公司",
                    "siteNameForShort": "长春市铭信",
                    "siteAddress": "吉林省长春市绿园区青年路日鑫小区2341号",
                    "siteLocation": "{\"lng\":125.30013869363894,\"lat\":43.93449575883924}",
                    "createdAt": null,
                    "updatedAt": 1473302322000
                },
                "location": {
                    "lat": 43.934494,
                    "lng": 125.30014
                },
                "ticketAmount": 4040,
                "settlementCost": 120876,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 13,
                    "branchId": 20030917000179,
                    "branchName": "西安工贸公司售后",
                    "siteCode": "HR190421",
                    "siteName": "西安市雁塔区鑫华田电器服务部",
                    "siteNameForShort": "西安市雁塔区华田",
                    "siteAddress": "陕西省西安市雁塔区育才路57号",
                    "siteLocation": "{\"lng\":108.96801647742755,\"lat\":34.23304167787686}",
                    "createdAt": null,
                    "updatedAt": 1473302294000
                },
                "location": {
                    "lat": 34.23304,
                    "lng": 108.96802
                },
                "ticketAmount": 4021,
                "settlementCost": 263991,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1521,
                    "branchId": 20030917000743,
                    "branchName": "重庆工贸公司售后",
                    "siteCode": "HR320575",
                    "siteName": "重庆云舟电器有限公司",
                    "siteNameForShort": "云舟电器",
                    "siteAddress": "重庆市九龙坡区谢家湾龙腾大道79号附11号",
                    "siteLocation": "{\"lng\":106.51861045486044,\"lat\":29.524671599097527}",
                    "createdAt": null,
                    "updatedAt": 1473302345000
                },
                "location": {
                    "lat": 29.524672,
                    "lng": 106.51861
                },
                "ticketAmount": 4010,
                "settlementCost": 120539.5,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1275,
                    "branchId": 20030917000097,
                    "branchName": "郑州工贸公司售后",
                    "siteCode": "HR401145",
                    "siteName": "沈丘县昌顺货物配送服务有限公司",
                    "siteNameForShort": "沈丘昌顺",
                    "siteAddress": "河南省周口市沈丘县东关马楼村县医院西200米",
                    "siteLocation": "{\"lng\":115.15754074462593,\"lat\":33.405904598606895}",
                    "createdAt": null,
                    "updatedAt": 1473302338000
                },
                "location": {
                    "lat": 33.405903,
                    "lng": 115.15754
                },
                "ticketAmount": 3976,
                "settlementCost": 193156.5,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 477,
                    "branchId": 20030917000215,
                    "branchName": "无锡工贸公司售后",
                    "siteCode": "HR080541",
                    "siteName": "常州宝纳制冷设备有限公司",
                    "siteNameForShort": "常州宝纳",
                    "siteAddress": "常州市天宁区蓝钻苑74号",
                    "siteLocation": "{\"lng\":119.967817757606,\"lat\":31.811502635650697}",
                    "createdAt": null,
                    "updatedAt": 1473302313000
                },
                "location": {
                    "lat": 31.811502,
                    "lng": 119.96782
                },
                "ticketAmount": 3956,
                "settlementCost": 400100,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1161,
                    "branchId": 20030917000392,
                    "branchName": "宁波工贸公司售后",
                    "siteCode": "HR100022",
                    "siteName": "宁波市江东铭盛家电有限公司",
                    "siteNameForShort": "江东铭盛",
                    "siteAddress": "浙江省宁波市江东区徐戎路269-279号",
                    "siteLocation": "{\"lng\":121.58505299967015,\"lat\":29.886637965831703}",
                    "createdAt": null,
                    "updatedAt": 1473302334000
                },
                "location": {
                    "lat": 29.886639,
                    "lng": 121.58505
                },
                "ticketAmount": 3940,
                "settlementCost": 94460.7,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 564,
                    "branchId": 20030917000298,
                    "branchName": "深圳工贸公司售后",
                    "siteCode": "HR270266",
                    "siteName": "深圳市宏略兴业实业发展有限公司",
                    "siteNameForShort": "宏略兴业",
                    "siteAddress": "深圳市宝安区福永街道政丰北路96号",
                    "siteLocation": "{\"lng\":113.82640736291843,\"lat\":22.680078382290056}",
                    "createdAt": null,
                    "updatedAt": 1473302315000
                },
                "location": {
                    "lat": 22.680079,
                    "lng": 113.82641
                },
                "ticketAmount": 3923,
                "settlementCost": 194690.6,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 90,
                    "branchId": 20030917000598,
                    "branchName": "杭州工贸公司售后",
                    "siteCode": "HR090017",
                    "siteName": "浙江苏宁云商商贸有限公司",
                    "siteNameForShort": "浙江云商",
                    "siteAddress": "杭州经济技术开发区白杨街道15号大街10号2幢1-4层",
                    "siteLocation": "{\"lng\":120.36239303248836,\"lat\":30.293766082033464}",
                    "createdAt": null,
                    "updatedAt": 1473302300000
                },
                "location": {
                    "lat": 30.293766,
                    "lng": 120.3624
                },
                "ticketAmount": 3904,
                "settlementCost": 413805.34,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 135,
                    "branchId": 20030917000161,
                    "branchName": "厦门工贸公司售后",
                    "siteCode": "HR280532",
                    "siteName": "漳州市宏欣达贸易有限公司",
                    "siteNameForShort": "宏欣达",
                    "siteAddress": "福建省漳州市华东工业品市场11幢17号店面",
                    "siteLocation": "{\"lng\":117.6871709231167,\"lat\":24.506526130001735}",
                    "createdAt": null,
                    "updatedAt": 1473302302000
                },
                "location": {
                    "lat": 24.506527,
                    "lng": 117.68717
                },
                "ticketAmount": 3876,
                "settlementCost": 227598.2,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 609,
                    "branchId": 20030917000298,
                    "branchName": "深圳工贸公司售后",
                    "siteCode": "HR270195",
                    "siteName": "深圳市宝安区石岩海岩维修部",
                    "siteNameForShort": "深圳海岩",
                    "siteAddress": "宝安区公明街道塘尾兴华第二工业区1号宿舍1楼",
                    "siteLocation": "{\"lng\":113.82698883607486,\"lat\":22.759998914357347}",
                    "createdAt": null,
                    "updatedAt": 1473302317000
                },
                "location": {
                    "lat": 22.759998,
                    "lng": 113.82699
                },
                "ticketAmount": 3868,
                "settlementCost": 151848.5,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 57,
                    "branchId": 20030917000179,
                    "branchName": "西安工贸公司售后",
                    "siteCode": "HR190532",
                    "siteName": "西安市雁塔区永成制冷设备安装工程部",
                    "siteNameForShort": "西安永成",
                    "siteAddress": "陕西省西安市雁塔区罗家寨235",
                    "siteLocation": "{\"lng\":108.94080844653111,\"lat\":34.2183869294318}",
                    "createdAt": null,
                    "updatedAt": 1473302299000
                },
                "location": {
                    "lat": 34.218388,
                    "lng": 108.94081
                },
                "ticketAmount": 3846,
                "settlementCost": 328448,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 419,
                    "branchId": 20030917000097,
                    "branchName": "郑州工贸公司售后",
                    "siteCode": "HR401178",
                    "siteName": "新郑市海顺装卸服务有限公司",
                    "siteNameForShort": "新郑市海顺",
                    "siteAddress": "河南省郑州市新郑市郑韩路与阁老路交叉口西北角",
                    "siteLocation": "{\"lng\":113.72897117928018,\"lat\":34.41117301130589}",
                    "createdAt": null,
                    "updatedAt": 1473302311000
                },
                "location": {
                    "lat": 34.411175,
                    "lng": 113.72897
                },
                "ticketAmount": 3817,
                "settlementCost": 142157.3,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 272,
                    "branchId": 20030917000362,
                    "branchName": "青岛工贸公司售后",
                    "siteCode": "HR130154",
                    "siteName": "青岛鸿顺瑞电器安装工程有限公司",
                    "siteNameForShort": "青岛鸿顺瑞",
                    "siteAddress": "山东省青岛市市北区松江路7号（原市南区丹东路20号",
                    "siteLocation": "{\"lng\":120.34411513392087,\"lat\":36.07979724237944}",
                    "createdAt": null,
                    "updatedAt": 1473302306000
                },
                "location": {
                    "lat": 36.079796,
                    "lng": 120.34412
                },
                "ticketAmount": 3812,
                "settlementCost": 123825.8,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1436,
                    "branchId": 20030917000264,
                    "branchName": "石家庄工贸公司售后",
                    "siteCode": "HR060011",
                    "siteName": "石家庄崇新电器有限公司",
                    "siteNameForShort": "石家庄崇新",
                    "siteAddress": "河北省石家庄市新华区联盟东路88号",
                    "siteLocation": "{\"lng\":114.49423931407864,\"lat\":38.08476654500159}",
                    "createdAt": null,
                    "updatedAt": 1473302343000
                },
                "location": {
                    "lat": 38.084766,
                    "lng": 114.49424
                },
                "ticketAmount": 3808,
                "settlementCost": 257745,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 432,
                    "branchId": 20030917000598,
                    "branchName": "杭州工贸公司售后",
                    "siteCode": "HR090607",
                    "siteName": "义乌市海瀚家电有限公司",
                    "siteNameForShort": "义乌海瀚",
                    "siteAddress": "浙江省金华市义乌市童店二区9幢1号1楼",
                    "siteLocation": "{\"lng\":120.05690040670638,\"lat\":29.289246032107588}",
                    "createdAt": null,
                    "updatedAt": 1473302311000
                },
                "location": {
                    "lat": 29.289246,
                    "lng": 120.0569
                },
                "ticketAmount": 3804,
                "settlementCost": 231878.8,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 592,
                    "branchId": 20030917000215,
                    "branchName": "无锡工贸公司售后",
                    "siteCode": "HR080444",
                    "siteName": "姑苏区长城空调安装部",
                    "siteNameForShort": "苏州长城",
                    "siteAddress": "江苏省苏州市金阊区虎丘路昌华集团内",
                    "siteLocation": "{\"lng\":120.58560434223497,\"lat\":31.33389844552378}",
                    "createdAt": null,
                    "updatedAt": 1473302316000
                },
                "location": {
                    "lat": 31.333899,
                    "lng": 120.5856
                },
                "ticketAmount": 3791,
                "settlementCost": 249410.8,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 785,
                    "branchId": 20030917000264,
                    "branchName": "石家庄工贸公司售后",
                    "siteCode": "HR060563",
                    "siteName": "石家庄永起家电销售有限公司",
                    "siteNameForShort": "恒行家电",
                    "siteAddress": "河北省石家庄市长安区建明中路以北东二环以东梅迪雅居4-108",
                    "siteLocation": "{\"lng\":114.58558530647178,\"lat\":38.04692571513561}",
                    "createdAt": null,
                    "updatedAt": 1473302323000
                },
                "location": {
                    "lat": 38.046925,
                    "lng": 114.58559
                },
                "ticketAmount": 3756,
                "settlementCost": 155417,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1767,
                    "branchId": 20030917000463,
                    "branchName": "徐州工贸公司售后",
                    "siteCode": "HR160546XZ",
                    "siteName": "铜山区煦涵家电销售部",
                    "siteNameForShort": "铜山胜阳",
                    "siteAddress": "同山区三堡镇胜阳村",
                    "siteLocation": "{\"lng\":117.23720890065776,\"lat\":34.08167021294129}",
                    "createdAt": null,
                    "updatedAt": 1473302353000
                },
                "location": {
                    "lat": 34.08167,
                    "lng": 117.237206
                },
                "ticketAmount": 3734,
                "settlementCost": 153447.5,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 475,
                    "branchId": 20030917000697,
                    "branchName": "成都工贸公司售后",
                    "siteCode": "HR300119",
                    "siteName": "郫县科力家电维修有限公司",
                    "siteNameForShort": "郫县科力",
                    "siteAddress": "四川省成都市郫县南大德巷6-9号",
                    "siteLocation": "{\"lng\":103.88462503304832,\"lat\":30.839641883011012}",
                    "createdAt": null,
                    "updatedAt": 1473302313000
                },
                "location": {
                    "lat": 30.839642,
                    "lng": 103.88463
                },
                "ticketAmount": 3734,
                "settlementCost": 97371.4,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 4588,
                    "branchId": 20030917000313,
                    "branchName": "上海工贸公司售后",
                    "siteCode": "HR070399",
                    "siteName": "上海震坤科技有限公司",
                    "siteNameForShort": "上海震坤",
                    "siteAddress": "上海市浦东新区张江镇郭守敬路498号",
                    "siteLocation": "{\"lng\":121.60474935695727,\"lat\":31.2166506719721}",
                    "createdAt": null,
                    "updatedAt": 1473302441000
                },
                "location": {
                    "lat": 31.21665,
                    "lng": 121.60475
                },
                "ticketAmount": 3719,
                "settlementCost": 109440.2,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 68,
                    "branchId": 20030917000313,
                    "branchName": "上海工贸公司售后",
                    "siteCode": "HR070167",
                    "siteName": "上海青口商贸有限公司",
                    "siteNameForShort": "上海青口",
                    "siteAddress": "上海市浦东新区高科西路3012号（分部：闵行区龙茗路1597弄40号101室）",
                    "siteLocation": "{\"lng\":121.38802333239926,\"lat\":31.155824219261483}",
                    "createdAt": null,
                    "updatedAt": 1473302300000
                },
                "location": {
                    "lat": 31.155825,
                    "lng": 121.38802
                },
                "ticketAmount": 3713,
                "settlementCost": 127856.6,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 960,
                    "branchId": 20030917000579,
                    "branchName": "合肥工贸公司售后",
                    "siteCode": "HR170062",
                    "siteName": "阜阳市百盛电器有限公司",
                    "siteNameForShort": "阜阳市百盛",
                    "siteAddress": "安徽省阜阳市颖州区中清路200号",
                    "siteLocation": "{\"lng\":115.82521368827913,\"lat\":32.89011146051034}",
                    "createdAt": null,
                    "updatedAt": 1473302328000
                },
                "location": {
                    "lat": 32.89011,
                    "lng": 115.82521
                },
                "ticketAmount": 3706,
                "settlementCost": 146718.3,
                "monthOfYear": "2016-07"
            },
            {
                "auditMap": {
                    "id": 1449,
                    "branchId": 20030917000161,
                    "branchName": "厦门工贸公司售后",
                    "siteCode": "HR280189",
                    "siteName": "厦门苏宁云商销售有限公司",
                    "siteNameForShort": "厦门苏宁云商",
                    "siteAddress": "福建省厦门市思明区嘉禾路188-196号莲花大厦2-3层",
                    "siteLocation": "{\"lng\":118.13576160730159,\"lat\":24.494382671897327}",
                    "createdAt": null,
                    "updatedAt": 1473302343000
                },
                "location": {
                    "lat": 24.494383,
                    "lng": 118.135765
                },
                "ticketAmount": 3687,
                "settlementCost": 334023.5,
                "monthOfYear": "2016-07"
            }
        ],
        "settlementCostMapDtos": [
            {
                "auditMap": {
                    "id": 1276,
                    "branchId": 20030917000362,
                    "branchName": "青岛工贸公司售后",
                    "siteCode": "HR130304",
                    "siteName": "即墨市昊丰和电器安装服务部",
                    "siteNameForShort": "即墨昊丰和",
                    "siteAddress": "山东省即墨市开发区黄河三路11号",
                    "siteLocation": "{\"lng\":120.50090211678342,\"lat\":36.40986692223113}",
                    "createdAt": null,
                    "updatedAt": 1473302338000
                },
                "location": {
                    "lat": 36.409866,
                    "lng": 120.5009
                },
                "ticketAmount": 4751,
                "settlementCost": 219552.8,
                "monthOfYear": "2016-07"
            }
        ]
    },
    "error": null
}
/*
 * action 创建函数
 */

// 数据获取
export function initionRequest() {
  return {
    type: LOAD_DATA_INITIATION,
    receivedAt: Date.now()
  };
}
export function receiveGet(res) {
  return {
    type: RECEIVE_GENERAL_ANALYSIS,
    data: res,
    receivedAt: Date.now()
  };
}
// 错误处理: todo
export function receiveError(res) {
  return {
    type: LOAD_DATA_FAILURE,
    error: res
  };
}
// 数据处理 做的比较烂 todo: 后续优化
export function checkData(data) {
  const orignData = data;
  orignData.averageOperatingWarning = orignData.averageOperatingWarning || {
    amount: 0,
    name: '平均操作费用',
    rate: 0
  };
  orignData.averageSettlementWarning = orignData.averageSettlementWarning || {
    amount: 0,
    name: '平均结算费用',
    rate: 0
  };
  orignData.complainWarning = orignData.complainWarning || {
    amount: 0,
    name: '工单差评量',
    rate: 0
  };
  orignData.delayWarning = orignData.delayWarning || {
    amount: 0,
    name: '工单延误量',
    rate: 0
  };
  orignData.generalAnalyses = orignData.generalAnalyses || [];
  orignData.names = orignData.generalAnalyses.map((map) => {
    return map.productMapping;
  });
  orignData.settlementCost = orignData.generalAnalyses.map((map) => {
    return {
      name: map.productMapping,
      value: map.settlementCost
    };
  });
  orignData.ticketAmount = orignData.generalAnalyses.map((map) => {
    return {
      name: map.productMapping,
      value: map.ticketAmount
    };
  });

  return orignData;
}

// 查询数据
export function search(params) {
  return (dispatch) => {
    // 初始化查询
    dispatch(initionRequest());
    setTimeout(()=> {
        const data = checkData(DATA);
        dispatch(receiveGet(data));
    }, 2000);
    // return query('/api/general_analysis', params).then((response) => {
    //   if (response.result) {
    //     const data = checkData(response.result);
    //     dispatch(receiveGet(data));
    //   }
    // }, (error) => {
    //   Notification.open({
    //     type: 'warning',
    //     title: '获取数据失败',
    //     content: '未知错误'
    //   });
    //   dispatch(receiveError(error));
    // });
  };
}
