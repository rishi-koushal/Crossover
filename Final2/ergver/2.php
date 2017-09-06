<!DOCTYPE html>
<html>
<head>
<style>
.dropbtn {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
 
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    background-color: #3e8e41;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: black;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover:not(.active) {
    background-color: grey;
}

.active {
    background-color: #4CAF50;
}
div.transbox {
    margin: 30px;
    background-color: #ffffff;
    border: 1px solid black;
    opacity: 0.6;
    filter: alpha(opacity=60); /* For IE8 and earlier */
    float:left;
}
.tooltip {
	display:none;
	position:absolute;
	border:1px solid #333;
	background-color:#161616;
	border-radius:5px;
	padding:10px;
	color:#fff;
	font-size:12px Arial;
}
</style>
<script type="text/javascript">
$(document).ready(function() {
// Tooltip only Text
$('.masterTooltip').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
}).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })
});
});
</script>

</head>
<body>

<body background="Surface_I_Wallpaper_by_sword1ne.resized.png">
<ul>
  <ul style="float:left;list-style-type:none;">
  	 <li><a href="#news"><font face="cursive">Home</font></a></li>
  	<li><a href="#news"><font face="cursive">News</font></a></li>
  	<li><a href="#contact"><font face="cursive">Contact</font></a></li>
  </ul>
  <ul style="float:right;list-style-type:none;">
      <li><a class="active" href="#about"><font face="cursive">About</font></a></li>
    <li><a href="#login"><font face="cursive">Login</font></a></li>
  </ul>
</ul>
<p><center><img src="C:\Users\WELCOME\Desktop\pic (2).png"></center></p>
<br><Br><p><font color="grey" face="cursive"><center>Welcome to Crossover-A Multi-Purpose Journal website!Its glad to receive your comments,posts,images of your journey in and around the world.Got any memories,valuable moments,tragedies,disappointments,Jaw dropping and all sort of heart touching situations? want to explore stuffs regarding anything? Come Checkout our arena for such experience! Be a member and try to get crossovered with other such people of your kind.The mic is on and we're all ears!</center></font></p>
</br></br>

<center><div class="dropdown">

  <a href="#" title="enter your name" class="masterTooltip">
  <button class="dropbtn">Name</button></a>
<div class="dropdown-content">
<form action="site2.php" method="post">
     <input type="text" placeholder="Enter your Name" name="text">
	<input type="submit" value="ok">
  
    
</div>
</div>
<div class="dropdown">
  <a href="#" title="enter your email id" class="masterTooltip">
  <span style="padding-left:48px;"><button class="dropbtn">Email</button></a></span>
<div class="dropdown-content">
 
     <input type="text" placeholder="Enter your Email id" name="mail">
	<input type="submit" value="ok">
  
</div>
</div>
<div class="dropdown">
  <a href="#" title="your views" class="masterTooltip">
  <span style="padding-left:48px;"><button class="dropbtn">Ideas</button></a></span>
<div class="dropdown-content">

     	<textarea name="message" rows="10" cols="30"placeholder="Text limit: 100 words" placeholder="Text limit: 100 words">
    </textarea>
	<input type="submit" value="post"> 
 </form>
  
</div>
</div>
<div class="dropdown">
  <a href="#" title="your views" class="masterTooltip">
  <span style="padding-left:48px;"><button class="dropbtn">Upload images</button></a></span>
<div class="dropdown-content">
<form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload" name="Upload">
</form>
</div>
</div>
</center>

</body>
</html>
