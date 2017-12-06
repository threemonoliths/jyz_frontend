export class Dict {
    id: number;
    code: string;
    name: string;
    key: string;
    parm: string;
    value: number;
    seq: string;
    // 交互用属性
    disabled: boolean;
    checked: boolean;

    // 设置默认值
    constructor() {
        this.disabled = false;
        this.checked = false;
    }
}