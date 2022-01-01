//點擊新聞觸發，參數為欲傳給pixnet的分類參數
function pixnet(n)
{
    document.getElementsByTagName("main")[0].innerHTML="<div id='topnav'></div><div id='pixnet-slide'></div><div id='pixnet-stuff'></div>";
    var xmlhttp = new XMLHttpRequest();
    var url = "https://emma.pixnet.cc/mainpage/blog/categories/hot/"+n+"?page=1&per_page=15&api_version=2&format=json";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            AddItemOnTopNav()
            slide(myArr);
            myFunction(myArr);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
//從15筆資料中的後10筆以列表呈現
function myFunction(arr)
{
    var data = arr.articles;
    var text = "<table class='pixnettable'>";
    for (let i = 5; i < data.length; i++)
    {
        text+="<tr>";
        if ( data[i].thumb != "" ) text += '<td><img src="' + data[i].thumb + '" /></td>';
        if ( data[i].title != "" ) text += '<td><p><a href="' + data[i].link + '" target="_blank">' + data[i].title + '</a></p></td>';
        text+="</tr>";
    }
    text+="</table>";
    document.getElementById("pixnet-stuff").innerHTML = text;
}
//從15筆資料中的前5筆以可滑動的區塊呈現
function slide(arr)
{
    var data = arr.articles;
    var text="";
    text+='<div class="slideshow-container">';
    for(let i=0;i<5;i++)
    {
        text+='<div class="mySlides fade">';
            text+='<div class="numbertext"></div>';
            if ( data[i].thumb != "" )
            {
                var temp=data[i].thumb.split("&width=90&height=90");
                var temp2=temp[0]+"&width=500&height=500";
                text+='<img src="' + temp2 + '" style="width:100%">';
            }
            if ( data[i].title != "" ) text+='<div class="text"><p><a href="' + data[i].link + '" target="_blank">' + data[i].title + '</a></p></div>';
        text+='</div>';
    }
    text+='<a class="prev" onclick="plusSlides(-1)">&#10094;</a>';
    text+='<a class="next" onclick="plusSlides(1)">&#10095;</a>';
    text+='</div>';
    text+='<br>';
        
    text+='<div style="text-align:center">';
    for(let i=0;i<5;i++)
    {
        text+='<span class="dot" onclick="showSlides('+(i+1)+')"></span>';
    }
    text+='</div>';

    document.getElementById("pixnet-slide").innerHTML = text;
    showSlides();
}

var slideIndex = 0;
var timeout;
//增加滑動區塊的功能，參數為內容1~5
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    if(n!=undefined)
        slideIndex=n;
    else
        slideIndex++;
    clearTimeout(timeout);
    timeout=setTimeout(showSlides, 5000); // Change image every 5 seconds
    if (slideIndex > slides.length) {slideIndex = 1}
    else if (slideIndex < 1) {slideIndex = slides.length}
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" Active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " Active";
}
//點擊上一個內容或下一個內容的功能，參數1為前往下一內容，-1則為前往上一內容
function plusSlides(n)
{
    if(n==1)
        showSlides(slideIndex+1);
    else
        showSlides(slideIndex-1);
}
//新增網頁選項列
function AddItemOnTopNav()
{
    var text="";
    text+="<nav id='tn' class='teal lighten-1'>";
        text+="<ul class='center'>";
            text+="<li id='bn1'><button id='button1' onclick='move(-1)'><i class='material-icons'>chevron_left</i></button></li>";
            text+="<li id='tn1'><a onclick='pixnet(0)'>熱門</a></li>";
            text+="<li id='tn2'><a onclick='pixnet(3)'>寵物</a></li>";
            text+="<li id='tn3'><a onclick='pixnet(5)'>生活</a></li>";
            text+="<li id='tn4'><a onclick='pixnet(6)'>親子</a></li>";
            text+="<li id='tn5'><a onclick='pixnet(7)'>校園</a></li>";
            text+="<li id='tn6'><a onclick='pixnet(9)'>職場</a></li>";
            text+="<li id='tn7'><a onclick='pixnet(10)'>創作</a></li>";
            text+="<li id='tn8'><a onclick='pixnet(13)'>小說</a></li>";
            text+="<li id='tn9'><a onclick='pixnet(15)'>攝影</a></li>";
            text+="<li id='tn10'><a onclick='pixnet(17)'>藝文</a></li>";
            text+="<li id='tn11'><a onclick='pixnet(18)'>音樂</a></li>";
            text+="<li id='tn12'><a onclick='pixnet(19)'>影評</a></li>";
            text+="<li id='tn13'><a onclick='pixnet(20)'>收藏</a></li>";
            text+="<li id='tn14'><a onclick='pixnet(21)'>電玩</a></li>";
            text+="<li id='tn15'><a onclick='pixnet(22)'>時尚</a></li>";
            text+="<li id='tn16'><a onclick='pixnet(23)'>美容</a></li>";
            text+="<li id='tn17'><a onclick='pixnet(24)'>數位</a></li>";
            text+="<li id='tn18'><a onclick='pixnet(26)'>美食</a></li>";
            text+="<li id='tn19'><a onclick='pixnet(28)'>旅遊</a></li>";
            text+="<li id='tn20'><a onclick='pixnet(32)'>體育</a></li>";
            text+="<li id='bn2'><button id='button2' onclick='move(1)'><i class='material-icons'>chevron_right</i></button></li>";
        text+="</ul>";
    text+="</nav>";

    document.getElementById("topnav").innerHTML = text;

    count();
    $(window).resize(count);
}

let pixnetnum=0;
let pixnetpos=0;
//根據畫面大小動態調整選項列顯示數量
function count()
{
    var size=$("#topnav").width();
    pixnetnum=Math.floor(size/60-2);
    for(let i=1;i<=20;i++)
    {
        $("#tn"+i).show();
    }
    $("#bn1").show();
    $("#bn2").show();
    if(pixnetnum>=18)
    {
        $("#bn1").hide();
        $("#bn2").hide();
    }
    else
    {
        pixnetpos=pixnetnum;
        for(let i=(pixnetnum+1);i<=20;i++)
        {
            $("#tn"+i).hide();
        }
    }
}
//移動選項列之內容
function move(n)
{
    if(n==1)
    {
        if(pixnetpos<20)
        {
            $("#tn"+(pixnetpos-pixnetnum+1)).hide();
            $("#tn"+(pixnetpos+1)).show();
            pixnetpos=pixnetpos+1;
            if(pixnetpos==20)
                document.getElementById("button2").disabled=true;
            else if(pixnetpos==2)
                document.getElementById("button1").disabled=false;
        }
    }
    else
    {
        if((pixnetpos-pixnetnum)>1)
        {
            $("#tn"+pixnetpos).hide();
            $("#tn"+(pixnetpos-pixnetnum)).show();
            pixnetpos=pixnetpos-1;
            if(pixnetpos==1)
                document.getElementById("button1").disabled=true;
            else if(pixnetpos==19)
                document.getElementById("button2").disabled=false;
        }
    }
}