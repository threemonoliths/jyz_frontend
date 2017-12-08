export class OilTransfer {
    id: number;
    billno:     string;      //调拨单号
    date:       string;      //日期
    stockplace: string;       //移出罐（车）号
    dispatcher: string;       //调度
    stockman:   string;       //保管员
    checker:    string;       //核算员 
    create_user:string;       //录入人
    audit_user: string;       //审核人
    audited:    boolean;      //审核状态
    audit_time: string;       //审核时间
    details: Array<OilTransferDetail>;

    // 交互用属性
    disabled: boolean;
    checked: boolean;

    // 设置默认值
    constructor() {
        this.disabled = false;
        this.checked = false;
        this.details = [];
    }
}

export class OilTransferDetail {
    id: number;
    Billno: string;  //调拨单号
    Stockpalce: string; //移入车号
    Unit: string;    //计量单位
    Startdegree: number;  //泵码起数
    Enddegree: number;  //泵码止数
    Quantity: number;  //数量
    Confirmation: string; //确认人
	
}