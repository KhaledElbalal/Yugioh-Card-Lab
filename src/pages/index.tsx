import Head from "next/head";
import { useState } from "react";
import { JsonObjectExpression } from "typescript";

const addStat = (el: string, stat: string) => {
  const element = document.getElementById(el);
  if (element !== null) {
    if (stat === undefined) {
      stat = "";
    }
    element.innerHTML = stat;
  }
};

const isMonster = (type: string) => {
  return type != "Spell Card" && type != "Trap Card";
};

const addMonsterStats = (cardObject: any) => {
  const JSONField = document.getElementById("cardJSON") as HTMLTextAreaElement;
  const NameField = document.getElementById("cardName") as HTMLInputElement;
  addStat("cardName", cardObject.name);
  addStat("level", "*".repeat(cardObject.level));
  addStat("atk", cardObject.atk);
  addStat("def", cardObject.def);
  addStat("desc", cardObject.desc);
  addStat("race", cardObject.race);
  addStat("attr", cardObject.attribute);
  addStat("cardType", cardObject.type);
  if (cardObject.archetype !== undefined) {
    addStat("archetype", cardObject.archetype + " Archetype");
  } else {
    addStat("archetype", "");
  }
  const cardImage = document.querySelector("img");
  if (cardImage !== null) {
    cardImage.src = cardObject.card_images[0].image_url;
  }
  JSONField.value = JSON.stringify(cardObject, null, 2);
  NameField.value = cardObject.name;
};

export default function Home() {
  const [cardType, setCardType] = useState("");
  return (
    <>
      <Head>
        <title>Yu-Gi-Oh! Card Lab</title>
        <meta
          name="description"
          content="Creating JSON files for a custom card generator by /KhaledElbalal on Github"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"max-w-screen-lg mx-auto px-8 text-white"}>
        <div className="overlay" />
        <div className="section">
          <h1 className="text-5xl">Yu-Gi-Oh!</h1>
          <p>Card Lab by Khaled</p>
        </div>
        <div className="section">
          <h2 className="text-3xl">How to use</h2>
        </div>
        <div className="section">
          <form className="space-y-4">
            <h2 className="text-3xl">Card Generator</h2>
            <label htmlFor="cardJSON" className="block font-aldrich">
              Card JSON
            </label>
            <textarea
              id="cardJSON"
              className="w-full h-64 px-4 py-2 text-white bg-gray-800 rounded-md opacity-90"
            />
            <button
              type="button"
              onClickCapture={(e) => {
                e.preventDefault();
                const el = document.getElementById(
                  "cardJSON"
                ) as HTMLTextAreaElement;
                const cardJSON: string = el?.value;
                try {
                  const cardObject = JSON.parse(cardJSON);
                  setCardType(cardObject.type);
                } catch (e) {
                  alert(e);
                }
              }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(
                  "cardJSON"
                ) as HTMLTextAreaElement;
                const cardJSON: string = el?.value;
                const cardObject = JSON.parse(cardJSON);
                setCardType(cardObject.type);
                try {
                  addMonsterStats(cardObject);
                } catch (e) {
                  alert(e);
                }
              }}
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded font-aldrich hover:bg-blue-700"
            >
              Verify
            </button>
          </form>
          <br />
          <form className="space-y-4">
            <h2 className="text-3xl">Card Generator</h2>
            <label htmlFor="cardName" className="block font-aldrich">
              Name
            </label>
            <input
              id="cardName"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-md opacity-90"
            />
            <button
              type="button"
              onClickCapture={async (e) => {
                e.preventDefault();
                const el = document.getElementById(
                  "cardName"
                ) as HTMLInputElement;
                const url =
                  "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
                  el.value;
                const response = await fetch(url);
                const cardObject = await response.json();
                setCardType(cardObject.data[0].type);
              }}
              onClick={async (e) => {
                e.preventDefault();
                const el = document.getElementById(
                  "cardName"
                ) as HTMLInputElement;
                const url =
                  "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
                  el.value;
                const response = await fetch(url);
                const cardObject = await response.json();
                try {
                  addMonsterStats(cardObject.data[0]);
                } catch (e) {
                  alert(e);
                }
              }}
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded font-aldrich hover:bg-blue-700"
            >
              Verify
            </button>
          </form>
        </div>
        <div className="section">
          <div className={`flex space-x-8 ${cardType === "" && "hidden"}`}>
            <div className="flex-1 space-y-4">
              <h1 id="cardName"></h1>
              <h2 id="cardType"></h2>
              <>
                {isMonster(cardType) && <h2 className="inline" id="level"></h2>}
                <h2 id="attr"></h2>
                <h2 id="archetype"></h2>
                {isMonster(cardType) && (
                  <h2>
                    <span id="atk"></span>/<span id="def"></span>
                  </h2>
                )}
                <h4 className={`p-4 border-2`}>
                  {isMonster(cardType) && (
                    <>
                      [<span id="race"></span>]
                      <br />
                    </>
                  )}
                  <span id="desc"></span>
                </h4>
              </>
            </div>
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="" alt=""></img>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
