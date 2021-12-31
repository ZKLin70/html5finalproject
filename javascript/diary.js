const d=new Date();
let year=d.getFullYear();
let month=d.getMonth();
let date=d.getDate();
let changed=0;
let data=[];
let doc=[[0,2021,12,30,'07,09','30,50','09,10','50,50','123,456',"一二三四五六七八九十",000]];
const days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(year%4==0)
{
    if(year%100==0&&year%400!=0);
    else
    {
        days[1]=29;
    }
}
//透過得到該月第一天星期幾產生月曆，傳入的參數為欲查詢的月份與當下月份的差距
function calendar(number){
    month=month+number;
    changed=changed+number;
    while(month>=12)
    {
        month=month-12;
        year=year+1;
    }
    while(month<0)
    {
        month=month+12;
        year=year-1;
    }
    const e=new Date('"'+(month+1)+' 1,'+year+'"');
    let first=e.getDay();
    if(year%4==0)
    {
        if(year%100==0&&year%400!=0);
        else
        {
            days[1]=29;
        }
    }
    
    let text="<div class='daycontainer'>";
    text+="<table>";
    text+="<tr>";
        text+="<td class='YM'>";
            text+="<div id='year'>"+year+"</div>";
        text+="</td>";
        text+="<td class='YM' colspan='2'>";
            text+="<div id='month'>"+(month+1)+"</div>";
        text+="</td>";
        text+="<td class='YM' colspan='2'></td>";
        text+="<td class='YM button'>";
            text+="<div onclick='calendar(1)'>︿</div>";
        text+="</td>";
        text+="<td class='YM button'>";
            text+="<div onclick='calendar(-1)'>﹀</div>";
        text+="</td></tr>";
    
    let day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    text+="<tr>";
    for(let i=0;i<7;i++)
    {
        text+="<td class='Day'>";
            text+="<div>"+day[i]+".</div>";
        text+="</td>";
    }
    text+="</tr>";

    let num=days[month]-(7-first)-21;
    let count=1;
    if(num>=7)
        num=6;
    else
        num=5;
    for(let i=0;i<num;i++)
    {
        text+='<tr>';
        for(let j=0;j<7;j++)
        {
            let link="index.html?id=2&change="+changed+"&day="+count;
            link="'"+link+"'";
            if(i==0&&j<first)
            {
                text+='<td></td>';
                continue;
            }
            else if(i==(num-1)&&count>days[month])
            {
                text+='<td></td>';
                continue;
            } 
            else if(j==0||j==6)
                text+='<td id="event'+count+'" class="holiday" onclick="window.location.href='+link+'">';
            else
                text+='<td id="event'+count+'" class="weekday" onclick="window.location.href='+link+'">';
                    text+='<div class="dayinmonth">'+count+'</div>';
                    text+='<div id="task'+count+'" class="event"></div>';
                text+='</td>';
            count=count+1;
        }
        text+='</tr>';
    }
    text+='</table>';
    text+='</div>';
    document.getElementsByTagName("main")[0].innerHTML=text;
    CheckTask();
}
//產生月曆後確認資料庫中是否有某天的紀錄並加入月曆中
function CheckTask()
{
    for(let i=0;i<doc.length;i++)
    {
        if(doc[i][1]==year&&doc[i][2]==(month+1))
        {
            var temp="task"+doc[i][3];
            document.getElementById(temp).innerHTML=doc[i][9];
        }
    }
}
//點擊今日觸發，將月份變更完後，傳給DiaryContent函數參數0以重置已變更的月份值，並驗證month值
function Today()
{
    if($(window).width()<=992)
    {
        $(".sidenav").sidenav('close');
    }

    month=month-changed;
    DiaryContent(0,date);
}
//每進入此網頁，便會到這讀取參數，id為功能辨別，change為已變更月份，day為欲查詢資料的日期
function ReadParameter()
{
    var X = decodeURIComponent(GetUrlVar('id'));
    if(X=="")
    {
        MainPage();
    }
    else
    {
        var id = Number(X);
        if(id==0)
        {
            calendar(0);
        }
        else if(id==1)
        {
            X = decodeURIComponent(GetUrlVar('change'));
            var change = Number(X);
            calendar(change);
        }
        else if(id==2)
        {
            X = decodeURIComponent(GetUrlVar('change'));
            var change = Number(X);
            X = decodeURIComponent(GetUrlVar('day'));
            var day = Number(X);
            DiaryContent(change,day);
        }
        else if(id==3)
        {
            pixnet(0);
        }
        else if(id==4)
        {
            PrintDatabase();
        }
    }
}
//得到url的參數
function GetUrlVar(VarName)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + VarName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}
//某日的詳細內容，參數change為查詢月份與現在月份的差距，day為查詢日期
function DiaryContent(change,day)
{
    month=month+change;
    changed=change;
    while(month>=12)
    {
        month=month-12;
        year=year+1;
    }
    while(month<0)
    {
        month=month+12;
        year=year-1;
    }

    var text="";
    text+='<div class="container daycontainer grey lighten-3">';
        text+='<div><h5>'+year+'/'+(month+1)+'/'+day+'</h5></div>';
        text+='<form class="col s12" name="form">';
            text+='<table id="data"></table><br><br>';
            text+='<div class="row">';
                text+='<div class="input-field col s2 offset-s2">';
                    text+='<select id="shr">';
                        text+='<option value="00" selected>00</option>';
                        text+='<option value="01">01</option>';
                        text+='<option value="02">02</option>';
                        text+='<option value="03">03</option>';
                        text+='<option value="04">04</option>';
                        text+='<option value="05">05</option>';
                        text+='<option value="06">06</option>';
                        text+='<option value="07">07</option>';
                        text+='<option value="08">08</option>';
                        text+='<option value="09">09</option>';
                        text+='<option value="10">10</option>';
                        text+='<option value="11">11</option>';
                        text+='<option value="12">12</option>';
                        text+='<option value="13">13</option>';
                        text+='<option value="14">14</option>';
                        text+='<option value="15">15</option>';
                        text+='<option value="16">16</option>';
                        text+='<option value="17">17</option>';
                        text+='<option value="18">18</option>';
                        text+='<option value="19">19</option>';
                        text+='<option value="20">20</option>';
                        text+='<option value="21">21</option>';
                        text+='<option value="22">22</option>';
                        text+='<option value="23">23</option>';
                    text+='</select>';
                    text+='<label>幾點</label>';
                text+='</div>';
                text+='<div class="input-field col s2">';
                    text+='<select id="smin">';
                        text+='<option value="00" selected>00</option>';
                        text+='<option value="10">10</option>';
                        text+='<option value="20">20</option>';
                        text+='<option value="30">30</option>';
                        text+='<option value="40">40</option>';
                        text+='<option value="50">50</option>';
                    text+='</select>';
                    text+='<label>幾分</label>';
                text+='</div>';
                text+='<div class="input-field col s2">';
                    text+='<select id="dhr">';
                        text+='<option value="00" selected>00</option>';
                        text+='<option value="01">01</option>';
                        text+='<option value="02">02</option>';
                        text+='<option value="03">03</option>';
                        text+='<option value="04">04</option>';
                        text+='<option value="05">05</option>';
                        text+='<option value="06">06</option>';
                        text+='<option value="07">07</option>';
                        text+='<option value="08">08</option>';
                        text+='<option value="09">09</option>';
                        text+='<option value="10">10</option>';
                        text+='<option value="11">11</option>';
                        text+='<option value="12">12</option>';
                        text+='<option value="13">13</option>';
                        text+='<option value="14">14</option>';
                        text+='<option value="15">15</option>';
                        text+='<option value="16">16</option>';
                        text+='<option value="17">17</option>';
                        text+='<option value="18">18</option>';
                        text+='<option value="19">19</option>';
                        text+='<option value="20">20</option>';
                        text+='<option value="21">21</option>';
                        text+='<option value="22">22</option>';
                        text+='<option value="23">23</option>';
                    text+='</select>';
                    text+='<label>幾點</label>';
                text+='</div>';
                text+='<div class="input-field col s2">';
                    text+='<select id="dmin">';
                        text+='<option value="00" selected>00</option>';
                        text+='<option value="10">10</option>';
                        text+='<option value="20">20</option>';
                        text+='<option value="30">30</option>';
                        text+='<option value="40">40</option>';
                        text+='<option value="50">50</option>';
                    text+='</select>';
                    text+='<label>幾分</label>';
                text+='</div>';
            text+='</div>';
            text+='<div class="row">';
                text+='<div class="input-field col s6 offset-s3">';
                    text+='<input id="task" type="text" class="validate">';
                    text+='<label for="task">事項</label>';
                text+='</div>';
            text+='</div>';
            text+='<div class="row">';
                text+='<button class="submit waves-effect waves-light btn-small" onclick="Input()">輸入</button>';
                text+='<button class="waves-effect waves-light btn-small" onclick="Clear()">清空</button>';
            text+='</div><br><br>';
            text+='<div class="row">';
                text+='<div class="input-field col s6 offset-s3">';
                    text+='<input id="important" type="text">';
                    text+='<label for="important">重要事項</label>';
                text+='</div>';
            text+='</div>';
            text+='<div class="row">';
                text+='<div class="input-field col s6 offset-s3">';
                    text+='<textarea id="textarea" class="materialize-textarea"></textarea>';
                    text+='<label for="textarea">隨筆</label>';
                text+='</div>';
            text+='</div>';
            text+='<button class="submit btn waves-effect waves-light" onclick="FormResponse('+day+')">儲存</button>';
            text+='<button class="submit btn waves-effect waves-light" onclick="Return()">返回</button>';
        text+='</form>';
    text+='</div>';
    document.getElementsByTagName("main")[0].innerHTML=text;

    M.textareaAutoResize($('#textarea'));

    $(document).ready(function(){
        $('select').formSelect();
    });
    FormInitialize(day);
}
//在某日詳細內容中，點擊返回觸發，回到月曆
function Return()
{
    window.location.href="index.html?id=1&change="+changed;
    event.preventDefault();
}
//在某日詳細內容中，查詢資料庫是否有該天資料，若有，便加入至內容中
function FormInitialize(day)
{
    data=[];
    for(let i=(doc.length-1);i>=0;i--)
    {
        if(doc[i][1]==year&&doc[i][2]==(month+1)&&doc[i][3]==day)
        {
            let shr=doc[i][4].split(',');
            let smin=doc[i][5].split(',');
            let dhr=doc[i][6].split(',');
            let dmin=doc[i][7].split(',');
            let task=doc[i][8].split(',');
            for(let j=0;j<shr.length;j++)
            {
                var temp=data.length;
                data[temp]=[];
                data[temp][0]=shr[j];
                data[temp][1]=smin[j];
                data[temp][2]=dhr[j];
                data[temp][3]=dmin[j];
                data[temp][4]=task[j];
            }
            document.getElementById("important").value=doc[i][9];
            document.getElementById("textarea").value=doc[i][10];
            $(document).ready(function() {
                M.updateTextFields();
              });
            DataPresent();
            break;
        }
    }
}
//在某日詳細內容中，點擊輸入觸發，將某個時段與事務加入至資料中
function Input()
{
    var shr=document.getElementById("shr").value;
    var smin=document.getElementById("smin").value;
    var dhr=document.getElementById("dhr").value;
    var dmin=document.getElementById("dmin").value;
    var task=document.getElementById("task").value;

    var temp=data.length;
    data[temp]=[];
    data[temp][0]=shr;
    data[temp][1]=smin;
    data[temp][2]=dhr;
    data[temp][3]=dmin;
    data[temp][4]=task;
    DataPresent();
    event.preventDefault();
}
//在某日詳細內容中，呈現data陣列中的資料
function DataPresent()
{
    var text="";
    for(let i=0;i<data.length;i++)
    {
        if($(window).width()>=491)
        {
            text+='<tr class="row">';
                text+='<td class="col s4"><p>'+data[i][0]+':'+data[i][1]+'~'+data[i][2]+':'+data[i][3]+'</p></td>';
                text+='<td class="col s4"><p>'+data[i][4]+'</p></td>';
                text+='<td class="right"><button class="submit waves-effect waves-light btn-small" onclick="MoveUpData('+i+')">上移</button>';
                text+='<button class="submit waves-effect waves-light btn-small" onclick="DeleteData('+i+')">刪除</button></td>';
            text+='</tr>';
        }
        else
        {
            text+='<tr class="row">';
                text+='<td class="col s6"><p>'+data[i][0]+':'+data[i][1]+'~'+data[i][2]+':'+data[i][3]+'</p></td>';
                text+='<td class="col s6"><p>'+data[i][4]+'</p></td>';
            text+='</tr>';
            text+='<tr class="row">';
                text+='<td class="center"><button class="submit waves-effect waves-light btn-small" onclick="MoveUpData('+i+')">上移</button>';
                text+='<button class="submit waves-effect waves-light btn-small" onclick="DeleteData('+i+')">刪除</button></td>';
            text+='</tr>';
        }
        
    }
    document.getElementById("data").innerHTML=text;
}
//在某日詳細內容中，將列表中的某列上移
function MoveUpData(num)
{
    if(num!=0)
    {
        var temp=data[num-1];
        data[num-1]=data[num];
        data[num]=temp;
        DataPresent();
    }
    event.preventDefault();
}
//在某日詳細內容中，刪除列表中的某列
function DeleteData(num)
{
    data.splice(num,1);
    DataPresent();
    event.preventDefault();
}
//在某日詳細內容中，重置某時段與事務的輸入
function Clear()
{
    document.getElementById("shr").value="00";
    document.getElementById("smin").value="00";
    document.getElementById("dhr").value="00";
    document.getElementById("dmin").value="00";
    document.getElementById("task").value="";
    $('select').formSelect();
    event.preventDefault();
}
//在某日詳細內容中，將列表內容處理後，將所有資訊上傳至資料庫
function FormResponse(day)
{
    var shr="";
    var smin="";
    var dhr="";
    var dmin="";
    var task="";
    for(let i=0;i<data.length;i++)
    {
        if(i!=0)
        {
            shr+=",";
            smin+=",";
            dhr+=",";
            dmin+=",";
            task+=",";
        }
        shr+=data[i][0];
        smin+=data[i][1];
        dhr+=data[i][2];
        dmin+=data[i][3];
        task+=data[i][4];
    }
    var important = document.forms["form"]["important"].value;
    var textarea = document.forms["form"]["textarea"].value;
    var MySubmit = "https://docs.google.com/forms/d/e/1FAIpQLSfzAmJLWqBFjLq4WsWA6DBaqMHRYlL95Jp11_LPMB33iUVeEg/formResponse?usp=pp_url&entry.2133235783="+year+"&entry.1419523339="+(month+1)+"&entry.2116723698="+day+"&entry.1892830639="+shr+"&entry.587725558="+smin+"&entry.740559503="+dhr+"&entry.1440212711="+dmin+"&entry.1474711690="+task+"&entry.1827660273="+important+"&entry.1558330192="+textarea;
    var NewOpen = window.open(MySubmit);
    ReadDatabase();
}
//讀取資料庫資料至doc陣列，進入網站或資料庫內容更改時觸發
function ReadDatabase()
{
    // https://developers.google.com/chart/interactive/docs/quick_start
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.	
    google.charts.setOnLoadCallback(init);
}
ReadDatabase();

function init()
{
    // 這個例子使用的試算表是 https://docs.google.com/spreadsheets/d/1QScI5d56Kh-LGywY4WR6EvRGPcalFQYUAdqMxbFVDvk/copy
    // 將上述試算表另存副本後，你要在自己的雲端硬碟將該試算表設定成[知道連結的使用者都能查看]。
    // 然後讓程式讀取 https://docs.google.com/spreadsheets/d/瀏覽器網址列上的網址擷取序號部分/gviz/tq?sheet=工作表名稱
    // 也就是將下列的 1QScI5d56Kh-LGywY4WR6EvRGPcalFQYUAdqMxbFVDvk 更換成自己的檔案序號，以及最後部分指讀取哪個工作表。
    var url =
    'https://docs.google.com/spreadsheets/d/1WClmtt099ih_OyGbLiiB4QSMIv5PwlC1AxGzhuhXURs/edit#gid=0';
    //'https://docs.google.com/spreadsheets/d/1QScI5d56Kh-LGywY4WR6EvRGPcalFQYUAdqMxbFVDvk/gviz/tq?sheet=工作表1';
    var query = new google.visualization.Query(url);
    query.setQuery('select *');
    query.send(processSheetsData);
}
//得到試算表回覆後，重新讀取參數並呈現網頁
function processSheetsData(response)
{
    var data = response.getDataTable();
    var columns = data.getNumberOfColumns();
    var rows = data.getNumberOfRows();
    
    doc=[];
    for (var i=0; i<rows; i++){
        doc[i]=new Array();
        for (var j=0; j<columns;j++){
            doc[i][j] = data.getFormattedValue(i,j);
        }
    }
    ReadParameter();
}
//點擊資料庫觸發，呈現資料庫中內容
function PrintDatabase()
{
    var text="<div class='databasecontainer'>";
    text+="<table class='database'>";
    text+="<tr class='Type'>";
        text+="<td>時間戳記</td>";
        text+="<td>年</td>";
        text+="<td>月</td>";
        text+="<td>日</td>";
        text+="<td>SHR</td>";
        text+="<td>SMIN</td>";
        text+="<td>DHR</td>";
        text+="<td>DMIN</td>";
        text+="<td>TASK</td>";
        text+="<td>IMPORTANT</td>";
        text+="<td>TEXTAREA</td>";
    text+="</tr>";
    for(let i=0;i<doc.length;i++)
    {
        text+="<tr>";
        for(let j=0;j<doc[i].length;j++)
        {
            text+="<td>"+doc[i][j]+"</td>";
        }
        text+="</tr>";
    }
    text+="</table>";
    text+="</div>";
    document.getElementsByTagName("main")[0].innerHTML=text;
}
//首頁內容建構並加入相關資訊
function MainPage()
{
    let name=["今日行程","每週重點","近期更動","新聞趣事"];
    var text="";
    text+="<div class='container mpcontainer'>";
        text+="<div class='row'>";
            //今日行程
                var link="'Today()'";
                text+="<div class='card medium mpc'>";
                    text+="<div class='card-content'>";
                        text+="<span class='card-title activator grey-text text-darken-4'>"+name[0]+"<i class='material-icons right'>more_vert</i></span>";
                    text+="</div>";
                    text+="<div class='card-reveal'>";
                        text+="<span class='card-title grey-text text-darken-4'>"+name[0]+"<i class='material-icons right'>close</i></span>";
                        text+="<div id='information1'></div>";
                    text+="</div>";
                    text+="<div class='cardimage center waves-effect waves-block waves-light' onclick="+link+">";
                        text+="<img class='imageincard' src='img/mpc1.jfif'>";
                    text+="</div>";
                text+="</div>";
            //每週重點
                link="window.location.href='index.html?id=0'";
                text+="<div class='card medium mpc'>";
                    text+="<div class='card-content'>";
                        text+="<span class='card-title activator grey-text text-darken-4'>"+name[1]+"<i class='material-icons right'>more_vert</i></span>";
                    text+="</div>";
                    text+="<div class='card-reveal'>";
                        text+="<span class='card-title grey-text text-darken-4'>"+name[1]+"<i class='material-icons right'>close</i></span>";
                        text+="<div id='information2'></div>";
                    text+="</div>";
                    text+="<div class='cardimage center waves-effect waves-block waves-light' onclick="+link+">";
                        text+="<img class='imageincard' src='img/mpc2.jfif'>";
                    text+="</div>";
                text+="</div>";
            //近期更動
                link="window.location.href='index.html?id=4'";
                text+="<div class='card medium mpc'>";
                    text+="<div class='card-content'>";
                        text+="<span class='card-title activator grey-text text-darken-4'>"+name[2]+"<i class='material-icons right'>more_vert</i></span>";
                    text+="</div>";
                    text+="<div class='card-reveal'>";
                        text+="<span class='card-title grey-text text-darken-4'>"+name[2]+"<i class='material-icons right'>close</i></span>";
                        text+="<div id='information3'></div>";
                    text+="</div>";
                    text+="<div class='cardimage center waves-effect waves-block waves-light' onclick="+link+">";
                        text+="<img class='imageincard' src='img/mpc3.jfif'>";
                    text+="</div>";
                text+="</div>";
            //新聞趣事
                link="window.location.href='index.html?id=3'";
                text+="<div class='card medium mpc' onclick="+link+">";
                    text+="<div class='card-content'>";
                        text+="<span class='card-title grey-text text-darken-4'>"+name[3]+"</span>";
                    text+="</div>";
                    text+="<div class='cardimage center waves-effect waves-block waves-light'>";
                        text+="<img class='imageincard' src='img/mpc4.jfif'>";
                    text+="</div>";
                text+="</div>";
        text+="</div>";
    text+="</div>";

    document.getElementsByTagName("main")[0].innerHTML=text;

    //今日行程
    for(let i=(doc.length-1);i>=0;i--)
    {
        if(doc[i][1]==year&&doc[i][2]==(month+1)&&doc[i][3]==date)
        {
            let shr=doc[i][4].split(',');
            let smin=doc[i][5].split(',');
            let dhr=doc[i][6].split(',');
            let dmin=doc[i][7].split(',');
            let task=doc[i][8].split(',');
            for(let j=0;j<shr.length;j++)
            {
                var temp=data.length;
                data[temp]=[];
                data[temp][0]=shr[j];
                data[temp][1]=smin[j];
                data[temp][2]=dhr[j];
                data[temp][3]=dmin[j];
                data[temp][4]=task[j];
            }
            break;
        }
    }
    text="<table><tr><td>時間</td><td>事務</td></tr>";
    for(let i=0;i<data.length;i++)
    {
        text+="<tr>";
            text+="<td>"+data[i][0]+":"+data[i][1]+"~"+data[i][2]+":"+data[i][3]+"</td>";
            text+="<td>"+data[i][4]+"</td>";
        text+="</tr>";
    }
    text+="</table>";
    document.getElementById("information1").innerHTML=text;
    //每週重點
    const e=new Date('"'+(month+1)+' '+date+','+year+'"');
    let num=e.getDay();
    num=date-num-1;

    text="<table><tr><td>日期</td><td>重要事務</td></tr>";
    for(let i=0;i<7;i++)
    {
        num=num+1;
        if(num>days[month])
        {
            num=num-days[month];
            month=month+1;
            changed=changed+1;
            if(month>=12)
            {
                month=0;
                year=year+1;
            }
        }
        for(let j=(doc.length-1);j>=0;j--)
        {
            if(doc[j][1]==year&&doc[j][2]==(month+1)&&doc[j][3]==num)
            {
                text+="<tr>";
                    text+="<td>"+year+"/"+(month+1)+"/"+num+"</td>";
                    text+="<td>"+doc[j][9]+"</td>";
                text+="</tr>";
                break;
            }
        }
    }
    text+="</table>";
    document.getElementById("information2").innerHTML=text;
    month=month-changed;
    changed=0;
    //近期更動
    text="<table><tr><td>更動日期</td><td>日期</td><td>事務</td></tr>";
    if(doc.length<5)
    {
        for(let i=0;i<doc.length;i++)
        {
            text+="<tr>";
                text+="<td>"+doc[i][0]+"</td>";
                text+="<td>"+doc[i][1]+"/"+doc[i][2]+"/"+doc[i][3]+"</td>";
                text+="<td>"+doc[i][9]+"</td>";
            text+="</tr>";
        }
    }
    else
    {
        for(let i=0;i<5;i++)
        {
            var temp=doc.length-1-i;
            text+="<tr>";
                text+="<td>"+doc[temp][0]+"</td>";
                text+="<td>"+doc[temp][1]+"/"+doc[temp][2]+"/"+doc[temp][3]+"</td>";
                text+="<td>"+doc[temp][9]+"</td>";
            text+="</tr>";
        }
    }
    text+="</table>";
    document.getElementById("information3").innerHTML=text;
}