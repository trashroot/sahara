const mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'sahara',
    typeCast: function castField( field, next ) {

		// We only want to cast bit fields that have a single-bit in them. If the field
		// has more than one bit, then we cannot assume it is supposed to be a Boolean.
		if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {

			var bytes = field.buffer();
            if(bytes === null){
                return 0;    
            }
			// A Buffer in Node represents a collection of 8-bit unsigned integers.
			// Therefore, our single "bit field" comes back as the bits '0000 0001',
			// which is equivalent to the number 1.
			return( bytes[ 0 ] === 1 );
		}
		return( next() );
	}
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports.db = connection;
