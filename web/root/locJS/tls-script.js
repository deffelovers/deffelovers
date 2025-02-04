$(document).ready(function() {
  document.querySelector(".input-group input#qr-input").addEventListener('keyup', function(){
    $.get(`/api/v1/qr?text=${document.querySelector(".input-group input#qr-input").value}`,function(res) {
      res.success == true ? document.querySelector(".cd-ct img").setAttribute("src", res.data64) ||
      document.querySelector(".input-group button#qr-btn").classList.remove('disabled') ||
      document.querySelector(".cd-ct a#dl").classList.remove("disabled") ||
      document.querySelector(".cd-ct a#dl").setAttribute("href", res.data64) : document.querySelector(".cd-ct img").setAttribute("src", "null") ||
      document.querySelector(".cd-ct a#dl").classList.add("disabled") ||
      document.querySelector(".input-group button#qr-btn").classList.remove('disabled');
    });
  });
  $(".input-group button#qr-btn").click(function(){
    document.querySelector(".input-group input#qr-input").value = document.querySelector(".input-group input#qr-input").defaultValue;
    document.querySelector(".cd-ct img").setAttribute("src", "null");
    document.querySelector(".cd-ct a#dl").classList.add("disabled");
  });
  $(".input-group button#mal-btn").click(function(){
    document.querySelector(".input-group button#mal-btn i.bi").setAttribute("class", "bi rotate bi-arrow-repeat");
    document.querySelector(".input-group button#mal-btn").classList.add('disabled');
    $.get(`/api/v1/mal?search=${document.querySelector(".input-group input#mal-input").value}`, function(res){
      if(res.success == true){
        let mal_d = ""
        for (let i = 0; i < res.data.length; i++) {
          mal_d += `<div id="mal-list"><div class="mal-item" style="padding: 5px;"><div class="card text-white"><img src="${res.data[i].thumb}" class="card-img" alt="${res.data[i].title}" data-bs-toggle="mal-items"></div></div><div class="col" style="padding-top: 10px; padding: 5px;"><a href="${res.data[i].url}" target="_blank" class="btn btn-primary" style="width: 100%; font-size: 14px;">Lihat di <b>MAL</b></a></div></div>`;
        }
        document.querySelector('.card div.mal-data').innerHTML = mal_d
        document.querySelector(".input-group input#mal-input").value = document.querySelector(".input-group input#mal-input").defaultValue; document.querySelector(".input-group button#mal-btn i.bi").setAttribute("class", "bi bi-search");  document.querySelector(".input-group button#mal-btn").classList.remove('disabled')
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="mal-items"]'))
        popoverTriggerList.map(function (popoverTriggerEl, i) {
          return new bootstrap.Popover(popoverTriggerEl, { trigger: 'hover', html: true, title: res.data[i].title, content: `<li><b>Type:</b><i> ${res.data[i].type}</i></li><li><b>Score:</b><i> ${res.data[i].score}</i><li><b>Aired:</b><i> ${res.data[i].aired}</i></li>` })
        })
      }else{
        document.querySelector(".input-group input#mal-input").value = document.querySelector(".input-group input#mal-input").defaultValue;
        document.querySelector('.card div.mal-data').innerHTML = `<i class="text-muted">${res.msg}</i>`; document.querySelector(".input-group button#mal-btn i.bi").setAttribute("class", "bi bi-search"); document.querySelector(".input-group button#mal-btn").classList.remove('disabled');
      }
    })
  })
});