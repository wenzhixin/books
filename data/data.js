/**
 * @author Zhixin Wen<wenzhixin2010@gmail.com>
 */

'use strict';

var fs = require('fs'),
    request = require('request'),
    books = require('./books.json'),
    results = [],
    count = 0;

books.forEach(function(book) {
    if (book.update) {
        checkOK(book);
        return;
    }
    console.log('Update', book.title, 'start...');

    request('https://api.douban.com/v2/book/isbn/' + book.isbn, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            console.log('Update', book.title, 'error...', error || response.statusCode);
            checkOK(book);
        } else {
            var b = JSON.parse(body);
            b.update = true;
            b.isbn = book.isbn;
            b.buy_time = book.buy_time;
            b.count = book.count || 1;
            console.log('Update', book.title, 'OK...');
            checkOK(b);
        }
    });
});

function checkOK(book) {
    results.push(book);
    count++;
    if (count === books.length) {
        results = results.sort(function(a, b) {
            if (a.buy_time < b.buy_time) {
                return 1;
            }
            if (a.buy_time > b.buy_time) {
                return -1;
            }
            return 0;
        });
        fs.writeFile('./books.json', JSON.stringify(results));
        console.log('Update all OK...');
    }
}
