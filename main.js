(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{M:()=>J,q:()=>I});var t=document.querySelector(".container"),n=t.querySelector(".profile__edit-button"),o=t.querySelector(".profile__add-button"),r=t.querySelector(".profile__avatar"),c=t.querySelector(".profile__change-button"),a=(document.querySelectorAll(".popup__close-button"),document.querySelector(".popup__close-button_profile")),u=document.querySelector(".popup__close-button_avatar"),i=document.querySelector(".popup__close-button_card"),l=document.querySelector(".popup__close-button_image"),s=document.querySelector("#element").content,d=(s.querySelectorAll(".element__img"),document.querySelector(".popup_edit-profile")),p=document.querySelector(".popup_edit-avatar"),f=document.querySelector(".popup_add-card"),m=document.querySelector(".popup_open-image"),_=m.querySelector(".popup__img"),v=m.querySelector(".popup__img-title"),y=(document.querySelectorAll(".popup"),d.querySelector(".popup__input_name")),h=d.querySelector(".popup__input_about"),b=f.querySelector(".popup__input_title"),S=f.querySelector(".popup__input_link"),q=p.querySelector(".popup__input_link-avatar"),k=t.querySelector(".profile__title"),g=t.querySelector(".profile__subtitle"),L=t.querySelector(".elements"),C=document.querySelector("#submitButtonMesto"),E=document.querySelector("#submitButtonProfile"),j=document.querySelector("#submitButtonAvatar"),A=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function x(e){e.classList.add("popup_opened"),document.addEventListener("keydown",O),document.addEventListener("click",U)}function P(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",O),document.removeEventListener("click",U)}function O(e){"Escape"!==e.key&&"Esc"!==e.key||P(document.querySelector(".popup_opened"))}function U(e){e.target.classList.contains("popup")&&P(e.target)}var w,B,T={baseUrl:"https://nomoreparties.co/v1/plus-cohort-17",headers:{authorization:"1d4e0d9e-039a-449f-a329-44ee6b357555","Content-Type":"application/json"}};function M(e,t){var n=s.querySelector(".element").cloneNode(!0),o=n.querySelector(".element__like-amount"),r=n.querySelector(".element__delete-button"),c=n.querySelector(".element__like-button");n.querySelector(".element__title").textContent=t.name,o.textContent=t.likes.length;var a,u,i,l=n.querySelector(".element__img");return l.setAttribute("src",t.link),l.setAttribute("alt","Изображение ".concat(t.name)),console.log("me = "+e+" and card = "+t.owner._id),e!=t.owner._id&&r.classList.remove("element__delete-button_activate"),c.addEventListener("click",(function(e){I(function(e){return e.target.classList.contains("element__like-button_active")}(e),t._id,e,o)})),r.addEventListener("click",(function(e){J(t._id,e.target)})),a=l,u=t.link,i=t.name,a.addEventListener("click",(function(e){_.setAttribute("src",u),_.setAttribute("alt","Изображение ".concat(i)),v.textContent=i,x(m)})),n}function D(e,t,n,o){n?t.target.classList.remove("element__like-button_active"):t.target.classList.add("element__like-button_active"),o.textContent=e.likes.length}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function I(e,t,n,o){var r;e?function(e){return fetch("".concat(T.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(t){D(t,n,e,o)})).catch((function(e){console.log(e)})):(r=t,fetch("".concat(T.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(t){D(t,n,e,o)})).catch((function(e){console.log(e)}))}function J(e,t){var n;(n=e,fetch("".concat(T.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:T.headers})).then((function(){t.closest(".element").remove()})).catch((function(e){console.log(e)}))}Promise.all([fetch("".concat(T.baseUrl,"/users/me"),{headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(T.baseUrl,"/cards"),{headers:T.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];w=c,k.textContent=c.name,g.textContent=c.about,r.src=c.avatar,a.forEach((function(e){L.append(M(c._id,e))}))})).catch((function(e){console.log(e)})),n.addEventListener("click",(function(){x(d),y.value=k.textContent,h.value=g.textContent})),c.addEventListener("click",(function(){x(p)})),o.addEventListener("click",(function(){x(f),b.value="",S.value="",C.disabled=!0,C.classList.add("popup__submit-button_inactive")})),a.addEventListener("click",(function(){P(d)})),u.addEventListener("click",(function(){P(p)})),i.addEventListener("click",(function(){P(f)})),l.addEventListener("click",(function(){P(m)})),d.addEventListener("submit",(function(e){var t,n;e.preventDefault(),E.textContent="Сохранение...",(t=y.value,n=h.value,fetch("".concat(T.baseUrl,"/users/me"),{method:"PATCH",headers:T.headers,body:JSON.stringify({name:t,job:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){k.textContent=e.name,g.textContent=e.about,P(d)})).catch((function(e){console.log(e)})).finally((function(){E.textContent="Сохранить"}))})),p.addEventListener("submit",(function(e){var t;e.preventDefault(),j.textContent="Сохранение...",(t=q.value,fetch("".concat(T.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:T.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){r.src=e.avatar,r.alt=e.avatar,P(p)})).catch((function(e){console.log(e)})).finally((function(){j.textContent="Сохранить"}))})),f.addEventListener("submit",(function(e){var t,n;e.preventDefault(),C.textContent="Создание...",(t=b.value,n=S.value,fetch("".concat(T.baseUrl,"/cards"),{method:"POST",headers:T.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){L.prepend(M(w._id,e)),P(f)})).catch((function(e){console.log(e)})).finally((function(){C.textContent="Создать"}))})),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(B.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);A(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),A(n,o,t)}))}))}(e,B)}))})();