
// SLIDE

$("#category-slider a").click(function(event){
        event.preventDefault();
});

 console.log( $("#category-slider .display"));

$("#category-slider .imageHeader ul li").click(function(){
  $("#category-slider .imageHeader ul li").removeClass("active");
  $(this).addClass("active");
})

var hide=$("#category-slider .enable-hide");
console.log(hide);


var displayOne = $("#category-slider .displayOne");
var displayTwo = $("#category-slider .displayTwo");
var displayThree = $("#category-slider .displayThree");
var displayFour = $("#category-slider .displayFour");
var displayFive = $("#category-slider .displayFive");
var displaySix = $("#category-slider .displaySix");

var display = [displayOne,displayTwo,displayThree,displayFour,displayFive,displaySix];

var li = $("#category-slider .imageHeader li a");
var a=$("#category-slider .drop  a");


var clickValue = 0;
var disclickValue = 0;


hide.css("transform","scale(0.7,0.7)").hide();

li.click(function(){
   clickValue = $(this).attr("data-value")

    if(clickValue != disclickValue){

      display[disclickValue].hide().css("transform","scale(0.7,0.7)");
      display[clickValue].fadeIn().css("transform","scale(1,1)");

      disclickValue = clickValue;
    }
})


a.click(function(){
   clickValue = $(this).attr("data-value")

    if(clickValue != disclickValue){

      display[disclickValue].hide().css("transform","scale(0.7,0.7)");
      display[clickValue].fadeIn().css("transform","scale(1,1)");

      disclickValue = clickValue;
    }
})
