<template>
  <div>
          <div class="col">
        <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
	        <div class="flipper">
		        <div class="front">
			      <!-- front content -->
			        <div id="" class="card-bg card-bg-common">
                <img class="card-img" src="<?=$obj->svg ?>" />
                <span class="card-edition <?=$white_bg?>">#1{{edition_total}}</span>
                <div class="card-item-name text-center">{{card_name}}<br>{{card_set}}</div>
                <div class="card-czxp text-left">{{unlock_czxp}}</div>
                <div class="card-level">{{level}}</div>
              </div>
            </div>
		        <div class="back">
              <!-- back content -->
              <div class="card-bg card-bg-back">
			          <div class="back-container">
			            <div class="card-txt-black"><span class="font-weight-bold">Cost:</span> {{card_cost}}</div>
			            <br>
			            <div class="card-txt-black"><span class="font-weight-bold">Buy CZXP:</span><br>{{buy_czxp}}</div>
			            <div class="card-txt-black"><span class="font-weight-bold">Transfer CZXP:</span><br>{{transfer_czxp}}</div>
			            <div class="card-txt-black"><span class="font-weight-bold">Sacrifice CZXP:</span><br>{{sacrifice_czxp}}</div>
			          </div>
			        </div>
		        </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'OwnedCardContent',
  props: ['id'],
  data () {
    return {
    
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* Layout */

.card-bg{
  display: inline-block;
  width:260px;
  height:400px;
  text-align: center;
  margin-bottom: 3px;
  padding-bottom: 4px;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-size: 260px 420px;
  background-position: 0px;
}

.card-bg-6{
    background-image: url(assets/cryptoz_card_common_brown.svg);
}

.card-bg-5{
  background-image: url(assets/cryptoz_card_uncommon_blue.svg);
}

.card-bg-4{
  background-image: url(assets/cryptoz_card_rare_red.svg);
}

.card-bg-3{
  background-image: url(assets/cryptoz_card_epic_purple.svg);
}

.card-bg-2{
  background-image: url(assets/cryptoz_card_platinum.svg);
}

.card-bg-1{
  background-image: url(assets/cryptoz_card_diamond.svg);
}

.card-bg-back{
  background-image: url(assets/cryptokeeper_card_back.png);
  padding:20px;
}


.card-img{
  display: block;
  position:relative;
  top:45px;
  right:-2px;
  max-width:80%;
  margin:0 auto;
}

.card-item-name{
  width:100%;
  position: relative;
  top: 66px;
  font-weight: bold;
}

.card-edition{
  position: relative;
  width: 100%;
  top: 49px;
  color: #fff;
  font-weight: bold;
}

.card-level{
  position: relative;
  width:50px;
  top: 66px;
  right: -209px;
  font-weight: bold;
  color: #fff;
}

.card-czxp{
  position: relative;
  color:#fff;
  font-weight: bold;
  width: 100px;
  top: 89px;
  left:55px;
}

.card-txt-black{
 color: #000;
}

/* Back of card stuff */
.card-txt-white{
 color: #fff;
}

.back-container{
  position:relative;
  top:100px;
  background-color: rgba(200,200,200,0.7);
  padding:20px;
}

</style>