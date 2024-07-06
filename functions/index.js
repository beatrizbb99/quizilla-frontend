const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.onImageDelete = functions.storage.object().onDelete(async (object) => {
  const filePath = object.name; // Der Pfad des gelöschten Bildes im Storage
  console.log(`Ein Bild wurde gelöscht: ${filePath}`);

  const db = admin.firestore();
  const questionsRef = db.collection("Questions");
  const quizzesRef = db.collection("Quizzes");

  try {
    // Durchsuche die "Questions" Sammlung
    const querySF = await questionsRef.where("mediaPath", "==", filePath).get();
    await updateDocuments(querySF);
    // Durchsuche die "Quizzes" Sammlung
    const querySQ = await quizzesRef.where("mediaPath", "==", filePath).get();
    await updateDocuments(querySQ);
  } catch (error) {
    console.error("Fehler beim Durchsuchen und Aktualisieren:", error);
  }

  /**
   * Aktualisiert die Dokumente in einer gegebenen Query-Snapshot-Sammlung.
   * Setzt das Feld 'mediaPath' auf null für jedes gefundene Dokument.
   * @param {firebase.firestore.QuerySnapshot} querySnapshot
   * @return {Promise<void>} Gibt eine Promise zurück
   */
  async function updateDocuments(querySnapshot) {
    if (querySnapshot.empty) {
      console.log("Keine passenden Dokumente gefunden.");
      return;
    }
    querySnapshot.forEach(async (doc) => {
      try {
        await doc.ref.update({
          mediaPath: null,
        });
        console.log("Das Feld 'mediaPath'${doc.id} wurde auf null gesetzt.");
      } catch (updateError) {
        console.error("Fehler beim Aktualisieren in Firestore:", updateError);
      }
    });
  }
});
