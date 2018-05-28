/* 
	Template Generator 
	last-update : 2018/05/28
	
	@author : ted.kim@tosslab.com
*/



var keyObject = new Object();

//key와 언어별 문구를 1:1 대응으로 생성할 JSON 오브젝트
var KOL10nObj = {};
var ENL10nObj = {};
var JAL10nObj = {};
var TCL10nObj = {};
var SCL10nObj = {};

//stringify된 언어별 키&밸류가 담긴 JSON 오브젝트
var koL10N;
var enL10N;
var jaL10N;
var tcL10N;
var scL10N;
    

var koDataUri;
var enDataUri;
var jaoDataUri;
var tcDataUri;
var scDataUri;


var keyname;
var value;

var currentTempLang;
var currentTemptype;

var originalHTMLString;
var originText;

var selectedVal;
var tempPath = [ "",
				 "./temp/subscription.temp.html",
				 "./temp/paymentRequest.temp.html",
				 "./temp/billingComplete.temp.html",
				 "./temp/contractUpdate.temp.html",
				 "./temp/payment.agreement.temp.html"
				];


function getL10NKeys(keyname) {
  $.getJSON('http://localhost:8080/json/keys.json',
  function(parsedData) {
    keyObject = parsedData[keyname]; //testObject에 l10n keyname array를 대입
    
    for (var i = 0; i < keyObject.length; i++) {
	  KOL10nObj[keyObject[i].KEY] = keyObject[i].KO;
	  ENL10nObj[keyObject[i].KEY] = keyObject[i].EN;
	  JAL10nObj[keyObject[i].KEY] = keyObject[i].JA;
	  TCL10nObj[keyObject[i].KEY] = keyObject[i]["TC(zh-tw)"];
	  SCL10nObj[keyObject[i].KEY] = keyObject[i]["SC(zh-cn)"];
	}
    
    //KO l10n 오브젝트를 문자열화
    koL10N = JSON.stringify(KOL10nObj, null, "\t");
    koDataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(koL10N);
    
    //EN l10n 오브젝트를 문자열화
    enL10N = JSON.stringify(ENL10nObj, null, "\t");
    enDataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(enL10N);
    
    //JA l10n 오브젝트를 문자열화
    jaL10N = JSON.stringify(JAL10nObj, null, "\t");
    jaDataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(jaL10N);
    
    //TC l10n 오브젝트를 문자열화
    tcL10N = JSON.stringify(TCL10nObj, null, "\t");
    tcDataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(tcL10N);
    
    //SC l10n 오브젝트를 문자열화
    scL10N = JSON.stringify(SCL10nObj, null, "\t");
    scDataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(scL10N);
    
  });
  
}



$('select').change(function() {
    
  $(this).find('option:selected' ).each(function() {
    
    var selectedClass = $( this ).text(); // selectedClass 변수에 현재 선택된 옵션요소에 적힌 클래스 명을 입력.
	var selectedKeyID = $(this).parent().attr('id'); //해당 셀렉트 태그에서 id값 (스트링)을 받아와서 selectedKeyID 에 입력.
		
	console.log('selected ID) :', selectedKeyID);
	console.log('selected type :', selectedClass);
	
	
	if(selectedKeyID==="selectedLang") {
		
		if(selectedClass=="ko") {
			//console.log(koL10N);
			$('#importedJson').attr('src',koDataUri);
		}
		else if(selectedClass=="en") {
			//console.log(enL10N);
			$('#importedJson').attr('src',enDataUri); 
		}
		else if(selectedClass=="ja") {
			//console.log(jaL10N);
			$('#importedJson').attr('src',jaDataUri); 
		}
		else if(selectedClass=="zh-tw") {
			//console.log(tcL10N);
			$('#importedJson').attr('src',tcDataUri); 
		}
		else if(selectedClass=="zh-cn") {
			//console.log(scL10N);
			$('#importedJson').attr('src',scDataUri); 
		}
		
		currentTempLang = selectedClass;
		
	}
	
	else if(selectedKeyID==="selectedTemp") {
		selectedVal = $( this ).val();
		currentTempType = selectedVal;
		
		if(currentTempType == 5){
		  getL10NKeys("payment_agreement");
		}
		else {
		  getL10NKeys("email_template");
		}
	}
	
	loadTemp();
	    
  });
});

$('#resetL10N').click(function() {
	loadTemp();
});



$('#updateL10N').click(function() {
  console.log(currentTempLang, currentTempType);
  
  if(currentTempLang =="ko"){
	  replaceKeys(KOL10nObj);
  }
  else if(currentTempLang =="en"){
	  replaceKeys(ENL10nObj);
  }
  else if(currentTempLang =="ja"){
	  replaceKeys(JAL10nObj);
  }
  else if(currentTempLang =="zh-tw"){
	  replaceKeys(TCL10nObj);
  }
  else if(currentTempLang =="zh-cn"){
	  replaceKeys(SCL10nObj);
  }

});

function loadTemp() {
  
  $.ajax({
        type:"GET",
        url: tempPath[currentTempType],
            success:function(html){
                var list = $.parseHTML(html);
                originalHTMLString = JSON.stringify(html);
                $("#originalString").text(originalHTMLString);
                
                //console.log(originalHTMLString); //plain text

            }
        });
  
  $('#previewTempate').attr('src',tempPath[currentTempType]);
  
}


function replaceKeys(obj) {

  $("#originalString").text(originalHTMLString);
  originText = $('#originalString').text();  
  
  for(key in obj) {
    keyname =  JSON.stringify(key);
    keynameR = keyname.replace(/\"/g, ""); //remove quotation mark from key string
    value = JSON.stringify(obj[key]);
    valueR = value.replace(/\"/g, ""); //remove quotation mark from value string
    
    /* find keyname and replace with value on preview*/
    $('#previewTempate').contents().find( 'span:contains('+keynameR+')' ).replaceWith( "<span>"+valueR+"</span>" );
    
    //$('#originalString').text().replace('<span>'+keyname+'</span>', "<span>"+value+"</span>");
    
    originText = $('#originalString').text();
    
    if(keynameR == "@payment-email-payment-num-of-members-unit") { // '명' 단어 변환 시 5회 반복
	   for(var i=1;i<6;i++) {
		   originText = $('#originalString').text();
		   $('#originalString').text( originText.replace('<span>'+keynameR+'</span>', valueR ) );
	   }
    }
    else if( (keynameR == "@payment-email-total-amount") || (keynameR == "@payment-agreement-page-title") ) { // '최종 결제 금액' 단어 변환 시 2회 반복
	   for(var i=1;i<3;i++) {
		   originText = $('#originalString').text();
		   $('#originalString').text( originText.replace('<span>'+keynameR+'</span>', valueR ) );
	   }
    }

    else { // 그 외 단어 변환 시 1회만 수행
	   $('#originalString').text( originText.replace('<span>'+keynameR+'</span>', valueR ) );
    }
    
    //console.log( $('#originalString').text() );
    //console.log(keyname,valueR);
    
  }
  /* end for */
  
  //@current-year 키를 replaceYear() 함수가 실행된 시점의 연도로 변환
  var yearKey = "@current-year";
  var currentYear = moment().format('YYYY');
  
  $('#previewTempate').contents().find( 'span:contains('+yearKey+')' ).replaceWith( "<span>"+currentYear+"</span>" );
  $('#originalString').text( originText.replace('<span>'+yearKey+'</span>', currentYear ) );
  
}


