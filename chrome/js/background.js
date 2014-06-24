/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */

function jd() {
    var books = [],
        count = 0,
        total = 0;

    $.each([2, 3, 4], function(i, page) {
        var $content = $('<div></div>');
        $content.load('http://order.jd.com/center/list.action?d=0&s=4096&page=' + page + ' .tb-void', function() {
            total += $content.find('.img-box').length;

            $content.find('.img-box').each(function() {
                var buy_time = $(this).parents('tr').find('.ftx-03').text().substring(0, 10),
                    $item = $('<div></div>');

                $item.load($(this).attr('href') + ' #product-intro', function() {
                    count++;
                    if ($item.find('#summary-isbn').length) {
                        var book = {
                            title: $.trim($item.find('#name h1').text()),
                            isbn: $.trim($item.find('#summary-isbn .dd').text()),
                            buy_time: buy_time
                        };
                        books.push(book);
                        if (count === total) {
                            console.log(JSON.stringify(books));
                        }
                    }
                });
            });
        });
    });
}

function amazon() {
    var books = [],
        count = 0,
        total = 0;

    $.each([2011, 2012, 2013, 2014], function(i, year) {
        var $content = $('<div></div>');
        $content.load('https://www.amazon.cn/gp/css/order-history?orderFilter=year-' + year + ' #cs-orders', function() {
            total += $content.find('.image-box').length;
            $content.find('.image-box').each(function() {
                var title = $.trim($(this).next().text()),
                    buy_time = $.trim($(this).parents('.action-box').find('h2').text()).split(' ')[0],
                    $item = $('<div></div>');

                $item.load($(this).parent().attr('href') + ' #detail_bullets_id', function() {
                    count++;
                    var $li = $item.find('li:contains("ISBN:")');
                    if ($li.length) {
                        var book = {
                            title: title,
                            isbn: $.trim($li.text()),
                            buy_time: buy_time
                        };
                        books.push(book);
                        if (count === total) {
                            console.log(JSON.stringify(books));
                        }
                    }
                });
            });
        });
    })
}

jd();
amazon();
