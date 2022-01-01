const game = $('.game_inner__elements'), ingredients = game.find('div.ingredient'), scoreElement = $('.game_inner__score'), scoreMax = 10, scoreMin = 7.5, roundTimeElement = $('.game_inner__timer span'), till = game.find('.till'), burger = game.find('.burger'), orderElement = $('.game_inner__order');

var score = 0, difficulty = 2, roundTime = 1000, currentIngredients = new Array();

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
      let rand = Math.flooe(Math.random() * Math.floor(burger_stack.length - 1));
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

$('.restart').click( () => {
    burger.fadeOut( () => {
        burger.html('<img class="top" src="./images/gamefiles/gb_bun_top.png"><img class="bottom" src="./images/gamefiles/gb_bun_bottom.png">');
        burger.fadeIn();
        currentIngredients = [];
    });
});

nextOrder(difficulty);


ingredients.click( () => {
    let clickedIngredient = $(this).attr('class').split(' ')[0];
    let clickedIngredientEl = `<div class="burger_${clickedIngredient}"><img src="./images/gamefiles/gb_burger_${clickedIngredient}.png"/></div>`;
    add(clickedIngredient, clickedIngredientEl);
});

const add = (ingredent, ingredientEl) {
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

    return 'No Good';
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
    },300)

    scoreElement.html(`$${score}`);

    nextOrder(difficulty);
});


let gameStarted = false;

$('button').click( () => {
    gameStarted = true;
    $(this).parent().hide().prev().hide();
    roundTimer();
});

let roundTimer = _ => {

    setInterval( _ => {
        if(roundTime > 1) {
            roundTime --;
            roundTimeElement.html(roundTime);

            if(score > 10) {
                difficulty = 3
            }

            if(score > 30) {
                difficulty = 4
            }

            if(score > 70) {
                difficulty = 5
            }
            if(score > 120) {
                difficulty = 6
            }
            if(score > 170) {
                difficulty = 7
            }
        } else {
            $('.game_inner__end').show();
            $('.game_inner__overlay').show();
            $('.game_inner__end p').html(`Good Job. You helped Ed make $${score} today.`);

        }
    },1000);
};
