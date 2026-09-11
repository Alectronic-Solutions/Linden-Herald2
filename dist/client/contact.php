<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--
Site and custom code by Larry Made - http://www.larrymade.com

Layout by Free CSS Templates
http://www.freecsstemplates.org
Released for free under a Creative Commons Attribution 2.5 License

Name       : OffRecord 
Description: A two-column, fixed-width design for 1024x768 screen resolutions.
Version    : 1.0
Released   : 20100705

-->
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact Us</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <link href="style.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="refinements.css" rel="stylesheet" type="text/css" media="screen" />
    </head>
    <body>
        <!-- end #header-wrapper -->
        <header id="header">
            <div class="masthead-inner">
                <div id="logo">
                    <h1><a href="index.php">Linden Herald</a></h1>
                    <p><em>Serving Central California since 1959</em></p>
                </div>
                <p class="publication-note"><span>Linden, California</span><span>Published weekly</span></p>
            </div>
        </header>
        <nav id="menu" aria-label="Main navigation">
            <ul>
    			<li><a href="index.php" class="first">Home</a></li>
    			<li><a href="about.php">About</a></li>
    			<li><a href="subscribe.php">Subscribe</a></li>
    			<li><a href="advertise.php">Advertise</a></li>
    			<li class="current_page_item"><a aria-current="page" href="contact.php">Contact</a></li>
                <li><a href="archive.php">Archive</a></li>
    		</ul>
        </nav>
        <!-- end #header -->
        <hr />
        <div id="page" role="main">
        	<div id="page-bgtop">
        		<div id="content">
        			<div class="post">
        				<h2 class="title">Contact Linden Herald</h2>
        				<div class="entry">
                            <p>Please feel free to call us anytime for news tips, comments,
                                to place legal notices or to buy display advertising or
                                buy a subscription. We will answer the phone or return
                                calls as soon as we retum.</p>
        
                            <h2>Mail Address</h2>
                            <p>Our mailing address is<br />
                                <strong>PO Box 929<br />
                                    Linden CA 95236</strong></p>
        
                            <p>Our correspondents live and work in Linden and are available
                                at anytime,<br />Our phone number 24 hrs, seven days is
                                <strong><a href="tel:+12097728854">209-772-8854</a></strong>.</p>
                            <form action="contact.php" method="post">
                                <fieldset>
                                    <legend>Send a Message</legend>
                                    <div class="form-field">
                                        <label for="lhname">Name</label>
                                        <input type="text" name="lhname" id="lhname" maxlength="40" autocomplete="name" />
                                    </div>
                                    <div class="form-field">
                                        <label for="lhemail">Email</label>
                                        <input type="email" name="lhemail" id="lhemail" maxlength="60" autocomplete="email" />
                                    </div>
                                    <div class="form-field">
                                        <label for="lhphone">Phone (###-###-####)</label>
                                        <input type="tel" name="lhphone" id="lhphone" maxlength="20" autocomplete="tel" />
                                    </div>
                                    <div class="form-field">
                                        <label for="message4lh">Message</label>
                                        <textarea name="message4lh" id="message4lh" rows="8"></textarea>
                                    </div>
                                    <button type="submit">Submit Message</button>
                                </fieldset>
                            </form>
        				</div>
        			</div>
        		</div>
        		<!-- end #content -->
        		<div id="sidebar">
        			<figure class="newspaper">
                        <div class="newspaper-frame"><img src="images/lindenpg1.png" alt="Linden Herald newspaper front page" width="296" height="486" /></div>
                        <figcaption class="edition-caption">
                            <span>Our weekly newspaper</span>
                            <a href="archive.php">Browse the archive</a>
                        </figcaption>
                    </figure>
        		</div>
        		<!-- end #sidebar -->
        		<div class="layout-clear" aria-hidden="true">&nbsp;</div>
        	</div>
        	<!-- end #page -->
        </div>
        <footer id="footer">
            <div class="footer-inner">
                <div class="footer-identity">
                    <a class="footer-brand" href="index.php">Linden Herald</a>
                    <p class="footer-tagline">Serving San Joaquin County since 1959.</p>
                </div>
                <nav aria-label="Footer navigation">
                    <h2 class="footer-heading">The Herald</h2>
                    <ul class="footer-links">
                        <li><a href="about.php">About us</a></li>
                        <li><a href="subscribe.php">Subscribe</a></li>
                        <li><a href="advertise.php">Advertise</a></li>
                        <li><a href="archive.php">Archive</a></li>
                    </ul>
                </nav>
                <div class="footer-contact">
                    <h2 class="footer-heading">Get in touch</h2>
                    <address>PO Box 929<br />Linden, CA 95236</address>
                    <a class="footer-phone" href="tel:+12097728854">(209) 772-8854</a>
                    <p><a href="contact.php">Contact us</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Copyright 2026 Linden Herald</p>
                <a class="back-to-top" href="#header">Back to top</a>
            </div>
        </footer>
        <!-- end #footer -->
    </body>
</html>
