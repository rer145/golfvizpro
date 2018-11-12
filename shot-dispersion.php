<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include_once "inc/head.php"; ?>
        <title>PGA Tour Shot Dispersion - GolfViz Pro</title>
      </head>
      <body>
        <div class="container">
          <?php include_once "inc/header.php"; ?>

          <h2>PGA Tour Shot Dispersion</h2>

          <section class="viz">
              <div id="plot"></div>
          </section>

          <section class="description">
            <p></p>
          </section>

          <?php include_once "inc/footer.php"; ?>
        </div>        
        
        <?php include_once "inc/footer-js.php"; ?>
        <script type="text/javascript" src="js/shot-dispersion.js"></script>
    </body>
</html>