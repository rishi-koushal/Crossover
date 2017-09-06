<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta charset="utf-8">

  <title>Cognit Register</title>
  
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.5.0.min.js"></script>
</head>

<body background="images1/41.JPG">
  
  
  
  
</body>
  
  <?php
  
  session_start();
  
  $H = $_POST['cn'];
  $I = $_POST['cc'];
  $L = $_POST['cm'];
  $N = $_POST['p'];
  $M = $_POST['pw'];
  $J = $_POST['dpt'];
  $K = $_POST['yr'];
  
  
  
  
  
  
  
  ?>
  
  
  
  
  
  
  <script type="text/javascript">
    
    
	Parse.initialize("bLXp0skvYB2YbBHZ8XNvkW8jjwAojqSu9dODR6a4", "MAjcOyS9oPw309T6SKoA8QImG93JboeW9Y5d6hDP");

	
    
	
	var TestObject = Parse.Object.extend("TestObject");
    var query = new Parse.Query(TestObject);
    
	
	var cg = 0;
	var cg1 = "cg";
	var A = " <?php echo $H ?>";
	var B = " <?php echo $I ?>";
	var C = " <?php echo $J ?>";
	var D = " <?php echo $K ?>";
	var E = " <?php echo $L ?>";
	var F = " <?php echo $M ?>";
	
	
	if(A == '' || B == '' || E == '' || F.length > 8)
	 {
		 alert("Registration Unsucessfull!!!");
		 window.location.href='Register.html';
	 }
	
	else
	{
		
		
		


var rejectList = [ "aol.com", "att.net", "comcast.net", "facebook.com", "gmail.com", "gmx.com", "googlemail.com", "google.com", "hotmail.com", "hotmail.co.uk", "mac.com", "me.com", "mail.com", "msn.com", "live.com", "sbcglobal.net", "verizon.net", "yahoo.com", "yahoo.co.uk", "email.com", "games.com" , "gmx.net", "hush.com", "hushmail.com", "inbox.com", "lavabit.com", "love.com" , "pobox.com", "rocketmail.com", "safe-mail.net", "wow.com" , "ygm.com" , "ymail.com" , "zoho.com", "fastmail.fm",


  "bellsouth.net", "charter.net", "cox.net", "earthlink.net", "juno.com",


  "btinternet.com", "virginmedia.com", "blueyonder.co.uk", "freeserve.co.uk", "live.co.uk",
  "ntlworld.com", "o2.co.uk", "orange.net", "sky.com", "talktalk.co.uk", "tiscali.co.uk",
  "virgin.net", "wanadoo.co.uk", "bt.com",


  "sina.com", "qq.com", "naver.com", "hanmail.net", "daum.net", "nate.com", "yahoo.co.jp", "yahoo.co.kr", "yahoo.co.id", "yahoo.co.in", "yahoo.com.sg", "yahoo.com.ph",

  "hotmail.fr", "live.fr", "laposte.net", "yahoo.fr", "wanadoo.fr", "orange.fr", "gmx.fr", "sfr.fr", "neuf.fr", "free.fr",


  "gmx.de", "hotmail.de", "live.de", "online.de", "t-online.de" /* T-Mobile */, "web.de", "yahoo.de",

  "mail.ru", "rambler.ru", "yandex.ru", "ya.ru", "list.ru",


  "hotmail.be", "live.be", "skynet.be", "voo.be", "tvcablenet.be", "telenet.be",


  "hotmail.com.ar", "live.com.ar", "yahoo.com.ar", "fibertel.com.ar", "speedy.com.ar", "arnet.com.ar",


  "hotmail.com", "gmail.com", "yahoo.com.mx", "live.com.mx", "yahoo.com", "hotmail.es", "live.com", "hotmail.com.mx", "prodigy.net.mx", "msn.com"
 ];
var emailValue = E;
var splitArray = emailValue.split('@'); 

if(rejectList.indexOf(splitArray[1]) >= 0)
{
 

		
          query.equalTo("Exceeds", 200);		
    		
		
	query.find({
  success: function(results) {Parse.initialize("bLXp0skvYB2YbBHZ8XNvkW8jjwAojqSu9dODR6a4", "MAjcOyS9oPw309T6SKoA8QImG93JboeW9Y5d6hDP");

	var TestObject = Parse.Object.extend("TestObject");
    var query2 = new Parse.Query(TestObject);
    query2.equalTo("Name",E);
   query2.find({
   success: function(results2) {
          if(results2.length > 0 )
	   {
		   alert(" Registration Unsucessfull! "+ "\n" +" The Mail id " + E + " is already registered! ");
		   window.location.href='Register.html';
	   }
  
      else
	   {
		   Parse.initialize("bLXp0skvYB2YbBHZ8XNvkW8jjwAojqSu9dODR6a4", "MAjcOyS9oPw309T6SKoA8QImG93JboeW9Y5d6hDP");

	 var TestObject = Parse.Object.extend("TestObject");
     var i = results.length;
	  cg = i + 1200;
	  cg1 = cg1 + cg ;
       var testObject = new TestObject();

        
		 testObject.set("Name",A);
		 testObject.set("College",B);
	
	     testObject.set("Course",D);
	     testObject.set("Email",E);

                      
      testObject.save({
      success: function(object) {
        $(".success").show();
		
		alert("Thank You For Registering");
		window.location.href='Register.html';
		
      },
      error: function(model, error) {
		  
        $(".error").show();
		alert(" Error Occured! " + "\n" + " Registration Unsucessfull!!! ");
		window.location.href='Register.html';
      }
	  
	  
	  
    });	   
	   
	   }
  
  
  },
  error: function(error) {
    alert(" Error Occured! " + "\n" + " Registration Unsucessfull!!! ");
		window.location.href='Register.html';
  }
});
	
	
	
},
  error: function(error) {
    alert(" Error Occured! " + "\n" + " Registration Unsucessfull!!! ");
		window.location.href='Register.html';
  }
  
});
	

	
	
	
}
else
{

         alert("Invalid Mail id!");
		 window.location.href='Register.html';

}
	
	
	
	
	
	
	}
</script>













































</html>

