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
            <p>Select a tournament and hole to show a plot of every shot on the hole. The different colors represent locations, which can then be used to visualize the map of the hole. This visualization currently only displays holes from TPC Sawgrass, home of the PLAYERS Championship.</p>
            <p>The actual hole map provided by PGA Tour appears below the visualization.</p>
          </section>

          <section class="viz">
            <p>
              <strong>Tournament: </strong><br />
              <span id="tournament-list"></span>
              The PLAYERS Championship - TPC Sawgrass
            </p>
            <p>
              <strong>Hole #: </strong><br />
              <span id="hole-list"></span>
              <select name="holes" id="holes">
                <option value="">-- Choose a Hole --</option>
                <option value="1">Hole #1</option>
                <option value="2">Hole #2</option>
                <option value="3">Hole #3</option>
                <option value="4">Hole #4</option>
                <option value="5">Hole #5</option>
                <option value="6">Hole #6</option>
                <option value="7">Hole #7</option>
                <option value="8">Hole #8</option>
                <option value="9">Hole #9</option>
                <option value="10">Hole #10</option>
                <option value="11">Hole #11</option>
                <option value="12">Hole #12</option>
                <option value="13">Hole #13</option>
                <option value="14">Hole #14</option>
                <option value="15">Hole #15</option>
                <option value="16">Hole #16</option>
                <option value="17">Hole #17</option>
                <option value="18">Hole #18</option>
              </select>
            </p>
            <p>
              <strong>Generated Shot Map:</strong><br />
              <div id="plot"></div>
            </p>
            <p>
              <strong>Actual Hole Map:</strong><br />
              <img id="actual-hole" src="images/holes/hole-1.jpg" alt="Actual Hole Diagram" width="650" height="295" />
            </p>
          </section>

          <section class="description">
            
          </section>

          <?php include_once "inc/footer.php"; ?>
        </div>        
        
        <?php include_once "inc/footer-js.php"; ?>
        <script type="text/javascript" src="js/hole-map.js"></script>
    </body>
</html>