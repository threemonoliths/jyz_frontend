export class MeteringForReturn {
    id: number;
    billno: string;
    billdate: string;
    stockman: string;
    accountingclerk: string;
    audited: boolean;
    audit_time: string;
    audit_user: string;
    create_user: string;
    comment: string;
    details: Array<MeteringForReturnDetail>;

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

export class MeteringForReturnDetail {
    id: number;
	wagonno: string;
	cardno: string;
	oilname: string;
	unit: string;
	quantity: number;
	stockplace: number;
	comment: number;
}