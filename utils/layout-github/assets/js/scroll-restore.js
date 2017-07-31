'use strict';

var scroll = sessionStorage.getItem('sidebarScroll');
if (scroll) {
  document.getElementById('navigation').scrollTop = scroll;
}

var saveSidebarScroll = function (event) {
  var scroll = document.getElementById('navigation').scrollTop;
  sessionStorage.setItem('sidebarScroll', scroll);
}

var toggleNav = function (event) {
  // event.preventDefault();
  var el = document.getElementById('mobile-nav');
  if ( el.style.display != 'none' ) {
    el.style.display = 'none';
  }
  else {
    el.style.display = '';
    var scroll = sessionStorage.getItem('scrollTop');
    if (scroll) {
        document.getElementById('main').scrollTop = scroll;
    }
  }
};

var saveScroll = function () {
    sessionStorage.setItem('scrollTop', document.getElementById('main').scrollTop);
};

var updatePlus = function (element) {
  if (!element) return;
  if (element.getAttribute('aria-expanded') === 'true' ) {
    element.innerHTML = '+';
  } else {
    element.innerHTML = '-';
  }
};

var curItem = document.getElementsByClassName('active')[0];

if (curItem) {
  if (!curItem.classList.contains('sidebar-header-1')) {
    var parent = curItem.parentElement;
    var grandpa = curItem.parentElement.parentElement;
    parent.classList.add('in');
    updatePlus(parent.previousElementSibling.getElementsByClassName('plus')[0]);
    grandpa.classList.add('in');
    updatePlus(grandpa.previousElementSibling.getElementsByClassName('plus')[0]);
  }
}
