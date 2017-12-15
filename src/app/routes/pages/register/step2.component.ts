import { Component } from '@angular/core';
import { TransferService } from './transfer.service';

@Component({
    selector: 'app-step2',
    template: `
    <div class="icon pt-md"><i class="anticon anticon-check-circle text-success icon-lg"></i></div>
    <h1 class="h2 pt-md">注册成功</h1>
    <div class="border-top-1 mt-lg px-lg text-grey-dark">
    <h3 class="h3 my-md">说明</h3>

    <p class="mb-sm">请联系系统管理员激活用户，之后才能使用该账号登录。</p>

</div>
    
    `
})
export class Step2Component {
    constructor(public item: TransferService) {}
}