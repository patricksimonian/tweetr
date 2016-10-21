
//instead of reading css from object,
//read css files from a folder and list them in the drp down.
//when selected render them
function renderTheme(theme) {
  $('.themes').attr("href", `/styles/themes/${theme}.css`);
}

