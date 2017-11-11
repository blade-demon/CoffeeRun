(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    var DELAY = 700,
        clicks = 0,
        timer = null;

    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    CheckList.prototype.addRow = function(coffeeOrder) {
        // 删除匹配相应电子邮箱地址的已有行
        this.removeRow(coffeeOrder.emailAddress);

        // 创建一个新的ROW的实例
        var rowElement = new Row(coffeeOrder);

        // 把新实例的$element属性添加到清单
        this.$element.append(rowElement.$element);
    }

    CheckList.prototype.removeRow = function(email) {
        this.$element.find('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
    }

    // 置灰该行
    CheckList.prototype.greyRow = function(email) {
        this.$element.find('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').css("background", "grey");
    }

    // 单击事件
    CheckList.prototype.addClickHandler = function(fn) {
        this.$element.on('click', 'input', function(event) {
            clicks++; //count clicks
            if (clicks === 1) {
                var email = event.target.value;
                this.greyRow(email);

                timer = setTimeout(function() {
                    //after action performed, reset counter
                    clicks = 0;
                    // 1s后完成订单，删除该行
                    setTimeout(function() {
                        this.removeRow(email);
                        fn(email);
                    }.bind(this), 1000);
                }.bind(this), DELAY);
            } else {
                //阻止单击事件
                clearTimeout(timer);
                clicks = 0; //after action performed, reset counter


            }
        }.bind(this));
    }

    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });
        var $label = $('<label></label>');
        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });
        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);