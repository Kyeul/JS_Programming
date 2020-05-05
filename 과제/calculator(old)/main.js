
// 전역변수
num = 0;	//     ','가 없이 숫자만 들어가는 변수
arr_frml = [];	//  계산식이 저장되는 배열
result = 'f';  //  계산된 결과가 들어갈 변수, 계산기 시작을 구별하기 위해 초기에 문자가 들어간다.
check_btn = 0; //  연산자 중복 입력을 방지할 변수
check_equal = 0;// 계산이 끝났음을 확인하는 변수

// 수식 배열을 보여주는 함수
function showFormula(arr_frml){
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
function getBtn(btn, mode){

	var crnt = document.getElementById('crnt-nmbr');
	var frml = document.getElementById('formula');

	// 숫자가 입력되면 실행
	if (mode == 0){
		// 계산이 끝나고 새로 숫자가 입력될 때 crnt.value값을 0으로 초기화하고 check_equal을 0으로 초기화
		if(check_equal == 1){
			crnt.value = 0;
			check_equal = 0;
		}
		// 연산자가 입력됐거나 계산기 초기값 0이 있을 경우 값을 지우고 새로운 수를 받는다.
		if(check_btn==1 || crnt.value === '0' ){
			crnt.value = null;
		}

		// 소수점 처리
		if(btn == '.'){
			// crnt.value가 없으면 0과 함께 소수점 추가
			if(crnt.value.length == 0){
				crnt.value = 0 + btn;
			}
			// 소수점이 없는 경우에만 입력
			else if(crnt.value.indexOf('.',0) == -1){
				crnt.value = crnt.value + '.'
			}
		}
		// 입력 받은 숫자를 추가한다.
		else{
			crnt.value = numberFormat(stringToInt(crnt.value)+btn);	
		}
		
		check_btn = 0;
	}

	// 연산자가 입력되면 실행
	else if (mode == 1){
		// 최초의 입력 값은 result 변수에 들어간다.
		if (result == 'f'){
			result = stringToInt(crnt.value);
		}

		//  연산자가 연속 두 번 눌렸을 경우 
		if (check_btn == 1){
			var crnt_1 = crnt.value.substring(0, crnt.value.length) 
			arr_frml.pop()
			frml.value = showFormula(arr_frml) + btn; // 기존 연산자를 지우고 새로운 연산자로 대체
			arr_frml.push(btn)
		}

		// 연산자가 처음 눌렸을 경우
		else{
			num = stringToInt(crnt.value);
			// 마지막 숫자가 소수점만 있다면 . 제거
			if (num.indexOf('.',0) == num.length-1){
				num = num.substring(0, num.length-1);
			}
			arr_frml.push(num);
			
			// 사칙연산 수행
			if(arr_frml.length>2){
				result = eval(result + arr_frml[arr_frml.length-2] + arr_frml[arr_frml.length-1]);
			}
			
			arr_frml.push(btn);
			frml.value = showFormula(arr_frml);
			crnt.value = numberFormat(result);
			
		}
		check_btn = 1; //연산자 체크
		
		if(btn == '='){
			// 계산 완료 후 각종 변수 초기화
					arr_frml.length = 0;
					num = 0;
					result = 'f';
					check_btn = 0;
					check_equal = 1;

				}
	}
// // 음수 추가
// 	else if(mode == 3){
// 		if(btn =='nega'){
// 			if(crnt.value.indexOf('-', 0 ) == 0){
// 				crnt.value = crnt.value.substring(1, crnt.value.length);
// 			}else{
// 				crnt.value = '-' + crnt.value;
// 			}
// 		}
// 	}

	// reset
	else if(mode == 2){
		// 전체 초기화
		if(btn == 'all'){
			num = 0;
			result = 'f';
			check_btn = 0;
			arr_frml.length = 0;
			frml.value = showFormula(arr_frml);
			crnt.value = 0;
		}
		// 입력 숫자 초기화
		else if(btn == 'crnt'){
			crnt.value = 0;
		}
		// 입력 숫자의 마지막 숫자 제거
		else{
			crnt.value = numberFormat(stringToInt(crnt.value.substring(0, crnt.value.length-1)));
			if(crnt.value.length == 0 || crnt.value == '-'){
				crnt.value = 0
			}
		}
	}
}