import { request } from "http";
import Head from "next/head";
import { useState } from "react";

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

export default function Home() {
  const [cardType, setCardType] = useState("Spell Card");
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
      <main className={"max-w-screen-lg mx-auto px-8"}>
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
              className="w-full h-64 px-4 py-2 rounded-md"
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
                try {
                  const cardObject = JSON.parse(cardJSON);
                  setCardType(cardObject.type);
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
                  el.value = JSON.stringify(cardObject, null, 2);
                } catch (e) {
                  alert(e);
                }
              }}
              className="w-full font-bold text-white bg-blue-500 rounded font-aldrich hover:bg-blue-700"
            >
              Verify
            </button>
          </form>
          <br />
          <form className="space-y-4">
            <h2 className="text-3xl">Card Generator</h2>
            <label htmlFor="cardID" className="block font-aldrich">
              Name
            </label>
            <input id="cardID" className="w-full px-4 py-2 rounded-md" />
            <button
              type="button"
              onClickCapture={async (e) => {
                e.preventDefault();
                const el = document.getElementById(
                  "cardID"
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
                  "cardID"
                ) as HTMLInputElement;
                const url =
                  "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=" +
                  el.value;
                const response = await fetch(url);
                const cardObject = await response.json();
                try {
                  setCardType(cardObject.data[0].type);
                  addStat("cardName", cardObject.data[0].name);
                  addStat("level", "*".repeat(cardObject.data[0].level));
                  addStat("atk", cardObject.data[0].atk);
                  addStat("def", cardObject.data[0].def);
                  addStat("desc", cardObject.data[0].desc);
                  addStat("race", cardObject.data[0].race);
                  addStat("attr", cardObject.data[0].attribute);
                  addStat("cardType", cardObject.data[0].type);
                  if (cardObject.data[0].archetype !== undefined) {
                    addStat(
                      "archetype",
                      cardObject.data[0].archetype + " Archetype"
                    );
                  } else {
                    addStat("archetype", "");
                  }
                  const cardImage = document.querySelector("img");
                  if (cardImage !== null) {
                    cardImage.src = cardObject.data[0].card_images[0].image_url;
                  }
                  const el2 = document.getElementById(
                    "cardJSON"
                  ) as HTMLTextAreaElement;
                  el2.value = JSON.stringify(cardObject.data[0], null, 2);
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
          <div className="flex space-x-8">
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
                <h4 className="p-4 border-2">
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
