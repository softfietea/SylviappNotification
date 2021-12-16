const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { event } = require("firebase-functions/v1/analytics");


admin.initializeApp(functions.config().firebase);

const fcm = admin.messaging();

var notificationMessageData;



exports.sendNotification = functions.firestore.document('/campaigns/{campaignUID}/distress/{volunteerUID}').onWrite(async (event,context) => {

    
    var db = admin.firestore();
 
 await db.collection('campaigns').doc(context.params.campaignUID).collection('distress').doc(context.params.volunteerUID).get().then(snapshot => {
      var devicetoken = snapshot.get('deviceToken');
      var notificationTitle = snapshot.get('title');
      var notificationBody = snapshot.get('body');
    

    const payload = admin.messaging.payload = {
                notification: {
                    title: notificationTitle,
                    body: notificationBody,
                    click_action: 'FLUTTER_NOTIFICATION_CLICK'
                }
            }


            return fcm.sendToDevice(devicetoken, payload); 
        }).catch(err => {
        console.error(err);
        });
});









// ref('messages/message1').onCreate(event=>{


//     const payload =admin.messaging.payload = {
//         notication: {
//             title: 'new Notification Title',
//             body: 'new Notification Body',
//             click_action: 'FLUTTER_NOTIFICATION_CLICK'
//         }
//     };
//     return fcm.sendToDevice('eDBQelnsQ3yqEYbn5ryyto:APA91bHPhkpxPjZfoSQ6VopF2RoS7Mugv99Hp2dhZxrues4QQfCF1K46NQOJSVDYUstxDeC18K98S53AFuxHPcVP7eseYpFAPka4eZs06Bpap2lQZetjKswHnqaLNd6WXepjZKiSraRK', payload); 
// });

