﻿// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.
(function () {
    "use strict";
    var niveauCharge;
    var msgPlugged='';

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova a été chargé. Effectuez l'initialisation qui nécessite Cordova ici.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //batterie critique
        window.addEventListener("batterycritical", onBatteryCritical, false);

        window.addEventListener("batterystatus", onBatteryStatus, false);

        //on recupere automatiquement le niveau de la battery
        //window.addEventListener("batterycritical", onBatteryStatus, false);


        //bouton tester
        $('#btnBatterie').click(function () {
            console.log("msplugget :" + msgPlugged + " niveau de charge : " + niveauCharge);
            $('#niveau').empty();
            $('#niveau').html('<p>' + niveauCharge + '%' + msgPlugged + '</p>');
        });            
    };  
    //function recuperant le statut de la battery 
    function onBatteryStatus(info) {
             
        if (info.isPlugged) {
            msgPlugged = 'en charge';
        }
        else {
            msgPlugged = 'sur batterie';
        };
        
        niveauCharge = info.level;
    }
    //function d'affichage du message pour battery critique
    function onBatteryCritical(info) {
        $('#niveau').empty();
        $('#niveau').html('<p>Niveau de batterie critique : ' + info.level + "% !Rechargez!</p>");
    };

    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
        setTimeout(function () {
            alert('content de vous revoir ! \nVotre batterie en est au niveau' + niveauCharge + '%;')

        }, 0);
    };
})();




