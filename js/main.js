"use strict";

let bodyElem = document.querySelector('body');

document.querySelector('.header__burger').addEventListener('click', function(){
    document.querySelector('.header__burger span').classList.toggle('active');
    document.querySelector('.header__list').classList.toggle("animate");
  });

  function validateEmail(email) {
    let pattern  = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (pattern.test(email.value)) {
      return true;
    } else {
      return false;
    }
  }

  
if (document.querySelector('.blogs__search')) {
  const button = document.querySelector('.blogs__send');
  let inputEmail = document.querySelector('.blogs__email');
  const form = document.getElementById('form');
  
  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault();
    form.classList.add('form__loading');
    if (validateEmail(inputEmail) && inputEmail.value != '') {
      let formData = new FormData(form);
      formData.append('email', inputEmail.value);

      let response = await fetch('mail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.classList.remove('form__loading');
      } else {
        alert('Form submission failed');
        form.classList.remove('form__loading');
      }

      inputEmail.closest('.blogs__field').classList.remove('input__error');
      inputEmail.value = "";
    } else {
      inputEmail.closest('.blogs__field').classList.add('input__error');
    }
  }
}


if (document.querySelector('.shop')) {

  /*  IMAGE ACTIVE SHOP */
  for (let link of document.querySelectorAll('.shop__link')) {
    link.addEventListener('click', function(event) {
      const img = event.target.querySelector('img') || event.target;
      let imgActive = document.querySelector('.shop__active img');

      imgActive.src = img.src;
      for (let images of document.querySelectorAll('.shop__link')) {
        if (images.classList.contains('shop__link-active')) {
          images.classList.remove('shop__link-active')
        }
      }
      img.closest('.shop__link').classList.add('shop__link-active');

    })
  }

 /*  QUANTITY SHOP  */

  let shopPlus = document.querySelector('.shop__plus');
  let shopMinus = document.querySelector('.shop__minus');
  let quantity = document.querySelector('.shop__number');

  shopPlus.addEventListener('click', function() {
    quantity.textContent++;
  })

  shopMinus.addEventListener('click', function() {
    if (quantity.textContent - 1 == 0) {
      quantity.textContent = 1;
      return;
    }
    quantity.textContent--;
  })



  /*  TABS  */

  let blocks = document.querySelectorAll('div[data-block]');
  let activeTab = document.querySelector('.info__tab-active');


  function tabFunc() {
    for (let block of blocks) {
      if (activeTab.dataset.tab != block.dataset.block) {
        block.style.display = "none";
        block.classList.remove('info__block-active');
      } else {
        block.style.display = "block";
        setTimeout(() => block.classList.add('info__block-active'), 10);
      }
    }
  }

  tabFunc();

  for (let tab of document.querySelectorAll('.info__tab')) {

    tab.addEventListener('click', function(event) {
      for (let tab of document.querySelectorAll('.info__tab')) {
        tab.classList.remove('info__tab-active');
      }
      tab.classList.add('info__tab-active');
      activeTab = tab;
      tabFunc();
    })
  }
}