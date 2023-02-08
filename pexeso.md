
Aplikace "**Dvojice**" je hra, ve které je cílem najít všechny shodné karty. Uživatel si může zadat své jméno a zahájit hru kliknutím na tlačítko "**Start**". Během hry se zobrazí počet tahů a uplynulý čas. Po dokončení hry se zobrazí výsledek a uživatelské jméno a výsledek se uloží do tabulky. Aplikace má možnost restartovat hru kliknutím na tlačítko "**Zastavit** **a Znovu**".

   <br>

Kód definuje některé proměnné, jako jsou **moves**, **timeValue**, **startButton**, **stopButton**, **gameContainer**, **result** a ovládací prvky, které se používají pro přístup k prvkům webové stránce.   
Pole 4 x 4 položek obsahuje seznam 12 objektů, každý s názvem a obrázkem. Hra má časomíru a počítadlo tahů. 

1. Funkce **timeGenerator** navyšuje vteřiny a minuty a aktualizuje zobrazený čas. 

2. Funkce **movesCounter** zvyšuje proměnnou **movesCount** a aktualizuje zobrazení pohybů. 
3. Funkce **createRandom** generuje náhodnou množinu položek z pole položek. 

4. Funkce **matrixGenerator** vytváří herní mřížku a zobrazuje náhodné položky. 
5. Proměnná **cards** ukládá prvky s třídou "**card-container**". 

6. **Event listener** na každé kartě naslouchá události kliknutí a provádí akce k otočení karty a jejímu přiřazení k jiné kartě. Kód definuje funkce spuštění a zastavení hry.

   <br>
**Administrátor** (já) má oprávnění k vytváření, úpravě a mazání dat, nastavení a správě nastavení aplikace a přidělování oprávnění jiným uživatelům.

**Uživatel** (hráč) má oprávnění zadat jméno, spustit a zastavit hru
   <br>   <br>
**Entita: Hráč**

-   Jméno (string)
-   Skóre (integer)

**Entita: Hra**

-   Počet tahů (integer)
-   Čas (datetime)
-   Zdrojové obrázky (pole stringů)

**Vztahy:**

1 Hráč může mít několik her

1 Hra patří pouze 1 Hráči
   <br>   <br>
Třídy v HTML kódu reprezentují elementy na stránce a určují jejich vzhled a chování.

1.  .**wrapper**: Třída určuje vzhled a umístění celého herního okna.
2.  **.stats-container**: Třída určuje vzhled a umístění statistik hry.
3.  .**game-container**: Třída určuje vzhled a umístění hry.
4.  **.card-container**: Třída určuje vzhled a chování karet v hře.
5.  .**controls-container**: Třída určuje vzhled a umístění tlačítek pro ovladání hry.
6.  .**username-score-table**: Třída určuje vzhled a umístění tabulky s jmény a skóre.
7.  **#start**: Tlačítko určuje spuštění hry.
8.  **#stop**: Tlačítko určuje zastavení a restart hry.
9.  **.enter-name**: Třída určuje vzhled a umístění vstupního pole pro zadání jména.

Základní CSS třídy pro **padding**, **margin**, **fonty**, atd. plní funkci vylepšení vzhledu stránky.
   <br>   <br>
HTML definuje strukturu. Stránka obsahuje vstupní pole pro zadání jména hráče, sekci pro zobrazení hry a sekci pro zobrazení statistik hry (počet tahů a čas). Zobrazí se také výsledek hry a v horní části je tabulka se skóre předchozích her hráče.

Šablona CSS definuje styl stránky, včetně písma, barvy pozadí a rozvržení herních prvků. Definuje také styly tlačítek a karet používaných ve hře.

Skript JavaScript zpracovává logiku hry: spuštění a zastavení hry, otáčení karet a výpočet výsledku a aktualizuje herní statistiky a tabulku výsledků.
