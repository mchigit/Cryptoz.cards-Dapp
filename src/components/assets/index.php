<?
//Iterate through all the assets
require_once '../header.php';
/*
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Cryptoz Card Inventory</title>
  </head>
*/
?>
    <link rel="stylesheet" href="card-styles.css">
    <link rel="stylesheet" href="https://cryptoz.cards/crypto-styles.css">
    <h1>Inventory</h1>
    <!-- TEsting
              <div class="card-bg card-bg-back">
			          <div class="back-container">
			            <div class="card-txt-black"><span class="font-weight-bold">Cost:</span> 0.0001</div>
			            <br>
			            <div class="card-txt-black"><span class="font-weight-bold">buyCZXP:</span> 123</div>
			            <div class="card-txt-black"><span class="font-weight-bold">transCZXP:</span> 123</div>
			            <div class="card-txt-black"><span class="font-weight-bold">sacrificeCZXP:</span> 123</div>
			          </div>
			        </div>
    -->

    <div class="row">
<?
    while($obj = mysqli_fetch_object($res, 'card') ){
      //var_dump($obj);
      $white_bg = ($obj->rarity < 3) ? 'card-txt-black' : '' ;
      $edition_total = ($obj->in_store > 0) ? '' : ' of '.$obj->edition_total;
?>
      <div class="col">
        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
	        <div class="flipper">
		        <div class="front">
			      <!-- front content -->
			        <div id="<?=$obj->id ?>" class="card-bg card-bg-<?=$obj->rarity ?>">
                <img class="card-img" src="<?=$obj->svg ?>" />
                <span class="card-edition <?=$white_bg?>">#1<?= $edition_total ?></span>
                <div class="card-item-name text-center"><?= $obj->name ?><br><?= $obj->card_set ?></div>
                <div class="card-czxp text-left"><?= number_format($obj->unlock_czxp) ?></div>
                <div class="card-level"><?= $obj->card_level ?></div>
              </div>
            </div>
		        <div class="back">
              <!-- back content -->
              <div class="card-bg card-bg-back">
			          <div class="back-container">
			            <div class="card-txt-black"><span class="font-weight-bold">Cost:</span> <?= $obj->cost ?></div>
			            <br>
			            <div class="card-txt-black"><span class="font-weight-bold">Buy CZXP:</span><br><?= number_format($obj->buy_czxp) ?></div>
			            <div class="card-txt-black"><span class="font-weight-bold">Transfer CZXP:</span><br><?= number_format($obj->transfer_czxp) ?></div>
			            <div class="card-txt-black"><span class="font-weight-bold">Sacrifice CZXP:</span><br><?= number_format($obj->sacrifice_czxp) ?></div>
			          </div>
			        </div>
		        </div>
          </div>
        </div>
      </div>
<? } ?>
    </div>

<h1>Migrations code</h1>

<?

mysqli_data_seek($res, 0);
while($obj = mysqli_fetch_object($res, 'card') ){
      //var_dump($obj);exit;
      
      switch($obj->in_store){
        case 0:
          echo '//STORE';
          echo ($obj->cost == 0) ? ' - FREE' : '';
          break;
        case 1:
          echo '//BOOSTER';
          break;
        case 2:
          echo '//BONUS';
          break;
      }
      echo '<br>';
      $cost = number_format($obj->cost*1000000000000000000, 0, '','');// convert to wei
      echo 'instance.loadNewCardType('.$obj->id .
      ',"'. $obj->name .'","'.
      $obj->card_set.'",'.
      $obj->zombie_type.',' .
      $obj->in_store .',' .
      $obj->rarity.','.
      $obj->edition_total.','.
      $cost.',' .
      $obj->buy_czxp .');<br>';
      echo "instance.addTocardType($obj->id,$obj->transfer_czxp,$obj->sacrifice_czxp,$obj->unlock_czxp,$obj->card_level);<br>";
}
/**


object(card)#3 (15) {
  ["id"]=>
  string(1) "1"
  ["name"]=>
  string(2) "n1"
  ["description"]=>
  string(2) "d1"
  ["svg"]=>
  string(11) "dorothy.svg"
  ["card_set"]=>
  string(5) "test1"
  ["zombie_type"]=>
  string(1) "1"
  ["in_store"]=>
  string(1) "0"
  ["rarity"]=>
  string(1) "3"
  ["edition_total"]=>
  string(1) "5"
  ["cost"]=>
  string(5) "0.001"
  ["buy_czxp"]=>
  string(1) "2"
  ["transfer_czxp"]=>
  string(1) "1"
  ["sacrifice_czxp"]=>
  string(1) "1"
  ["unlock_czxp"]=>
  string(2) "10"
  ["card_level"]=>
  string(1) "2"
}

 */
?>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="jquery-ui.min.js"></script>
    <script src="card-app.js"></script>
  </body>
</html>
