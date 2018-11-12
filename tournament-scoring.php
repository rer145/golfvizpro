<!DOCTYPE html>
<html lang="en">
    <head>
      <?php include_once "inc/head.php"; ?>
      <title>PGA Tour Tournament Scoring - GolfViz Pro</title>
     </head>
      <body>
        <div class="container">
          <?php include_once "inc/header.php"; ?>

          <h2>PGA Tour Tournament Scoring</h2>

          <section class="instructions">
            <p>Select a tournament from the list below to see the distribution of scores for each round of the tournament. Excluded from the list are match play events and team events. Data is from the 2018 PGA Tour season.</p>
          </section>

          <section class="viz">
            <p>
              <strong>Tournament: </strong><br />
              <span id="tournament-list"></span>
            </p>
            <div id="plot"></div>
          </section>

          <section class="description">
            <p>This visualization shows a breakdown of the scores for a tournament using a boxplot. A boxplot is a standardized way of displaying the distribution of data based on a five number summary (the minimum, first quartile, median, third quartile, and maximum). It's a good way to visualize outliers in your data.</p>
            <p>
              The important features of a boxplot are:
              <dl>
                <dt>Median (Q2)</dt>
                <dd>The median is the middle value in the data. Not to be confused with the mean, this is the value that occurs exactly halfway in the data when it is sorted. It is also known as the 50th percentile. This is represented by the thicker black line in the visualization.</dd>
                <dt>First Quartile (Q1)</dt>
                <dd>The first quartile is the middle number between the smallest value in the data and the median of the data. It is also known as the 25th percentile. This is represented by the bottom boundary of the rectangle in the visualization.</dd>
                <dt>Third Quartile (Q3)</dt>
                <dd>The third quartile is the middle number between the median of the data and the largest value in the data. It is also known as the 75th percentile. This is represented by the upper boundary of the rectangle in the visualization.</dd>
                <dt>Interquartile Range (IQR)</dt>
                <dd>The interquartile range is the range of values between the first and third quartiles. 50% of the data occurs within this range. This range is represented by the rectangle in the visualization.</dd>
                <dt>Minimum</dt>
                <dd>The minimum is not the true minimum of all the data values but is rather expressed by the following formula <em>Q1 - 1.5 * IQR</em>. This is represented by the bottom horizontal line in the visualization.</dd>
                <dt>Maximum</dt>
                <dd>The maximum is not the true maximum of all the data values but is rather expressed by the following formula <em>Q3 + 1.5 * IQR</em>. This is represented by the top horizontal line in the visualization.</dd>
                <dt>Outliers</dt>
                <dd>An outlier is a value that lies outside the minimum and maximum values. When performing data analysis, these values should be handled to avoid any skewing of the data (either by data correction or removing them). These are represented by small circles in the visualization.</dd>
              </dl>
            </p>
          </section>

          <?php include_once "inc/footer.php"; ?>
        </div>        
        
        <?php include_once "inc/footer-js.php"; ?>
        <script type="text/javascript" src="js/tournament-scoring.js"></script>
    </body>
</html>