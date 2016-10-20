

function renderTheme(theme) {
  //themechoice
  const tc = allThemes[theme];

  const navbarBG = tc.norm.bg['#nav-bar'];
  const bodyBG = tc.norm.bg['body'];
  const dropdownBG = tc.norm.bg['.dropdown'];
  const bodyC = tc.norm.c["body"];
  const navbarC = tc.norm.c['#nav-bar'];
  const hovParaBG = tc.hover.bg['#nav-bar > p'];
  const hovDropdownLiBG = tc.hover.bg['.dropdown > li'];
  const hovParaC = tc.hover.c['#nav-bar > p'];
  const hovDropdownLiC = tc.hover.c['.dropdown > li'];
  ///

    $('body').css("background-color", bodyBG);
    $('body').css("color", bodyC);
    $('#nav-bar').css("background-color", navbarBG);
    $('#nav-bar').css("color", navbarC);
    $('.dropdown').children('li').css("background-color", "inherit");
    $('.dropdown').css("background-color", dropdownBG);
    $(".dropdown > li").hover(function(e) {
    $(this).css("background-color",e.type === "mouseenter" ? hovDropdownLiBG : "inherit");});
    $(".dropdown > li").hover(function(e) {
    $(this).css("color",e.type === "mouseenter" ? hovDropdownLiC : "inherit");});
    $(".nav-options > p").hover(function(e) {
    $(this).css("background-color",e.type === "mouseenter" ? hovParaBG : "inherit");});
    $(".nav-options > p").hover(function(e) {
    $(this).css("color",e.type === "mouseenter"? hovParaC : "inherit");});
}

const allThemes = {

  "Strawberry-Creamsicle" : {
    "norm" : {
      "bg":{
        "#nav-bar": "#ffc083",
        "body": "#ff3b51",
        ".dropdown": "#ffc083"
      },
      "c":{
        "#nav-bar": "black",
        "body" : "#f5a0b3"
      }
    },
   "hover" : {
      "bg":{
        "#nav-bar > p": "black",
        ".dropdown > li": "black"
      },
      "c":{
        "#nav-bar > p": "#ffc083",
        ".dropdown > li" : "#ffc083"
      }
    }
  },

  "Classic" : {
    "norm" : {
      "bg":{
        "#nav-bar": "#009f86",
        "body": "#eee",
        ".dropdown": "#009f86"
      },
      "c":{
        "#nav-bar": "#e8fdff",
        "body": "#244751"
      }
    },
   "hover" : {
      "bg":{
        "#nav-bar > p" : "#e8fdff",
        ".dropdown > li": "#e8fdff"
      },
      "c":{
        "#nav-bar > p" : "#009f86",
        ".dropdown > li": "#009f86"
      }
    }
  },
}