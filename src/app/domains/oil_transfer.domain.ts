// export class OilTransfer {
//     id: number;
//     billno:     string;      //调拨单号
//     date:       string;      //日期
//     stockplace: string;       //移出罐（车）号
//     dispatcher: string;       //调度
//     stockman:   string;       //保管员
//     checker:    string;       //核算员 
//     create_user:string;       //录入人
//     audit_user: string;       //审核人
//     audited:    boolean;      //审核状态
//     audit_time: string;       //审核时间
//     details: Array<OilTransferDetail>;

//     // 交互用属性
//     disabled: boolean;
//     checked: boolean;

//     // 设置默认值
//     constructor() {
//         this.disabled = false;
//         this.checked = false;
//         this.details = [];
//     }
// }

// export class OilTransferDetail {
//     id: number;
// 	product: string;
// 	model: string;
// 	producer: string;
// 	amount: number;
// 	unit: string;
// 	price: number;
// 	totalprice: number;
// }