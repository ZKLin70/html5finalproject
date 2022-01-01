let map=[];
//點擊聯絡我們觸發，讀取資料庫中座標
function contactus()
{
    if($(window).width()<=992)
    {
        $(".sidenav").sidenav('close');
    }
    AddPreloader();
    ReadDatabase2();
}
//加入地圖與相關資訊
function AddContactusItem()
{
    document.getElementsByTagName("main")[0].innerHTML="<div class='container contactuscontainer'><div id='map'></div>";

    var txt='<h4>國立中興大學</h4>'+
    '<p>電話：04-22873181</p>'+
    '<p>地址：40227臺中市南區興大路145號（本校校門口位於興大路與學府路交叉口）</p>'+
    '<iframe height="500px" width="90%" src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q='+map[0][0]+', '+map[0][1]+'&z=15&t=p&output=embed" title="W3Schools Free Online Web Tutorials">'+
    '</iframe>'+
    '<a href="https://maps.google.com.tw/maps?daddr=24.12422722603651, 120.6753383576278" target="_blank"><h5>查詢前往路線<h5></a></div>'
    document.getElementById("map").innerHTML=txt;
}
//讀取資料庫
function ReadDatabase2()
{
    // https://developers.google.com/chart/interactive/docs/quick_start
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.	
    google.charts.setOnLoadCallback(init2);
}
function init2()
{
    // 這個例子使用的試算表是 https://docs.google.com/spreadsheets/d/1QScI5d56Kh-LGywY4WR6EvRGPcalFQYUAdqMxbFVDvk/copy
    // 將上述試算表另存副本後，你要在自己的雲端硬碟將該試算表設定成[知道連結的使用者都能查看]。
    // 然後讓程式讀取 https://docs.google.com/spreadsheets/d/瀏覽器網址列上的網址擷取序號部分/gviz/tq?sheet=工作表名稱
    // 也就是將下列的 1QScI5d56Kh-LGywY4WR6EvRGPcalFQYUAdqMxbFVDvk 更換成自己的檔案序號，以及最後部分指讀取哪個工作表。
    var url =
    'https://docs.google.com/spreadsheets/d/1KhVgZu4XXUTxoyr1AWsVsUb329uf-Elr09m1RVTBkow/edit#gid=0';
    //'https://docs.google.com/spreadsheets/d/1QScI5d56Kh-LGywY4WR6EvRGPcalFQYUAdqMxbFVDvk/gviz/tq?sheet=工作表1';
    var query = new google.visualization.Query(url);
    query.setQuery('select *');
    query.send(processSheetsData2);
}
//得到試算表回覆後，透過AddContactusItem函數呈現網頁
function processSheetsData2(response)
{
    var data = response.getDataTable();
    var columns = data.getNumberOfColumns();
    var rows = data.getNumberOfRows();
    
    for (var i=0; i<rows; i++){
        map[i]=new Array();
        for (var j=0; j<columns;j++){
            map[i][j] = data.getFormattedValue(i,j);
        }
    }
    AddContactusItem();
}