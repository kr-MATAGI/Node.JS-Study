var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookSchema = new schema({
    titile : String,
    author : String,
    published_data : { type: Date, default: Date.now }
});

/**
 * model은 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는 프로그래밍 인터페이스를 정의.
 * 첫 번째 인자 book = document가 사용할 collection의 단수적 표현.
 * 자동으로 단수적 표현을 복수적(plural) 형태로 변환하여 그걸 collection 이름으로 사용 
 */
module.exports = mongoose.model('book', bookSchema);

/**
 * Schema Type
 * 1. String
 * 2. Number
 * 3. Date
 * 4. Buffer
 * 5. Boolean
 * 6. Mixed
 * 7. Objectid
 * 8. Array
 */