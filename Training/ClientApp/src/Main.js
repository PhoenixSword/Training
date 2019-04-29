import React from "react";
import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';

var position1 = 0;
var position2 = 0;
var position3 = 0;
var correctCards = 0;

function rand(type) {
  switch (type) {
    case 1:
      return 5 + "" + Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9);
    case 2:
      return Math.round(Math.random() * 9) + "" + 2 + "" + Math.round(Math.random() * 9);
    case 3:
      return Math.round( 2 + Math.random() * 7) + "" + Math.round(Math.random() * 9) + "" + Math.round(Math.random() * 9);
    default:
      break;
  }
  return Math.round(0 + Math.random() * 300);
}

function width(index)
{
   return 100 + (index%4*80) + Math.round(20 + Math.random() *50);
}

function height(index)
{
    return 300 + (index%6*80) + Math.round(Math.random() *20);
}

function init(stat) { 
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  correctCards = 0;
  position1 = 50;
  position2 = -50;
  position3 = 10;
  $('#cardPile').html( '' );
  $('#fake').html( '' );
 
  for ( var i=0; i<10; i++ ) {
    var number = rand((i+1)%3);
    $(`<div style="left: ${height(i)}px;top:${width(i)}px" class="item"><p>${number}</p></div>`).data( 'number', number ).attr( 'id', 'card'+number ).appendTo( '#cardPile' ).draggable( {
      stack: '#cardPile div',
      revert: true,
      containment: "#content", scroll: false
    } );
  }

  for ( i=1; i<=3; i++ ) {
    $(`<div id='cardSlots${i}'></div>`).data( 'number', i ).appendTo( `#fake` ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
}

function splitToDigits(number) {
  var digits = [];
  while (number) {
    digits.push(number % 10);
    number = Math.floor(number/10);
  }
  return digits;
}

function correct(element, ui, index)
{
    //element.droppable( 'disable' );
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
    switch (index) {
      case 1:
        ui.draggable.position( { of: element, my: `left+${position1} top`, at: 'left top'});
        ui.draggable.addClass( 'leftItem' );
        position1+=90;
        break;
      case 2:
        ui.draggable.position( { of: element, my: `left+${position2} top`, at: 'left top'});
        ui.draggable.addClass( 'rightItem' );
        position2+=90;
        break;
      case 3:
        ui.draggable.position( { of: element, my: `left+${position3} top`, at: 'left top'});
        ui.draggable.addClass( 'centerItem' );
        position3+=90;
        break;
      default:
        break;
    }
}
function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  var masDigits = splitToDigits(cardNumber);
  switch (slotNumber) {
    case 1:
      if ( masDigits[2] === 5 ) {
        correct($(this), ui, 1);
      }
      else
      {
        ui.draggable.addClass( 'invalidItem' );
        setTimeout(function(){
          ui.draggable.removeClass( 'invalidItem' );
        }, 500);
      }
      break;
    case 2:
      if ( masDigits[1] === 2 ) {
        correct($(this), ui, 2);
      }
      else
      {
        ui.draggable.addClass( 'invalidItem' );
        setTimeout(function(){
          ui.draggable.removeClass( 'invalidItem' );
        }, 500);
      }
      break;
    case 3:
      if ( ( masDigits[1] !== 2 ) && ( masDigits[2] !== 5 )  ) {
        correct($(this), ui, 3);
      }
      else
      {
        ui.draggable.addClass( 'invalidItem' );
        setTimeout(function(){
          ui.draggable.removeClass( 'invalidItem' );
        }, 500);
      }
      break;
    default:
      break;
  }

  if ( correctCards === 10) {
    $('#cardSlots1').addClass('animated');
    $('#cardSlots2').addClass('animated');
    $('#cardSlots3').addClass('animated');
    $('.leftItem').addClass('animated');
    $('.centerItem').addClass('animated');
    $('.rightItem').addClass('animated');
    $('#successMessage').show();
  }

}

class Main extends React.Component {
  state = {
    finish: correctCards
  };

  render() {
    return (

      <div id="content" style={{background: `url('https://content.uchi.ru/27398/930/28.png') no-repeat center center fixed`}}>
        {this.state.finish}
      <button onClick={(e) => init(this.state)}>Play</button>
          <div id="fake"></div>
          <div id="cardPile"> </div>
          <div id="successMessage" style={{display: 'none'}}>
            <h2>Congratulations!</h2>
            <button onClick={init}>Play Again</button>
          </div>
      </div>
    );
  }
}
export default Main;