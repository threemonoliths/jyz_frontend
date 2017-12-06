export class DispatchForPurchase {
    id: number;
    billno: string;
    date: string;
    purchaser: string;
    stockplace: string;
    quantity: number;
    total: number;
    dispatcher: string;
    stockman: string;
    accountingclerk: string;
    audited: boolean;
    audit_time: string;
    audit_user: string;
    create_user: string;
    details: Array<DispatchForPurchaseDetail>;

    // 交互用属性
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

export class DispatchForPurchaseDetail {
    id: number;
	oilname: string;
	unit: string;
	startdegree: number;
	enddegree: number;
	quantity: number;
	confirmation: string;
	
}