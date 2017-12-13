export class ContractForPurchase {
    id: number;
    username: string;
    email: string;
    password: string;
    password_hash: string;
    fullname: string;
    position: string;
    is_admin: boolean;
    active: boolean;
    permissions: number;
   
    // 交互用属性
    disabled: boolean;
    checked: boolean;

    // 设置默认值
    constructor() {
        this.disabled = false;
        this.checked = false;
       
    }
}
