export class GodownentryForAcceptance {
    id: number;
    bno: string;
    supplier: string;
    cno: string;
    buyer: string;
    examiner: string;
    accountingstaff: string;
    audited: boolean;
    audit_time: string;
    audit_user: string;
    create_user: string;
    details: Array<GodownentryForAcceptanceDetail>;

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

export class GodownentryForAcceptanceDetail {
    id: number;
	oilname: string;
	planquantity: number;
	realquantity: number;
	price: number;
	totalprice: string;
	stockplace: number;
	comment: string;
}