/* =========================================================================
   פונקציה 1: DataChecking
   תפקיד: בודקת את תקינות הקלט בתיבות הטקסט והמספרים בלבד (שם, יעד, תקציב).
   ערך מוחזר: מחזירה true אם נמצאה שגיאה, או false אם כל השדות תקינים.
   ========================================================================= */
function DataChecking() {
    // שליפת הערכים הנוכחיים שהמשתמש הקליד בתוך שלוש תיבות הקלט לפי ה-id שלהן
    const trvFullName = document.getElementById('trvName').value;
    const placeName = document.getElementById('place').value;
    const budget = document.getElementById('budget').value;

    // איפוס וניקוי הודעות שגיאה קודמות מתוך דיב המשוב לפני תחילת בדיקה חדשה
    document.getElementById("feedback").innerHTML = "";

    // בדיקה 1: האם שדה שם המטייל ריק
    if (trvFullName === "") {
        document.getElementById("feedback").innerHTML = "הכנס שם מלא";
        return true; // החזרת true מסמנת שקיימת שגיאה בטופס

        // בדיקה 2: האם שם המטייל מכיל ספרות (0-9) באמצעות ביטוי רגולרי (RegExp) והמתודה test()
    } else if (/[0-9]/.test(trvFullName)) {
        document.getElementById("feedback").innerHTML = "השם לא יכול להכיל מספרים";
        return true; // נמצאה שגיאה

        // בדיקה 3: האם שדה מדינת היעד ריק
    } else if (placeName === "") {
        document.getElementById("feedback").innerHTML = "הכנס מדינה שבה תרצה לטייל";
        return true; // נמצאה שגיאה

        // בדיקה 4: האם שם המדינה מכיל ספרות (0-9)
    } else if (/[0-9]/.test(placeName)) {
        document.getElementById("feedback").innerHTML = "שם המדינה לא יכול להכיל מספרים";
        return true; // נמצאה שגיאה

        // בדיקה 5: האם שדה התקציב ריק, או שהערך המספרי שלו (לאחר המרה למספר שלם עם parseInt) קטן או שווה ל-0
    } else if (budget === "" || parseInt(budget) <= 0) {
        document.getElementById("feedback").innerHTML = "הכנס תקציב חיובי לטיול";
        return true; // נמצאה שגיאה

        // אם כל התנאים למעלה לא התקיימו – סימן שכל שדות הטקסט והמספרים מלאים ותקינים
    } else {
        return false; // החזרת false מסמנת שאין שגיאות כלל
    }
}


/* =========================================================================
   פונקציה 2: tripPlan
   תפקיד: אחראית על אימות הטופס המלא (שדות טקסט + כפתורי רדיו) ועל פתיחה/נעילה של כפתור ה"שלח".
   ========================================================================= */
function tripPlan() {
    // שלב 1: קריאה לפונקציה DataChecking() לבדיקת שדות הטקסט.
    // אם היא מחזירה true (כלומר יש שגיאה בטקסטים) – כפתור השליחה ננעל (disabled = true)
    if (DataChecking()) {
        document.getElementById("submitBtn").disabled = true;
    }
    // שלב 2: אם שדות הטקסט תקינים, בודקים האם אף אחד משלושת כפתורי הרדיו לא סומן (checked === false בכולם)
    else if (document.getElementById("backpack").checked === false &&
        document.getElementById("Balanced").checked === false &&
        document.getElementById("luxury").checked === false) {

        // אם לא נבחר אף סגנון טיול – מציגים הודעה מתאימה ומשאירים את כפתור השליחה נעול
        document.getElementById("feedback").innerHTML = "אנא בחר סגנון טיול";
        document.getElementById("submitBtn").disabled = true;

        // שלב 3: אם גם שדות הטקסט תקינים וגם נבחר כפתור רדיו – משחררים את נעילת כפתור השליחה (disabled = false)
    } else {
        document.getElementById("submitBtn").disabled = false;
    }
}


/* =========================================================================
   פונקציה 3: updateTripStyleImage
   תפקיד: מחליפה את התמונה המרכזית בחלון התצוגה המקדימה בהתאם לכפתור הרדיו שנבחר.
   פרמטר: styleName - מחרוזת המייצגת את סגנון הטיול שנבחר ('backpack' / 'Balanced' / 'luxury').
   ========================================================================= */
function updateTripStyleImage(styleName) {
    // ניקוי התמונה הקודמת (אם הייתה) מתוך אזור התמונה בחלון התצוגה המקדימה
    document.getElementById("tripImageArea").innerHTML = "";

    // בדיקה איזה סגנון טיול נבחר והזרקת תגית <img> עם נתיב התמונה המתאימה מתיקיית images
    if (styleName === "backpack") {
        document.getElementById("tripImageArea").innerHTML = "<img src='images/tarmil.jpeg' alt='תרמילאים'>";
    } else if (styleName === "Balanced") {
        document.getElementById("tripImageArea").innerHTML = "<img src='images/taktziv_meuzan.jpeg' alt='נוחות'>";
    } else if (styleName === "luxury") {
        document.getElementById("tripImageArea").innerHTML = "<img src='images/yokra.jpeg' alt='יוקרה'>";
    }

    // לאחר בחירת הרדיו והחלפת התמונה, מריצים שוב את tripPlan() כדי לבדוק אם ניתן כעת לפתוח את כפתור ה"שלח"
    tripPlan();
}


/* =========================================================================
   פונקציה 4: toggleCheckboxVisual
   תפקיד: משנה את רמת השקיפות (opacity) של תמונות החוויות בהתאם לסימון או ביטול של הצ'ק-בוקס.
   פרמטרים: checkboxId - ה-id של תיבת הסימון, imgId - ה-id של התמונה המקושרת אליה.
   ========================================================================= */
function toggleCheckboxVisual(checkboxId, imgId) {
    // בדיקה האם תיבת הסימון הספציפית מסומנת כרגע (מחזיר true אם מסומנת, false אם לא)
    const isChecked = document.getElementById(checkboxId).checked;

    // אם התיבה סומנה – משנים את שקיפות התמונה ל-1 (אטימות מלאה, תמונה ברורה ומודגשת)
    if (isChecked) {
        document.getElementById(imgId).style.opacity = "1";
        // אם הסימון הוסר – מחזירים את שקיפות התמונה ל-0.3 (תמונה דהויה/חצי שקופה)
    } else {
        document.getElementById(imgId).style.opacity = "0.3";
    }
}


/* =========================================================================
   פונקציה 5: showTripSummary
   תפקיד: אוספת את כל נתוני הטופס באמצעות מערכים ולולאות לאחר לחיצה על "שלח",
          מציגה את חלון הסיכום הקופץ ומעמעמת את הרקע.
   ========================================================================= */
function showTripSummary() {
    // שליפת הנתונים הסופיים שהוזנו בשלוש תיבות הטקסט והמספרים
    const finalName = document.getElementById('trvName').value;
    const finalPlace = document.getElementById('place').value;
    const finalBudget = document.getElementById('budget').value;

    // --- שינוי 1: בדיקת כפתורי הרדיו באמצעות מערכים מקבילים ולולאת for ---
    const styleIds = ["backpack", "Balanced", "luxury"];
    const styleNames = ["תרמילאים", "תקציב מאוזן", "יוקרה"];
    let finalStyle = "";

    // מעבר בלולאה על כל מזהי כפתורי הרדיו ושמירת שם הסגנון שנבחר
    for (let i = 0; i < styleIds.length; i++) {
        if (document.getElementById(styleIds[i]).checked) {
            finalStyle = styleNames[i];
        }
    }

    // --- שינוי 2: איסוף הצ'ק-בוקסים באמצעות מערכים מקבילים ולולאת for ---
    const checkboxIds = ["trekking", "sea", "city"];
    const checkboxNames = ["טרקים וטבע", "סטלבט בים", "סיורים בעיר ובמקדשים"];
    let addons = "";

    // מעבר בלולאה על כל תיבות הסימון: כל תיבה שמסומנת (checked) משורשרת למשתנה addons
    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) {
            addons += checkboxNames[i] + ", ";
        }
    }

    // עיצוב סופי של מחרוזת החוויות:
    // אם המשתנה נשאר ריק (לא סומנה אף חוויה) – מציבים הודעה מתאימה
    if (addons === "") {
        addons = "לא נבחרו חוויות.";
    } else {
        // אם נבחרו חוויות – הפקודה slice(0, -2) חותכת את 2 התווים האחרונים (הפסיק והרווח המיותרים שבסוף)
        // ומוסיפה במקומם נקודה בסיום המשפט
        addons = addons.slice(0, -2) + ".";
    }

    // הרכבת קוד ה-HTML של סיכום ההזמנה לתוך משתנה אחד (כותרת h2 ושורות מודגשות עם strong)
    const summaryText = "<h2>סיכום הזמנה</h2>" +
        "<strong>שם הלקוח/ה:</strong> " + finalName + "<br>" +
        "<strong>מדינת יעד:</strong> " + finalPlace + "<br>" +
        "<strong>תקציב:</strong> " + finalBudget + "$<br>" +
        "<strong>סגנון טיול:</strong> " + finalStyle + "<br>" +
        "<strong>חוויות:</strong> " + addons;

    // שליפת אלמנט חלון הסיכום מה-HTML, הזרקת התוכן לתוכו והצגתו על המסך (שינוי display מ-none ל-block)
    const summaryDiv = document.getElementById("summaryArea");
    summaryDiv.innerHTML = summaryText;
    summaryDiv.style.display = "block";

    // עמעום שאר חלקי הדף שברקע (הכותרת הראשית, הטופס וחלון התצוגה המקדימה) לשקיפות של 25%
    // כדי למקד את תשומת הלב של המשתמש בחלון הסיכום הקופץ
    document.querySelector("h1").style.opacity = "0.25";
    document.querySelector("form").style.opacity = "0.25";
    document.getElementById("orderPreview").style.opacity = "0.25";
}


/* =========================================================================
   פונקציה 6: updateTitle
   תפקיד: מתעדכנת בזמן אמת (בכל הקלדת אות בשדה השם) ומציגה את שם המטייל בכותרת התצוגה המקדימה.
   ========================================================================= */
function updateTitle() {
    // שליפת הטקסט המוקלד כרגע בשדה שם המטייל
    const name = document.getElementById("trvName").value;
    // עדכון תוכן הכותרת בחלון התצוגה המקדימה עם השם העדכני
    document.getElementById("previewTitle").innerHTML = "הטיול של: " + name;
}