export class CarryForAccount {
    id: number;
    companyname: string;
    date: string;
    responsibleperson: string;
    operator: string;
    audited: boolean;
    audit_time: string;
    audit_user: string;
    create_user: string;
    details: Array<CarryForAccountDetail>;

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

export class CarryForAccountDetail {
    id: number;
	stockcompany: string;
	variety: string;
	lastt: number;
	lastl: number;
	stockt: number;
	stockl: number;
    monthpickupt: number;
    monthpickupl: number;
    monthstockt: number;
    monthstockl: number;
}