
// 전역변수
num = 0;
arr_frml = [];
result = 0;
check_btn = 0;
check_frac = 0;

// 사칙연산자 함수
function sum(num, now){
	return num + now;
}
function diff(num, now){
	return num - now;
}
function mult(num, now){
	return num * now;
}
function div(num, now){
	return num / now;
}

// 수식 배열을 보여주는 함수
function arrFormula(arr_frml){
	var prnt_frml =''
	for (i=0; i<arr_frml.length; i++){
				prnt_frml += arr_frml[i]+' ';	
			}
	return prnt_frml
}

// 숫자에 콤마 넣기(출처: https://lehero.tistory.com/263)
function numberFormat(inputNumber) {
   	var parts=inputNumber.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

// 콤마 있는 숫자를 정수로 변환
function stringToInt(value){
    return value.replace(/,/g, '');
}

// 사용자가 버튼을 클릭하면 함수 실행
function get_btn(btn, mode){

	var crnt = document.getElementById('crnt-nmbr');
	var frml = document.getElementById('formula');

	// 숫자가 입력되면 실행
	if (mode == 0){
		if(check_btn==1 || crnt.value==0){
			crnt.value = null;
		}
		crnt.value = numberFormat(stringToInt(crnt.value)+btn);
		check_btn = 0;
	}

	else if(mode == 3){
		if(btn == "."){
			if(check_btn == 1 || crnt.value == 0){
				crnt.value = null;
				crnt.value = 0 +'.'
			}else if (check_frac == 0) {
				crnt.value = crnt.value + '.'
				check_frac = 1;
			}
		}
	}

	// 연산자가 입력되면 실행
	else if (mode == 1){
		var operator = btn;
		
		//  연산자가 연속 두 번 눌렸을 경우 
		if (check_btn == 1){
			var crnt_1 = crnt.value.substring(0, crnt.value.length) 
			arr_frml.pop()
			frml.value = arrFormula(arr_frml) + btn; // 기존 연산자를 지우고 새로운 연산자로 대체
			arr_frml.push(btn)
		}

		// 연산자가 처음 눌렸을 경우
		else{
			num = stringToInt(crnt.value);
			arr_frml.push(num)
			arr_frml.push(btn)
			frml.value = arrFormula(arr_frml)
		}
		check_btn = 1; //연산자 체크

	}
	// 계산기 reset
	else if(mode == 2){
		// 전체 초기화
		if(btn == 'all'){
			num = 0;
			result = 0;
			check_btn = 0;
			check_frac = 0;
			arr_frml.length = 0;
			frml.value = arrFormula(arr_frml);
			crnt.value = 0;

		}
		// 입력 숫자 초기화
		else if(btn == 'crnt'){
			crnt.value = 0;
		}
		// 입력 숫자의 마지막 숫자 제거
		else{

			crnt.value = numberFormat(stringToInt(crnt.value.substring(0, crnt.value.length-1)))
		}
	}
}