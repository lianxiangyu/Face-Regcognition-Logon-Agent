var buttonFace = document.getElementById("facelogon");

function credentialInput(id, psw)
{
    document.getElementById("j_username").value = parsedCredential.id;
    document.getElementById("j_password").value = parsedCredential.psw;
    document.getElementById("logOnFormSubmit").click();
}

buttonFace.onclick = function() {

	// XMLHttpRequest
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/face_check", true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = "";
			try {
				response = eval("(" + xhr.responseText + ")");
			} catch (e) {
				alert("error")
			}

			var responseCredential = xhr.responseText
			var parsedCredential = JSON.parse(responseCredential)

//			var newxhr = new XMLHttpRequest();
//			newxhr.open("GET", "https://demo-custom.cn1.sapbusinessobjects.cloud");
//			newxhr.send();
//
//			newxhr.onreadystatechange = function() {
//				if (newxhr.readyState == 4 && newxhr.status == 200) {
//					document.getElementById("j_username").value = parsedCredential.id
//					document.getElementById("j_password").value = parsedCredential.psw
//					document.getElementById("logOnFormSubmit").click()
//				}
//			}

			window.location.href = "https://demo-custom.cn1.sapbusinessobjects.cloud";

//            setTimeout(credentialInput(parsedCredential.id, parsedCredential.psw), 1000)

		}
	};
};