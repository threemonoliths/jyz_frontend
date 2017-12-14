export class UserManagement {
    id: number;
    username: string;
    email: string;
    fullname: string;
    position: string;
    is_admin: boolean;
    active: boolean;
    permissions: number;
    avatar :string;
   
    // 交互用属性
    disabled: boolean;
    checked: boolean;

    // 设置默认值
    constructor() {
        this.disabled = false;
        this.checked = false;
       
    }
}
