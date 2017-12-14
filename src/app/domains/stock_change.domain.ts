export class StockChange {
    id: number;
    cno: string;       //单号
    date: string;      //计算时间
    model: string;     //型号
    amount: number;    //数量
    warehouse: string; //仓库
    type: string;      //出入库类型
    calculated: boolean; //true：已计算，false：未计算a
    cal_status: boolean;//计算状态
   

    // 交互用属性
    disabled: boolean;
    checked: boolean;

    // 设置默认值
    constructor() {
        this.disabled = false;
        this.checked = false;
       
    }
}
