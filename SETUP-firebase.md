# Google შესვლა + გლობალური რეკორდები — Firebase-ის მომზადება

ეს ერთადერთი ნაწილია, რომელიც **შენს ჩართვას მოითხოვს** — Firebase პროექტი შენს Google ანგარიშზე უნდა შეიქმნას (Claude-ს ამის უფლება/წვდომა არ აქვს). ~5 წუთი.

დანარჩენი ყველაფერი (თამაში, რეჟიმები, ორი ხელით, skins, ვიბრაცია, ლოკალური პროფილი/რეკორდები, ონლაინ მეგობართან) **უკვე მუშაობს და გამოქვეყნებულია** — Firebase სჭირდება მხოლოდ:
- Google-ით შესვლას (რეგისტრაცია)
- ღრუბლოვან პროფილს (რომ სხვა მოწყობილობაზეც გქონდეს)
- **გლობალურ რეიტინგებს**: ყველაზე ბევრი დამარცხებული მეტოქე, ყველაზე გრძელი გაცვლა და ა.შ.

## ნაბიჯები

1. გახსენი https://console.firebase.google.com → **Add project** → სახელი (მაგ. `tenisi`) → შექმენი.
2. მარცხენა მენიუ → **Build → Authentication → Get started → Sign-in method →** ჩართე **Google** provider → Save.
3. **Build → Firestore Database → Create database →** დაიწყე **production mode**-ში (region: eur3 ან რომელიც გირჩევს).
4. **Project settings** (⚙️ ზედა მარცხნივ) → ჩამოსქროლე **Your apps** → დააჭირე **`</>` (Web)** → დაარეგისტრირე აპი (nickname `tenisi-web`) → მიიღებ `firebaseConfig` ობიექტს, დაახლ. ასეთს:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "tenisi-xxxx.firebaseapp.com",
  projectId: "tenisi-xxxx",
  storageBucket: "tenisi-xxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234:web:abcd..."
};
```

5. **Authentication → Settings → Authorized domains →** დაამატე `davitshermadini.github.io` (რომ შესვლა live-საიტზე იმუშაოს).

6. **ეს `firebaseConfig` ბლოკი გამომიგზავნე** — მე ჩავამატებ კოდში და დავწერ:
   - „Google-ით შესვლა" ღილაკს მენიუში
   - ღრუბლოვან პროფილს (სახელი + ავატარი სინქრონდება)
   - გლობალურ leaderboard-ს (რეკ. გაცვლა, მოგებები, დამარცხებული მეტოქეები)
   - Firestore security rules-ს (რომ ყველამ ვერ შეცვალოს სხვისი ქულა)

> apiKey საჯაროა და უსაფრთხოა კლიენტში — წვდომას აკონტროლებს security rules, რომელსაც მე დავამატებ.

არაფრის დაინსტალირება/გადახდა არ სჭირდება — Firebase-ის უფასო (Spark) ტარიფი სავსებით საკმარისია.
