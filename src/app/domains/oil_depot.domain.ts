export class OilDepot {
    id: number;
    depotname: string; //仓库名称
    oilname: string;  //油品名称
    depotiddr: string;  //仓库地址
    kind: string;  //油品类型  
    number: number; //数量

    // 交互用属性
    disabled: boolean;
    checked: boolean;

    // 设置默认值
    constructor() {
        this.disabled = false;
        this.checked = false;
       
    }
}
