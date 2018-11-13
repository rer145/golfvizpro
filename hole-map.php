<!DOCTYPE html>
<html lang="en">
    <head>
      <?php include_once "inc/head.php"; ?>
      <title>PGA Tour Hole Map - GolfViz Pro</title>
     </head>
      <body>
        <div class="container">
          <?php include_once "inc/header.php"; ?>

          <h2>PGA Tour Hole Map</h2>

          <section class="instructions">
            <p>Select a tournament and hole to show a plot of every shot on the hole. The different colors represent locations, which can then be used to visualize the map of the hole.</p>
          </section>

          <section class="viz">
            <p>
              <strong>Tournament: </strong><br />
              <span id="tournament-list"></span>
            </p>
            <p>
              <strong>Hole #: </strong><br />
              <span id="hole-list"></span>
            </p>
            <div id="plot"></div>
          </section>

          <section class="description">
            
          </section>

          <?php include_once "inc/footer.php"; ?>
        </div>        
        
        <?php include_once "inc/footer-js.php"; ?>
        <script type="text/javascript" src="js/hole-map.js"></script>
    </body>
</html>