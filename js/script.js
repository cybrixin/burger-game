const game = $('.game_inner__elements'), ingredients = game.find('div.ingredient'), scoreElement = $('.game_inner__score'), scoreMax = 10, scoreMin = 7.5, roundTimeElement = $('.game_inner__timer span'), till = game.find('.till'), burger = game.find('.burger'), orderElement = $('.game_inner__order');

var score = 0, difficulty = 2, roundTime = 1000, currentIngredients = new Array();

createOrder = (difficulty) => {
    let order_ingredients = [
      'tomato',
      'lettuce',
      'cheese',
      'ketchup',
      'mustard',
      'patty'
    ];

    let burger_stack = [];

    for(let i = 0; i < difficulty; i++){
      let rand = Math.floor(Math.random());
    }
};
