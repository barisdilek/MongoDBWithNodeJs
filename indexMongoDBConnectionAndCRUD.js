// Create / Insert
const insertDocuments = function(db, callback) {
	// Collection has get from db object. 
	const collection = db.collection('Employees');
	
	// Multi adding in Collection 
	collection.insertMany([
		{ Id: 1, FirstName: 'Adam', LastName: 'Müller', Old: 25 },
		{ Id: 2, FirstName: 'Jan', LastName: 'Kurt', Old: 30 },
		{ Id: 3, FirstName: 'Denis', LastName: 'Schmit', Old: 22 }
	], function(err, result) {
		if(err) throw err;
		
		console.log("3 documents have been added to the collection.");
		
		callback(result);
	});
};

// Update
const updateDocument = function(db, id, _old, callback) {
	// Collection has get from db object. 
	const collection = db.collection('Employees');
	
	// With id parameter, the record to be updated is found, then the desired field is updated.
	collection.updateOne({ Id: id }, { $set: { Old: _old }},
	function(err, result) {
		if(err) throw err;
		
		console.log("The age of the record with %d id has been updated.",id);
		
		callback(result);
	});
};

// Delete
const deleteDocument = function(db, id, callback) {
	// Collection has get from db object. 
	const collection = db.collection('Employees');
	
	// Deletion is done through the id field.
	collection.deleteOne({ Id: id }, function(err, result) {
		if(err) throw err;
		
		console.log("The record with id %s has been deleted.", id);
		
		callback(result);
	});
};

// Read / Search
const findDocuments = function(db, id, callback) {
	// Collection has get from db object. 
	const collection = db.collection('Employees');
	
	// To search the record with id id: collection.find({ id: id})
	// You can use it as collection.find({}) to list all records.
    // https://docs.mongodb.com/manual/tutorial/query-documents/
	collection.find({Id:id}).toArray(function(err, docs) {
		if(err) throw err;
		
		console.log("The following records were found;");
		
		console.log(docs);
		
		callback(docs);
	});

    //.toArray(function(err, docs) {callback(docs);});
};

// Create MongoDB Client 
const MongoClient = require('mongodb').MongoClient; 

// MongoDB server address 
const mongoDbServer = 'mongodb://127.0.0.1:27017';

// Database name
const dbName = 'FirstDatabase';

// Connection to server 
MongoClient.connect(mongoDbServer, function(err, client) {
    if(err) throw err;
    const db = client.db(dbName);

    console.log("Connection to mongoDB successfully established."); 

    //client.close();

    insertDocuments(db, function() {
		updateDocument(db,1,23, function() {
			deleteDocument(db,3, function() {
				findDocuments(db,2, function() {
					client.close();
				});
			});
		});
	});

});
