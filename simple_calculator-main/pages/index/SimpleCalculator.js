class SimpleCalculator {
    operator = [];
    digit = [];

    startCalc(str = "") {
        let formatStr = this.readStr(this.pretreatmentStr(str));
        formatStr.forEach((s) => {
            if (s === "+" || s === "-" || s === "*" || s === "/" || s === "%") {
                this.priority(s);
                this.operator.push(s);
            } else {
                this.digit.push(parseFloat(s));
            }
        })
        while (this.operator.length !== 0) {
            let c = this.operator.pop();
            let b = this.digit.pop();
            let a = this.digit.pop();
            this.digit.push(this.calc(a - 0, c, b - 0));
        }
        return this.digit.pop();
    }

    // 对传入进来的字符串进行预处理，也就是消除字符串中的非运算符
    // 因为有一些字符只是用于显示的，并不是计算使用的，假如
    // 增加了开根号的运算，这个时候就需要将显示的根号换成方便处理的根号
    // 当然我们这里没有根号，主要处理的就是运算符
    pretreatmentStr(str = "") {
        let tempStr = ""
        for (let i = 0; i < str.length; ++ i) {
            let ch = str.charAt(i)
            if (ch === '−') {
                tempStr += '-'
            } else if (ch === '×') {
                tempStr += '*'
            } else if (ch === '÷') {
                tempStr += '/'
            } else {
                tempStr += ch
            }
        }
        return tempStr
    }

    // 需要递归看优先级，直到优先级当前低或者只剩下自己
    priority(s = "") {
        if (this.operator.length !== 0) {
            // 读取栈中的符号位
            let c = this.operator.pop();
            // 得到对应的运算优先级
            let cG = this.operationGrade(c);
            let sG = this.operationGrade(s);
            // 这里主要是体现两点，第一是优先级，第二是从左往右的规则
            if (cG >= sG) {
                // 由于栈的特性，所以先出来的操作数
                // 后出来的才是被操作数
                let b = this.digit.pop();
                let a = this.digit.pop();
                this.digit.push(this.calc(a - 0, c, b - 0));
                // 继续跟栈中的下一个符号进行比较
                this.priority(s);
            } else {
                this.operator.push(c);
            }
        }
    }

    // 阅读字符串进而进行分类存放
    readStr(str = "") {
        let formatStr = [];
        let i = 0;
        while(i < str.length) {
            switch (str.charAt(i)) {
                case '0':case '1':
                case '2':case '3':
                case '4':case '5':
                case '6':case '7':
                case '8':case '9':
                case '.':
                    let digit = this.readDigit(str, i)
                    i = i + digit.length
                    formatStr.push(digit)
                    break
                case '+':case '-':
                    let sign = this.readAddOrSub(str, i)
                    i += sign.length
                    formatStr.push(sign)
                    break
                case '*':case '/':case '%':
                    formatStr.push(str.charAt(i))
                default:
                    ++i
            }
        }
        return formatStr;
    }

    // 处理优先级为 1 的情况
    readDigit(str = "", startIndex = 0) {
        let ch = str.charAt(startIndex)
        if (!this.isDigit(ch) && ch != '.') {
            return ""
        }
        return ch + this.readDigit(str, startIndex + 1)
    }
    // 读取正负号，加减运算符
    readAddOrSub(str = "", startIndex = 0) {
        let currentCh = str.charAt(startIndex)
        // 判断前一个是不是数字，不是数字的话就代表是符号位，而不是运算符
        if (!this.isDigit(str.charAt(startIndex - 1))) {
            // 如果是非数字，那么需要加上刚才的符号位
            return currentCh + this.readDigit(str, startIndex + 1)
        }
        return currentCh
    }

    // 获取操作符号的优先级
    operationGrade(ope = "") {
        switch (ope) {
            case "+":
            case "-":
                return 1;
            case "*":
            case "/":
            case "%":
                return 2;
            default:
                return 0;
        }
    }

    // 根据运算符进行计算
    calc(a = 0, ope = "", b = 0) {
        switch (ope) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            case "%":
                return a % b;
            default:
                return 0;
        }
    }
    
    // 判断是不是数字
    isDigit(ch = '') {
        return ch >= '0' && ch <= '9'
    }
    
}

module.exports = {
    SimpleCalculator
}
  