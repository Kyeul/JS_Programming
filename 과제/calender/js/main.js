
function makeCalender(){

  monthDay = [31,'feb',31,30,31,30,31,31,30,31,30,31];

  var calenderBody = document.getElementById('content');
  var row = calenderBody.insertRow(calenderBody.rows.length);

  var count = 0;

  var calenderDate = new Date();
  var year = calenderDate.getFullYear();
  var month = calenderDate.getMonth();
  var date = calenderDate.getDate();
  
  var first = new Date(year, month, 1);
  var last = new Date(year, month, monthDay[month]);
  // 시작일 전 공란 생성
  for(var i=0; i<first.getDay(); i++){
    cell = row.insertCell();
    count += 1;
  }

  for(var i=0; i<monthDay[month];i++){
    cell =row.insertCell();
    cell.innerHTML = i+1;
    count += 1;

    if(count%7 ==0){
      row = calenderBody.insertRow(calenderBody.rows.length);
    }
  }
  for(i = last.getDay(); i<6;i++){
    cell = row.insertCell();

  }
}

