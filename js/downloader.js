/* 
	Template Downloader 
	last-update : 2018/05/25
	
	@author : ted.kim@tosslab.com
*/


//download current template.
$('#downloadTemplate').click(function() {
	
	var convertedString = $('#originalString').text();
	convertedString = convertedString.replace(/\\"/g, '"')
					  .replace(/<script.*<\/script>/g, "") //스크립트 영역 제거
					  .replace(/\\n/g, "\n") //줄바꿈 적용
					  .replace(/\\t/g, "	") //탭 적용
					  .replace(/\\/g, '"') //footer a태그 내 따옴표 적용
					  .replace(/\"<!/g, "<!") //문서처음 따옴표 제거
					  .replace(/currentLang/g, currentTempLang )
					  .replace(/\/html>"/g, "/html>"); //문서끝 따옴표 제거
	
	//external library (http://danml.com/download.html)
	//download(data, strFileName, strMimeType);
	
	if(currentTempType==1){ // 1. 정기 결제 신청 완료
		download(convertedString, 'subscription.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==2){ // 2. 결제 신청서
		download(convertedString, 'paymentRequest.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==3){ // 3. 결제 내역
		download(convertedString, 'billingComplete.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==4){ // 4. 결제 정보 업데이트
		download(convertedString, 'contractUpdate.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==5){ // 5. 정기 과금 이용 약관
		download(convertedString, 'payment_agreement_'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==6){ // 6. 차단안내
		download(convertedString, 'removalNotification.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==7){ // 7. 이메일 인증
		download(convertedString, 'confirmation.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==8){ // 8. 차단 해제
		download(convertedString, 'enabledMember.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==9){ // 9. 비밀번호 재설정 안내
		download(convertedString, 'forgotPassword.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==10){ // 10. 비밀번호 변경 안내
		download(convertedString, 'passwordChanged.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==11){ // 11. 인증코드 안내
		download(convertedString, 'verification.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==12){ // 12. 가입 후 이메일 인증 안내
		download(convertedString, 'activation.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==13){ // 13. 팀 - 도메인 변경 안내
		download(convertedString, 'domainChanged.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==14){ // 14. 팀 - 도메인 변경 안내
		download(convertedString, 'invite.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==15){ // 15. 팀 - 관리자 지정 안내
		download(convertedString, 'ownershipTransferred.'+currentTempLang+'.html', "text/html");
	}
	else if(currentTempType==16){ // 16. 팀 - 팀 삭제 안내
		download(convertedString, 'teamDeleted.'+currentTempLang+'.html', "text/html");
	}
	
	
});
