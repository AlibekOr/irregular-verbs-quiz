export interface Verb {
  /** V1 — infinitive (hozirgi / noaniq shakl) */
  v1: string
  /** V2 — Past Simple; several accepted forms are separated by "/" */
  v2: string
  /** V3 — Past Participle; several accepted forms are separated by "/" */
  v3: string
  /** Uzbek translation of each form */
  uz1: string
  uz2: string
  uz3: string
  /** Example with V2 (Past Simple) */
  ex2: string
  ex2uz: string
  /** Example with V3 (Present Perfect / Passive) */
  ex3: string
  ex3uz: string
}

type Row = [string, string, string, string, string, string, string, string, string, string]

// v1, v2, v3, uz1, uz2, uz3, ex2, ex2uz, ex3, ex3uz
const rows: Row[] = [
  ['be', 'was/were', 'been', "bo'lmoq", "bo'ldi, edi", "bo'lgan", 'I was at home yesterday.', 'Kecha men uyda edim.', 'I have been to London.', "Men Londonda bo'lganman."],
  ['beat', 'beat', 'beaten', 'urmoq, yengmoq', 'urdi, yengdi', 'urilgan, yengilgan', 'Our team beat them 3–0.', 'Jamoamiz ularni 3:0 hisobida yengdi.', 'He has never been beaten at chess.', 'U shaxmatda hech qachon yengilmagan.'],
  ['become', 'became', 'become', "bo'lib qolmoq, aylanmoq", "bo'lib qoldi", "bo'lib qolgan", 'She became a doctor.', "U shifokor bo'ldi.", 'It has become cold.', "Havo sovuq bo'lib qoldi."],
  ['begin', 'began', 'begun', 'boshlamoq', 'boshladi', 'boshlangan', 'The lesson began at nine.', "Dars soat to'qqizda boshlandi.", 'The film has already begun.', 'Film allaqachon boshlangan.'],
  ['bend', 'bent', 'bent', 'egmoq, bukmoq', 'egdi', 'egilgan', 'He bent down to pick it up.', 'U uni olish uchun egildi.', 'The nail is bent.', 'Mix egilgan.'],
  ['bet', 'bet', 'bet', 'garov o\'ynamoq', "garov o'ynadi", "garov qo'yilgan", 'I bet you ten dollars.', "Sen bilan o'n dollarga garov o'ynadim.", 'He has bet all his money.', "U bor pulini garovga qo'ygan."],
  ['bite', 'bit', 'bitten', 'tishlamoq', 'tishladi', 'tishlangan', 'The dog bit my hand.', "It qo'limni tishladi.", 'He was bitten by a snake.', 'Uni ilon chaqqan.'],
  ['blow', 'blew', 'blown', 'puflamoq, esmoq', 'pufladi, esdi', 'puflangan', 'The wind blew all night.', 'Tun bo\'yi shamol esdi.', 'The roof has been blown away.', 'Tomni shamol uchirib ketgan.'],
  ['break', 'broke', 'broken', 'sindirmoq', 'sindirdi', 'singan', 'I broke my phone.', 'Men telefonimni sindirdim.', 'The window is broken.', 'Deraza singan.'],
  ['bring', 'brought', 'brought', 'olib kelmoq', 'olib keldi', 'olib kelingan', 'She brought a cake.', 'U tort olib keldi.', 'Have you brought your book?', 'Kitobingni olib keldingmi?'],
  ['build', 'built', 'built', 'qurmoq', 'qurdi', 'qurilgan', 'They built a new school.', 'Ular yangi maktab qurishdi.', 'This house was built in 1990.', 'Bu uy 1990-yilda qurilgan.'],
  ['burn', 'burnt/burned', 'burnt/burned', 'yondirmoq, yonmoq', 'yondirdi, kuydi', 'kuygan', 'I burned my finger.', 'Barmog\'imni kuydirib oldim.', 'The toast is burnt.', 'Non kuyib qolgan.'],
  ['buy', 'bought', 'bought', 'sotib olmoq', 'sotib oldi', 'sotib olingan', 'I bought a new car.', 'Men yangi mashina sotib oldim.', 'I have bought the tickets.', 'Men chiptalarni sotib olganman.'],
  ['catch', 'caught', 'caught', 'ushlamoq', 'ushladi', 'ushlangan', 'He caught the ball.', "U to'pni ushlab oldi.", 'The thief has been caught.', "O'g'ri ushlangan."],
  ['choose', 'chose', 'chosen', 'tanlamoq', 'tanladi', 'tanlangan', 'She chose the red dress.', "U qizil ko'ylakni tanladi.", 'Have you chosen a name?', 'Ism tanladingizmi?'],
  ['come', 'came', 'come', 'kelmoq', 'keldi', 'kelgan', 'He came home late.', 'U uyga kech keldi.', 'Spring has come.', 'Bahor kelgan.'],
  ['cost', 'cost', 'cost', 'turmoq (narxi)', 'turdi (narxi)', 'turgan (narxi)', 'The bag cost fifty dollars.', 'Sumka ellik dollar turdi.', 'It has cost us a lot.', "Bu bizga qimmatga tushgan."],
  ['cut', 'cut', 'cut', 'kesmoq', 'kesdi', 'kesilgan', 'She cut the bread.', 'U nonni kesdi.', 'The grass has been cut.', "O't o'rilgan."],
  ['dig', 'dug', 'dug', 'qazimoq', 'qazidi', 'qazilgan', 'The dog dug a hole.', 'It chuqur qazidi.', 'A well has been dug.', 'Quduq qazilgan.'],
  ['do', 'did', 'done', 'qilmoq', 'qildi', 'qilingan', 'I did my homework.', 'Men uy vazifamni qildim.', 'Have you done it?', 'Buni qildingmi?'],
  ['draw', 'drew', 'drawn', 'chizmoq', 'chizdi', 'chizilgan', 'The child drew a cat.', 'Bola mushuk chizdi.', 'This picture was drawn by me.', 'Bu rasm men tomonimdan chizilgan.'],
  ['dream', 'dreamt/dreamed', 'dreamt/dreamed', "tush ko'rmoq, orzu qilmoq", "tush ko'rdi", "orzu qilingan", 'I dreamt about you.', "Seni tushimda ko'rdim.", 'I have always dreamed of flying.', 'Men doim uchishni orzu qilganman.'],
  ['drink', 'drank', 'drunk', 'ichmoq', 'ichdi', 'ichilgan', 'He drank some water.', 'U biroz suv ichdi.', 'I have drunk three cups of tea.', 'Men uch piyola choy ichganman.'],
  ['drive', 'drove', 'driven', 'haydamoq (mashina)', 'haydadi', 'haydalgan', 'She drove to work.', 'U ishga mashinada bordi.', 'I have never driven a truck.', 'Men hech qachon yuk mashinasi haydamaganman.'],
  ['eat', 'ate', 'eaten', 'yemoq', 'yedi', 'yeyilgan', 'We ate pizza.', 'Biz pitsa yedik.', 'Have you eaten yet?', 'Ovqatlandingmi?'],
  ['fall', 'fell', 'fallen', 'yiqilmoq, tushmoq', 'yiqildi', 'yiqilgan, tushgan', 'He fell off his bike.', 'U velosipeddan yiqildi.', 'Prices have fallen.', 'Narxlar tushgan.'],
  ['feed', 'fed', 'fed', 'boqmoq, ovqatlantirmoq', 'boqdi', 'boqilgan', 'She fed the cat.', 'U mushukni boqdi.', 'The baby has been fed.', 'Chaqaloq ovqatlantirilgan.'],
  ['feel', 'felt', 'felt', 'his qilmoq', 'his qildi', 'his qilingan', 'I felt tired.', 'Men charchoqni his qildim.', 'I have never felt so happy.', 'Men hech qachon bunchalik baxtli bo\'lmaganman.'],
  ['fight', 'fought', 'fought', 'urushmoq, kurashmoq', 'urushdi', 'kurashilgan', 'They fought for freedom.', 'Ular ozodlik uchun kurashdilar.', 'He has fought all his life.', "U butun umr kurashgan."],
  ['find', 'found', 'found', 'topmoq', 'topdi', 'topilgan', 'I found my keys.', 'Men kalitlarimni topdim.', 'The lost dog has been found.', "Yo'qolgan it topilgan."],
  ['fly', 'flew', 'flown', 'uchmoq', 'uchdi', 'uchgan', 'The bird flew away.', 'Qush uchib ketdi.', 'I have flown to Dubai twice.', 'Men Dubayga ikki marta uchganman.'],
  ['forbid', 'forbade', 'forbidden', 'taqiqlamoq', 'taqiqladi', 'taqiqlangan', 'His father forbade him to go.', 'Otasi unga borishni taqiqladi.', 'Smoking is forbidden here.', 'Bu yerda chekish taqiqlangan.'],
  ['forget', 'forgot', 'forgotten', 'unutmoq', 'unutdi', 'unutilgan', 'I forgot her name.', 'Men uning ismini unutdim.', 'I have forgotten my password.', 'Men parolimni unutganman.'],
  ['forgive', 'forgave', 'forgiven', 'kechirmoq', 'kechirdi', 'kechirilgan', 'She forgave him.', 'U uni kechirdi.', 'You are forgiven.', 'Siz kechirildingiz.'],
  ['freeze', 'froze', 'frozen', 'muzlamoq', 'muzladi', 'muzlagan', 'The lake froze.', "Ko'l muzladi.", 'The meat is frozen.', "Go'sht muzlatilgan."],
  ['get', 'got', 'got/gotten', 'olmoq, erishmoq', 'oldi', 'olingan', 'I got a letter.', 'Men xat oldim.', 'He has got a new job.', 'U yangi ish topgan.'],
  ['give', 'gave', 'given', 'bermoq', 'berdi', 'berilgan', 'He gave me a gift.', "U menga sovg'a berdi.", 'I was given a prize.', 'Menga mukofot berildi.'],
  ['go', 'went', 'gone', 'bormoq', 'bordi', 'borgan, ketgan', 'We went to the park.', "Biz bog'ga bordik.", 'She has gone home.', 'U uyga ketgan.'],
  ['grow', 'grew', 'grown', "o'smoq, o'stirmoq", "o'sdi", "o'sgan", 'The tree grew fast.', "Daraxt tez o'sdi.", 'You have grown a lot!', "Sen ancha o'sibsan!"],
  ['hang', 'hung', 'hung', 'osmoq', 'osdi', 'osilgan', 'I hung the picture on the wall.', 'Men rasmni devorga osdim.', 'The coat is hung in the hall.', 'Palto dahlizga osilgan.'],
  ['have', 'had', 'had', "ega bo'lmoq, bor bo'lmoq", "bor edi", "ega bo'lgan", 'I had a dog.', 'Mening itim bor edi.', 'We have had a great time.', "Biz ajoyib vaqt o'tkazdik."],
  ['hear', 'heard', 'heard', 'eshitmoq', 'eshitdi', 'eshitilgan', 'I heard a noise.', 'Men shovqin eshitdim.', 'Have you heard the news?', 'Yangilikni eshitdingmi?'],
  ['hide', 'hid', 'hidden', 'yashirmoq', 'yashirdi', 'yashirilgan', 'She hid the money.', 'U pulni yashirdi.', 'The key was hidden under the mat.', 'Kalit gilam ostiga yashirilgan edi.'],
  ['hit', 'hit', 'hit', 'urmoq', 'urdi', 'urilgan', 'He hit the ball hard.', "U to'pni qattiq urdi.", 'The car was hit by a truck.', 'Mashinaga yuk mashinasi urilgan.'],
  ['hold', 'held', 'held', 'ushlab turmoq', 'ushlab turdi', "o'tkazilgan, ushlangan", 'She held the baby.', "U chaqaloqni qo'lida ushlab turdi.", 'The meeting was held yesterday.', "Yig'ilish kecha o'tkazildi."],
  ['hurt', 'hurt', 'hurt', "og'ritmoq, jarohatlamoq", "og'ritdi", 'jarohatlangan', 'I hurt my leg.', "Oyog'imni lat yedirdim.", 'Nobody was hurt.', 'Hech kim jarohat olmadi.'],
  ['keep', 'kept', 'kept', 'saqlamoq', 'saqladi', 'saqlangan', 'He kept the secret.', 'U sirni saqladi.', 'The milk is kept in the fridge.', 'Sut muzlatgichda saqlanadi.'],
  ['know', 'knew', 'known', 'bilmoq', 'bildi', 'ma\'lum, bilingan', 'I knew the answer.', 'Men javobni bilardim.', 'I have known him for years.', 'Men uni ko\'p yillardan beri bilaman.'],
  ['lay', 'laid', 'laid', "qo'ymoq, yotqizmoq", "qo'ydi", "qo'yilgan", 'She laid the table.', 'U dasturxon tuzdi.', 'The hen has laid an egg.', 'Tovuq tuxum qo\'ygan.'],
  ['lead', 'led', 'led', 'boshqarmoq, yetaklamoq', 'boshqardi', 'boshqarilgan', 'He led the team.', 'U jamoani boshqardi.', 'This road has led us nowhere.', "Bu yo'l bizni hech qayerga olib bormadi."],
  ['learn', 'learnt/learned', 'learnt/learned', "o'rganmoq", "o'rgandi", "o'rganilgan", 'I learned English at school.', "Men ingliz tilini maktabda o'rgandim.", 'I have learnt a lot.', "Men ko'p narsa o'rgandim."],
  ['leave', 'left', 'left', 'ketmoq, qoldirmoq', 'ketdi, qoldirdi', 'qoldirilgan', 'He left at six.', 'U soat oltida ketdi.', 'I have left my bag at home.', 'Sumkamni uyda qoldiribman.'],
  ['lend', 'lent', 'lent', 'qarzga bermoq', 'qarzga berdi', 'qarzga berilgan', 'She lent me her pen.', 'U menga ruchkasini berib turdi.', 'I have lent him money.', 'Men unga qarz berganman.'],
  ['let', 'let', 'let', 'ruxsat bermoq', 'ruxsat berdi', 'ruxsat berilgan', 'Mom let me go out.', 'Onam tashqariga chiqishimga ruxsat berdi.', 'He has let us down.', 'U bizni umidsizlantirgan.'],
  ['lie', 'lay', 'lain', 'yotmoq', 'yotdi', 'yotgan', 'He lay on the sofa.', 'U divanda yotdi.', 'The book has lain there for weeks.', 'Kitob u yerda haftalab yotgan.'],
  ['light', 'lit', 'lit', 'yoqmoq (olov)', 'yoqdi', 'yoqilgan', 'She lit a candle.', 'U sham yoqdi.', 'The room was lit by candles.', 'Xona shamlar bilan yoritilgan edi.'],
  ['lose', 'lost', 'lost', "yo'qotmoq, yutqazmoq", "yo'qotdi", "yo'qolgan", 'I lost my wallet.', "Men hamyonimni yo'qotdim.", 'We have lost the game.', "Biz o'yinda yutqazdik."],
  ['make', 'made', 'made', 'yasamoq, qilmoq', 'yasadi', 'yasalgan', 'She made a cake.', 'U tort pishirdi.', 'This phone is made in Korea.', 'Bu telefon Koreyada ishlab chiqarilgan.'],
  ['mean', 'meant', 'meant', "anglatmoq, nazarda tutmoq", 'anglatdi', "nazarda tutilgan", 'I meant something else.', 'Men boshqa narsani nazarda tutgandim.', 'It was meant as a joke.', 'Bu hazil sifatida aytilgan edi.'],
  ['meet', 'met', 'met', 'uchrashmoq', 'uchrashdi', 'uchrashgan', 'I met him at the station.', 'Men u bilan bekatda uchrashdim.', 'Have we met before?', 'Oldin uchrashganmizmi?'],
  ['pay', 'paid', 'paid', "to'lamoq", "to'ladi", "to'langan", 'I paid for dinner.', "Kechki ovqat uchun men to'ladim.", 'The bill has been paid.', "Hisob to'langan."],
  ['put', 'put', 'put', "qo'ymoq", "qo'ydi", "qo'yilgan", 'He put the book on the table.', "U kitobni stolga qo'ydi.", 'I have put the milk in the fridge.', "Sutni muzlatgichga qo'ydim."],
  ['quit', 'quit', 'quit', 'tashlamoq, voz kechmoq', 'tashladi', 'tashlangan', 'He quit smoking.', 'U chekishni tashladi.', 'She has quit her job.', 'U ishdan ketgan.'],
  ['read', 'read', 'read', "o'qimoq", "o'qidi", "o'qilgan", 'I read the book last week.', "Kitobni o'tgan hafta o'qidim.", 'Have you read this?', "Buni o'qiganmisan?"],
  ['ride', 'rode', 'ridden', 'minmoq (ot, velosiped)', 'mindi', 'minilgan', 'She rode a horse.', 'U ot mindi.', 'I have never ridden a camel.', 'Men hech qachon tuya minmaganman.'],
  ['ring', 'rang', 'rung', "jiringlamoq, qo'ng'iroq qilmoq", 'jiringladi', 'jiringlagan', 'The phone rang.', 'Telefon jiringladi.', 'Has the bell rung?', "Qo'ng'iroq chalindimi?"],
  ['rise', 'rose', 'risen', "ko'tarilmoq", "ko'tarildi", "ko'tarilgan", 'The sun rose at six.', "Quyosh oltida chiqdi.", 'Prices have risen.', "Narxlar ko'tarilgan."],
  ['run', 'ran', 'run', 'yugurmoq', 'yugurdi', 'yugurgan', 'He ran to school.', 'U maktabga yugurdi.', 'I have run five kilometres.', 'Men besh kilometr yugurdim.'],
  ['say', 'said', 'said', 'aytmoq', 'aytdi', 'aytilgan', 'She said hello.', 'U salom aytdi.', 'Enough has been said.', 'Yetarlicha gapirildi.'],
  ['see', 'saw', 'seen', "ko'rmoq", "ko'rdi", "ko'rilgan", 'I saw a film yesterday.', "Kecha film ko'rdim.", 'Have you seen my keys?', "Kalitlarimni ko'rdingmi?"],
  ['sell', 'sold', 'sold', 'sotmoq', 'sotdi', 'sotilgan', 'He sold his car.', 'U mashinasini sotdi.', 'All tickets have been sold.', 'Barcha chiptalar sotilgan.'],
  ['send', 'sent', 'sent', "jo'natmoq", "jo'natdi", "jo'natilgan", 'I sent you an email.', "Senga xat jo'natdim.", 'The parcel has been sent.', "Posilka jo'natilgan."],
  ['set', 'set', 'set', "o'rnatmoq, qo'ymoq", "o'rnatdi", "o'rnatilgan", 'She set the alarm for seven.', "U budilnikni yettiga qo'ydi.", 'The date has been set.', 'Sana belgilangan.'],
  ['shake', 'shook', 'shaken', 'silkitmoq', 'silkitdi', 'silkitilgan', 'He shook my hand.', "U qo'limni siqib ko'rishdi.", 'She was shaken by the news.', 'Yangilik uni larzaga soldi.'],
  ['shine', 'shone', 'shone', 'porlamoq', 'porladi', 'porlagan', 'The sun shone all day.', "Quyosh kun bo'yi charaqladi.", 'The sun has shone all week.', "Quyosh butun hafta charaqlab turdi."],
  ['shoot', 'shot', 'shot', 'otmoq, suratga olmoq', 'otdi', 'otilgan', 'He shot at the target.', 'U nishonga otdi.', 'The film was shot in Samarkand.', "Film Samarqandda suratga olingan."],
  ['show', 'showed', 'shown', "ko'rsatmoq", "ko'rsatdi", "ko'rsatilgan", 'She showed me her photos.', "U menga suratlarini ko'rsatdi.", 'The film is shown on TV.', "Film televizorda ko'rsatiladi."],
  ['shut', 'shut', 'shut', 'yopmoq', 'yopdi', 'yopilgan', 'He shut the door.', 'U eshikni yopdi.', 'The shop is shut.', "Do'kon yopiq."],
  ['sing', 'sang', 'sung', 'kuylamoq', 'kuyladi', 'kuylangan', 'She sang a song.', "U qo'shiq kuyladi.", 'This song has been sung many times.', "Bu qo'shiq ko'p marta kuylangan."],
  ['sink', 'sank', 'sunk', "cho'kmoq", "cho'kdi", "cho'kkan", 'The ship sank.', "Kema cho'kdi.", 'The boat has sunk.', "Qayiq cho'kib ketgan."],
  ['sit', 'sat', 'sat', "o'tirmoq", "o'tirdi", "o'tirgan", 'We sat by the window.', "Biz deraza yonida o'tirdik.", 'I have sat here for an hour.', "Men bu yerda bir soatdan beri o'tiribman."],
  ['sleep', 'slept', 'slept', 'uxlamoq', 'uxladi', 'uxlagan', 'I slept well.', 'Men yaxshi uxladim.', 'He has not slept for two days.', 'U ikki kundan beri uxlamagan.'],
  ['speak', 'spoke', 'spoken', 'gapirmoq', 'gapirdi', 'gapirilgan', 'He spoke to the teacher.', "U o'qituvchi bilan gaplashdi.", 'English is spoken here.', 'Bu yerda inglizcha gapiriladi.'],
  ['spend', 'spent', 'spent', "sarflamoq, o'tkazmoq", 'sarfladi', 'sarflangan', 'I spent all my money.', 'Men bor pulimni sarfladim.', 'We have spent a week here.', "Biz bu yerda bir hafta o'tkazdik."],
  ['spread', 'spread', 'spread', 'yoymoq, tarqatmoq', 'yoydi, tarqaldi', 'tarqatilgan', 'The news spread quickly.', 'Yangilik tez tarqaldi.', 'Butter was spread on the bread.', 'Nonga sariyog\' surtilgan edi.'],
  ['stand','stood', 'stood', 'turmoq (tik)', 'turdi', 'turgan', 'He stood by the door.', 'U eshik yonida turdi.', 'This building has stood for 100 years.', "Bu bino 100 yildan beri turibdi."],
  ['steal', 'stole', 'stolen', "o'g'irlamoq", "o'g'irladi", "o'g'irlangan", 'Someone stole my bike.', "Kimdir velosipedimni o'g'irladi.", 'My phone has been stolen.', "Telefonim o'g'irlangan."],
  ['stick', 'stuck', 'stuck', 'yopishtirmoq, tiqilib qolmoq', 'yopishtirdi', 'yopishtirilgan, tiqilib qolgan', 'She stuck a stamp on the letter.', 'U xatga marka yopishtirdi.', 'We are stuck in traffic.', "Biz tirbandlikda qolib ketdik."],
  ['swim','swam', 'swum', 'suzmoq', 'suzdi', 'suzgan', 'We swam in the sea.', "Biz dengizda suzdik.", 'I have never swum in a river.', 'Men hech qachon daryoda suzmaganman.'],
  ['take', 'took', 'taken', 'olmoq', 'oldi', 'olingan', 'She took my pen.', 'U ruchkamni oldi.', 'This seat is taken.', 'Bu joy band.'],
  ['teach', 'taught', 'taught', "o'rgatmoq, dars bermoq", "o'rgatdi", "o'rgatilgan", 'He taught me to swim.', "U menga suzishni o'rgatdi.", 'I was taught by my father.', "Menga otam o'rgatgan."],
  ['tear', 'tore', 'torn', 'yirtmoq', 'yirtdi', 'yirtilgan', 'He tore the paper.', "U qog'ozni yirtdi.", 'My shirt is torn.', "Ko'ylagim yirtilgan."],
  ['tell', 'told', 'told', 'aytib bermoq, hikoya qilmoq', 'aytib berdi', 'aytilgan', 'She told me a story.', 'U menga hikoya aytib berdi.', 'I was told to wait.', 'Menga kutishni aytishdi.'],
  ['think', 'thought', 'thought', "o'ylamoq", "o'yladi", "o'ylangan", 'I thought about you.', "Men sen haqingda o'yladim.", 'Have you thought about it?', "Bu haqda o'ylab ko'rdingmi?"],
  ['throw', 'threw', 'thrown', 'otmoq, tashlamoq', 'otdi', 'tashlangan', 'He threw the ball.', "U to'pni otdi.", 'The letter was thrown away.', 'Xat tashlab yuborilgan.'],
  ['understand', 'understood', 'understood', 'tushunmoq', 'tushundi', 'tushunilgan', 'I understood everything.', 'Men hammasini tushundim.', 'Have you understood the rule?', 'Qoidani tushundingmi?'],
  ['wake', 'woke', 'woken', "uyg'onmoq, uyg'otmoq", "uyg'ondi", "uyg'ongan", 'I woke up at seven.', "Men yettida uyg'ondim.", 'The baby has woken up.', "Chaqaloq uyg'ongan."],
  ['wear', 'wore', 'worn', 'kiymoq', 'kiydi', 'kiyilgan', 'She wore a blue dress.', "U ko'k ko'ylak kiydi.", 'These shoes are worn out.', "Bu poyabzallar eskirib ketgan."],
  ['win', 'won', 'won', 'yutmoq, g\'alaba qozonmoq', 'yutdi', 'yutilgan', 'Our team won the match.', "Jamoamiz o'yinda g'alaba qozondi.", 'She has won three medals.', 'U uchta medal yutgan.'],
  ['write', 'wrote', 'written', 'yozmoq', 'yozdi', 'yozilgan', 'I wrote a letter.', 'Men xat yozdim.', 'This book was written in 1950.', 'Bu kitob 1950-yilda yozilgan.'],
]

export const verbs: Verb[] = rows.map(([v1, v2, v3, uz1, uz2, uz3, ex2, ex2uz, ex3, ex3uz]) => ({
  v1, v2, v3, uz1, uz2, uz3, ex2, ex2uz, ex3, ex3uz,
}))
