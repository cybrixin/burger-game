const game = $('.game_inner__elements'), ingredients = game.find('div.ingredient'), scoreElement = $('.game_inner__score span'), scoreMax = 10, scoreMin = 7.5, roundTimeElement = $('.game_inner__timer span'), till = game.find('.till'), burger = game.find('.burger'), orderElement = $('.game_inner__order'), totalTime = 120;

console.log(ingredients)

let score = 0, difficulty = 2, roundTime = totalTime, currentIngredients = new Array(), gameStarted = false;

roundTimeElement.html(totalTime);

$("#restartGame").click(() => {
  score = 0;
  difficulty = 2;
  roundTime = totalTime;
  currentIngredients = new Array();
  gameStarted = false;
  roundTimeElement.html(totalTime);
  $(".game_inner__overlay").show().next().show();
  $('.game_inner__end').hide();
});

let createOrder = (difficulty) => {
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
      let rand = Math.floor(Math.random() * Math.floor(order_ingredients.length));
      burger_stack.push(order_ingredients[rand]);
    }

    if($.inArray('patty', burger_stack) < 0){
      let rand = Math.floor(Math.random() * Math.floor(burger_stack.length - 1));
      burger_stack.splice(rand, 1, 'patty');
    }

    burger_stack = {ingredients: burger_stack.join(',')};

    return burger_stack;
};

let getOrder = (order) => {
    let currentOrder = order.ingredients.split(',');
    orderElement.find('.order').append('<p>Yes, I would like...</p><br/>');
    currentOrder.forEach(function(ingredient) {
        orderElement.find('.order').append(`<p><span class="${ingredient}"></span> ${ingredient} </p>`);
    });
}

let nextOrder = (size) => {
    currentIngredients = new Array();
    setTimeout(function(){
        $('.car').css('left', '700px');
    }, 1);

    setTimeout( () => {
        $('.car').css({'transition': 'all', 'left': '-700px'});
    }, 300);

    setTimeout( () =>{
        $('.car').css({'transition': 'all 0.3s', 'left': '0px'});
    }, 1000);

    burger.fadeOut( () =>{
        burger.html('<img class="top" src="./images/gamefiles/gb_bun_top.png"><img class="bottom" src="./images/gamefiles/gb_bun_bottom.png">');
        burger.fadeIn();
    });

    orderElement.find('.order').fadeOut(function(){
        orderElement.find('.order').fadeIn();
        orderElement.find('.order').html('');
        newOrder = createOrder(size);
        getOrder(newOrder);
    });
};

$('.restart').click( _ => {
    burger.fadeOut( () => {
        burger.html('<img class="top" src="./images/gamefiles/gb_bun_top.png"><img class="bottom" src="./images/gamefiles/gb_bun_bottom.png">');
        burger.fadeIn();
        currentIngredients = [];
    });
});

nextOrder(difficulty);

ingredients.each( (a, b) =>{
  console.log(b);
  $(b).click( (e) => {
    let target = e.currentTarget;
    let clickedIngredient = $(target).attr('class').split(' ')[0];
    let clickedIngredientEl = `<div class="burger_${clickedIngredient}"><img src="./images/gamefiles/gb_burger_${clickedIngredient}.png"/></div>`;
    add(clickedIngredient, clickedIngredientEl);
  })
});

const add = (ingredent, ingredientEl) => {
  burger.append(ingredientEl);
  currentIngredients.push(ingredent);
};

let checkIngredients = (ingredients, order) => {
    let a = ingredients.toString();
    let b = order.toString();

    if(a===b) {
        return 'Perfect';
    }

    let ingredientsAmt = ingredients.reduce(function(countMap, word) { countMap[word] = ++countMap[word] || 1; return countMap }, {});
    let orderAmt = order.reduce(function(countMap, word) { countMap[word] = ++countMap[word] || 1; return countMap }, {});
    let count = 0;

    for(let i in orderAmt) {
        if(typeof ingredientsAmt[i] !== "undefined" && orderAmt[i] === ingredientsAmt[i]) {
            count += orderAmt[i];
        }
        if(count == order.length) {
            return 'Not Bad';
        }
    }

    return 'Not Good';
}


till.click(function() {
    let checkOrder = newOrder.ingredients.split(',');
    let result = checkIngredients(currentIngredients, checkOrder);

    if(result == 'Perfect') {

        score = score + scoreMax;
    }

    if(result == 'Not Bad') {
        score = score + scoreMin;
    }
    $('.game_inner__result').fadeIn();
    $('.game_inner__result').html(result)


    setTimeout(function(){
        $('.game_inner__result').fadeOut();
    },300);

    scoreElement.html(`₹${score}`);

    nextOrder(difficulty);
});




$('#begin').click(function(e){
    gameStarted = true;
    console.log($(this).parent(), $(this).parent().prev());
    $(this).parent().hide().prev().hide();
    roundTimer();
});

let interval = null;

let roundTimer = _ => {

    interval = setInterval( _ => {
        if(roundTime >= 1) {
            roundTime --;

            roundTimeElement.html(roundTime);



            if(score > 120) {
                difficulty = 8
            }else if(score > 100) {
                difficulty = 7
            }else if(score > 80) {
                difficulty = 6
            }else if(score > 60) {
                difficulty = 5
            }else if(score > 40) {
                difficulty = 4
            }else if(score > 20){
                difficulty = 3
            }

            console.log({score: score, difficulty: difficulty});
        } else {
            $('.game_inner__end').show();
            $('.game_inner__overlay').show();
            $('.game_inner__end p span').html(`${score}`);
            clearInterval(interval);
        }
    },1000);
};
