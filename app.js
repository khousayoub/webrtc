
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
	// Cette ligne pour régler un problème lié à mozzila qui ne connais getUSERMedia
	// qui permet d'autorisé l'utilisateur d'utiliser sa cam
function doEvent(p) { // cett function permet de gérer l'offre et la demande 
					// en fonction du peer créé
	p.on("signal", function(data){
		document.querySelector("#offer").textContent = JSON.stringify(data);
	}) // en cas ou on demande une offre ; on génére le code dans le textearea pour
	// l'envoyer aprés à l'autre utilisateur
	
	p.on("stream", function(stream){
		let receiver = document.querySelector("#receiver")
			receiver.src = window.URL.createObjectURL(stream);
			receiver.play();
	})
	
	p.on("error", function(err){
		console.log("erreur", err)
	})
	document.querySelector("#incomming").addEventListener("submit", function(e){
	e.preventDefault()
	p.signal(JSON.parse(e.target.querySelector("textarea").value))
})

}
function startPeer(initiator){
	navigator.getUserMedia({
		video:true,
		audio:true
	}, function(stream) {
		let p = new SimplePeer({
			initiator: initiator,
			stream: stream,
			trickle: false
		})
		doEvent(p);
		let video = document.querySelector("#emitter")
			video.src = window.URL.createObjectURL(stream);
			video.play();
	
	}, function(err){
		
	})
}

document.querySelector("#start").addEventListener("click", function(e){
	startPeer(true)
})

document.querySelector("#receive").addEventListener("click", function(e){
	startPeer(false)
})


