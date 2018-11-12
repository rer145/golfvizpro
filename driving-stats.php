<!DOCTYPE html>
<html lang="en">
    <head>
      <?php include_once "inc/head.php"; ?>
      <title>PGA Tour Driving Stats - GolfViz Pro</title>
     </head>
      <body>
        <div class="container">
          <?php include_once "inc/header.php"; ?>

          <h2>PGA Tour Driving Stats</h2>

          <section class="instructions">
            <p>Select a tournament from the list below to see the average driving distance compared to driving accuracy for the tournament.  Data is from the 2018 PGA Tour season. </p>
          </section>

          <section class="viz">
            <p>
              <strong>Tournament: </strong><br />
              <span id="tournament-list"></span>
            </p>
            <div id="plot"></div>
          </section>

          <section class="description">
            <p>This visualization shows a the relationship between driving distance and driving accuracy. The common thinking is that longer shots increase the chance of it being less accurate. The lucky few who can drive the ball long and stay accurate have a strong advantage.</p>
            <p>Cycling through the courses, you can see how some courses tend to have longer drives with lower accuracy (e.g. the World Golf Championships-Bridgestone Invitational), but others have higher accuracy and shorter drives (e.g. the AT&T Pebble Beach Pro-Am). This comes down to the course architecture. Firestone Country Club (where the WGC-Bridgestone is played at) is known to be a very long course with narrow fairways. Pebble Beach hosts the AT&T Pro-Am and is known to be a wider course, compared to Firestone.</p>
            <p>This visualization can help understand the correlation between two variables (in this case distance and accuracy), while also looking at the different course being played. Knowing this correlation is useful when making predictions for the variables when you know which course or tournament is being played.</p>
          </section>

          <?php include_once "inc/footer.php"; ?>
        </div>        
        
        <?php include_once "inc/footer-js.php"; ?>
        <script type="text/javascript" src="js/driving-stats.js"></script>
    </body>
</html>