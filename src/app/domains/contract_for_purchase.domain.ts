export class ContractForPurchase {
    id: number;
    cno: string;
    date: string;
    location: string;
    amount: number;
    partya: number;
    partyb: string;
    audited: boolean;
    audit_time: string;
    audit_user: string;
    create_user: string;
    details: Array<ContractForPurchaseDetail>;

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

export class ContractForPurchaseDetail {
    id: number;
	product: string;
	model: string;
	producer: string;
	amount: number;
	unit: string;
	price: number;
	totalprice: number;
}