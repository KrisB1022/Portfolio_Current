# README #

### What is this for? ###

	*	This is the XBOX Halo 5 - France
	* v - 27.08.2015
	* Developer - Kris Byrum - Ten Gun Design (Edmonds, WA)

### Delivered Files ###

	* Files
		- index.html
		- js/ 
			- app.head.min.js (plug ins - in head)
			- app.footer.min.js (plug ins - in footer)
			- main.js (dev code)
		- css/
			- app.min.css (plug ins)
			- main.css (dev code)
		- fonts/
		- imgs/
		- videos/
		- README.txt


### Functionality | fonctionnalité ###

- English 
	(Google Traduire en français)

app.js
	- Controls active voting state and calculating winner for week.
		(Contrôle état ​​de vote actif et vainqueur de calcul pour la semaine.)

	- Set openForVoting to true for specific week when voting is open. Otherwise set to false.
		(Réglez openForVoting à vrai pour la semaine spécifique lors du vote est ouvert . Sinon la valeur false.)

	- **Important**
		The voting form will submit an AJAX request to your database and must be configured in the RESULTS.activateForm function. This will allow users to stay on the current page after voting.
		(Le formulaire de vote soumettra une requête AJAX à votre base de données et doit être configuré dans la fonction de RESULTS.activateForm . Cela permettra aux utilisateurs de rester sur la page en cours après avoir voté .)

	- Logic is set to not have a tie or a 100 to 0 result.
		(Logic est configuré pour ne pas avoir un lien ou d'un 100 à 0 résultat.)

	- The winning and losing text are updated dynamically in app.js under updateHTML function.
		(Le texte gagner et perdre sont mis à jour dynamiquement en fonction app.js sous updateHTML.)

	- The weekly prizes will update with the week that is open for voting. If none of the weeks are open for voting, Grand Prize will be shown.
		(Les prix hebdomadaires seront mis à jour avec la semaine qui est ouvert pour le vote . Si aucun des semaines sont ouverts pour le vote , du Grand Prix sera affiché.)

	- YouTube videos are dynamically created in app.js under LOADFRAMES function. This is because of better performance with iframes. Update URLS for videos there.
		(Vidéos YouTube sont créées dynamiquement en fonction app.js sous LOADFRAMES . Ceci est dû à de meilleures performances avec les iframes . Mettre à jour les URL des vidéos là-bas .)