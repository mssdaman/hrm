// modules =================================================
var express        = require('express');
var app            = express();
//var mysql       = require('mysql');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

/*MySql connection*/
var connection = require('express-myconnection'),
mysql = require('mysql');
app.use(
connection(mysql,{
host : 'localhost',
user : 'root',
password : '',
database : 'hrm',
debug : true //set true if you wanna see debug logger
},'request')
);


var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

		

		req.getConnection(function(err,conn){
			if (err) return next("Cannot Connect");
				 var query = conn.query('SELECT * FROM documentation',function(err,rows){
				if(err){
				console.log(err);
				return next("Mysql error, check your query");
				}
				res.json(rows);
				});	
		});
     
});
router.get('/list', function(req, res) {

		

		req.getConnection(function(err,conn){
			if (err) return next("Cannot Connect");
				 var query = conn.query('SELECT * FROM employee',function(err,rows){
				if(err){
				console.log(err);
				return next("Mysql error, check your query");
				}
				res.json(rows);
				});	
		});
     
});



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/employee/:id', function(req, res) {

		var employee_id=req.params.id;
		console.log(employee_id);

		req.getConnection(function(err,conn){
			if (err) return next("Cannot Connect");
				 var query = conn.query('SELECT * FROM documentation WHERE employee_id = ?',[employee_id],function(err,rows){
				if(err){
				console.log(err);
				return next("Mysql error, check your query");
				}
				res.json(rows[0]);
				});	
		});
    
});

//update the values of employeee
router.post('/update/', function(req, res) {

			   var data = {
		         	  employee_id:req.body.employee_id,
		        	  employee_name:req.body.employee_name,
			   		  pending_section:req.body.pending_section,
			    	  status:req.body.status,
			          hr:req.body.hr,
			          hr_document:req.body.documentation,
			          rbd:req.body.rbd,
				      network:req.body.network
	       };

	          req.getConnection(function (err, conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("UPDATE documentation set ? WHERE employee_id = ? ",[data,req.body.employee_id], function(err, rows){

           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

          res.json(rows);

        });

     });

		
            //res.json({ message: data });   
});


//initiate joining
router.post('/initiatejoining/', function(req, res) { 

				
				var data = {
		        employee_id:req.body.employee_id,
		        employee_name:req.body.employee_name,
				pending_section:'hr-documentation-rbd-network',
				status:'pending',
		        hr:'{"reponsibleperson":101,"updated_employee":0,"Added_to_Address_Book":0,"Added_to_Biometric":0,"MSS_Team_Folder":0}',
		        hr_document:'{"docresponsible":102,"Offer_Letter":0,"Qualification":0,"ID_Proof":0,"Experience":0,"Address_Proof":0,"Medical":0,"Date_of_Birth":0,"Bank":0,"Training_Certificate":0,"Joining":0,"Salary_Slips":0,"Code_of_Conduct":0,"Passport_size":0,"Employee_Agreement":0,"Acknowledgement":0}',
		        rbd:'{"rrbdresponsible":103,"Create_Biddle":0,"Cover_Letter":0,"Google":0}',
		        network:'{"netresponsible":104,"Added_static":0,"Gmail_Id":0,"Created_Skype":0,"Redmine":0,"Bitbucket":0,"Git":0,"Dropbox":0,"Local_Database":0,"Local_ftp":0}'
		     };
			console.log (req.body);
			 req.getConnection(function (err, conn){
		
        if (err) return next("Cannot Connect");

        //check the employee data is already exists or not?

         var query = conn.query('SELECT employee_id FROM documentation WHERE employee_id = ?',[data.employee_id],function(err,rows){
         						// user where condition
           if(err){
		   
                console.log(err);
                return next("Mysql error, check your query");
           }
          	
          	if(rows.length>0){
          			  res.json(rows[0].employee_id);          	}
          	else
          	{
          		 var query = conn.query("INSERT INTO documentation set ? ",data, function(err, rows){
		           if(err){
		                console.log(err);
		                return next("Mysql error, check your query");
		           }
		          res.json(rows.insertId);
		        });
          	}
		 });

 });
});

    

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 		// expose app