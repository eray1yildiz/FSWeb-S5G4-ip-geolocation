//axios import buraya gelecek
import axios from "axios";
var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

const ipKarti = veriler => {
  const divCard = document.createElement("div");
  divCard.classList.add("card");

  const imgBayrak = document.createElement("img");
  //imgBayrak.setAttribute("src", veriler.ülkebayrağı); data içerisindeki resim görüntülenmediği için ---> etütte yeni bayrak resmi ekledik.
  //imgBayrak.src = "https://flagcdn.com" + "/256x192/" + veriler.ülkeKodu.toLowerCase() + ".png" ---> etütte eklenen bayrak
  imgBayrak.src =
    "https://www.geoguessr.com/seterra/images/system/flags/" +
    veriler.ülke.toLowerCase() +
    ".png";

  const divİnfo = document.createElement("div");
  divİnfo.classList.add("card-info");

  const baslik = document.createElement("h3");
  baslik.classList.add("ip");
  baslik.textContent = veriler.sorgu;

  const prg1 = document.createElement("p");
  prg1.classList.add("ulke");
  prg1.textContent = `${veriler.ülke} (${veriler.ülkeKodu})`;

  const prg2 = document.createElement("p");
  prg2.textContent = `Enlem: ${veriler.enlem} Boylam: ${veriler.boylam}`;

  const prg3 = document.createElement("p");
  prg3.textContent = `Şehir: ${veriler.şehir}`;

  const prg4 = document.createElement("p");
  prg4.textContent = `Saat Dilimi: ${veriler.saatdilimi}`;

  const prg5 = document.createElement("p");
  prg5.textContent = `Para Birimi: ${veriler.parabirimi}`;

  const prg6 = document.createElement("p");
  prg6.textContent = `ISP: ${veriler.isp}`;

  divİnfo.append(baslik, prg1, prg2, prg3, prg4, prg5, prg6);

  divCard.append(imgBayrak, divİnfo);

  return divCard;
};

async function getData() {
  await ipAdresimiAl();
  axios.get("https://apis.ergineer.com/ipgeoapi/" + benimIP).then(response => {
    document.querySelector(".cards").append(ipKarti(response.data));
  });
}
getData();
