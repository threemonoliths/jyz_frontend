import * as moment from 'moment';

/**
 * 检查是否有真值
 */
export function isTruth(value: any): boolean {
    return typeof value !== 'undefined' && value !== false;
}

/**
 * // TODO: 转化成RMB元字符串
 * @example 100 =>
 */
export function yuan(value: any): string {
    return `&yen ${value}`;
}

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(
                moment(
                    `${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`
                ).valueOf() - 1000
            )
        ];
    }

    if (type === 'year') {
        const year = now.getFullYear();

        return [
            moment(`${year}-01-01 00:00:00`),
            moment(`${year}-12-31 23:59:59`)
        ];
    }
}


//获取对象在对象数组中的索引
export function deepIndexOf(arr, obj) {
    return arr.findIndex(function (cur) {
      return Object.keys(obj).every(function (key) {
        return obj[key] === cur[key];
      });
    });
}

//日期转字符串
export function dateToString(date) {
    let m = ((date.getMonth())+1).toString()
    if (m.length == 1) { m = '0' + m}
    let d = date.getDate().toString()
    if (d.length == 1) { d = '0' + d}
    return date.getFullYear().toString()+'-'+m+'-'+d
}

//字符串转日期
export function stringToDate(str) {
    return new Date(str) 
}

