import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import annotationPlugin from 'chartjs-plugin-annotation';
ChartJS.register(annotationPlugin);

import "./App.css";

import salaryData from "./data/sportSalaries.json";
import sourceData from "./data/nbaRings.json";
import worldCupData from "./data/worldCupData.json";
import { useState } from "react";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const App = () => {
  const [lang, setLang] = useState("en");

  // Simple translation object
  const t = {
    en: {
      title: "Insights into NBA and Soccer: Salaries, Titles, and Team Performance",
    translate: "Traduire en Français",
    nba: "NBA Average Salary",
    epl: "EPL Average Salary",
    year: "From 2015 to 2025",
    syntheticData: "(This Data is Synthetic and not meant to be taken as fact)",
    worldCups: "FIFA World Cups Won by Country",
    rings: "Amount of Rings won by different teams in the NBA",
    countries: {
      Brazil: "Brazil",
      Germany: "Germany",
      Italy: "Italy",
      Argentina: "Argentina",
      France: "France",
      Uruguay: "Uruguay",
      England: "England",
      Spain: "Spain"
    },
    teams: {
      Lakers: "Lakers",
      Celtics: "Celtics",
      Warriors: "Warriors",
      Bulls: "Bulls",
      Spurs: "Spurs",
      Heat: "Heat",
      Pistons: "Pistons",
      "76ers": "76ers"
    }
  },
  fr: {
    title: "Aperçu de la NBA et du football : salaires, titres et performances des équipes",
    translate: "Translate to English",
    nba: "Salaire moyen NBA",
    epl: "Salaire moyen EPL",
    year: "De 2015 à 2025",
    syntheticData: "(Ces données sont synthétiques et ne doivent pas être prises comme des faits)",
    worldCups: "Coupes du Monde FIFA gagnées par pays",
    rings: "Nombre de bagues gagnées par différentes équipes NBA",
    countries: {
      Brazil: "Brésil",
      Germany: "Allemagne",
      Italy: "Italie",
      Argentina: "Argentine",
      France: "France",
      Uruguay: "Uruguay",
      England: "Angleterre",
      Spain: "Espagne"
    },
    teams: {
      Lakers: "Lakers",
      Celtics: "Celtics",
      Warriors: "Warriors",
      Bulls: "Bulls",
      Spurs: "Spurs",
      Heat: "Heat",
      Pistons: "Pistons",
      "76ers": "76ers"
      }
    }
  };
  return (
    <div className="App">
      <nav className="navbar">
        <h1>{t[lang].title}</h1>
        <button onClick={() => setLang(lang === "en" ? "fr" : "en")}>
          {t[lang].translate}
        </button>
      </nav>
      
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: salaryData.map((data) => data.label),
            datasets: [
              {
                label: t[lang].nba,
                data: salaryData.map((data) => data.nba),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: t[lang].epl,
                data: salaryData.map((data) => data.epl),
                backgroundColor: "#43A047",
                borderColor: "#43A047",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: `${t[lang].nba} vs ${t[lang].epl} `+ t[lang].year + " " + t[lang].syntheticData,
              },
              annotation: {
                annotations: {
                  covidDip: {
                    type: "box",
                    xMin: "2020",
                    xMax: "2021",
                    backgroundColor: "rgba(128,128,128,0.2)",
                    borderWidth: 0,
                    label: {
                      display: true,
                      content: "Covid Dip",
                      position: "center",
                      color: "#444",
                      font: {
                        size: 14,
                        weight: "bold"
                      }
                    }
                  }
                }
              }
            },
          }}
        />
      </div>

      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: worldCupData.map((data) => t[lang].countries[data.label] || data.label),
            datasets: [
              {
                label: t[lang].worldCups,
                data: worldCupData.map((data) => data.value),
                backgroundColor: [
                 "#1CA65A",    // Brazil (green)
                  "#000000",    // Germany (black)
                  "#6FCF97",    // Italy (light green)
                  "#00BCD4",    // Argentina (cyan)
                  "#0055A4",    // France (blue)
                  "#003366",    // Uruguay (ocean dark blue)
                  "#FF0000",    // England (red)
                  "#FFD600",    // Spain (yellow)
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: t[lang].worldCups,
              },
              legend: {
                display: false // Make the legend completely invisible
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              },
            }
          }
        }
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: sourceData.map((data) => t[lang].teams[data.label] || data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "#FDB927", // Lakers Yellow
                  "#007A33", // Celtics Green
                  "#1D428A", // Warriors Blue
                  "#CE1141", // Bulls Red
                  "#000000", // Spurs Black
                  "#FF6F00", // Heat Orange
                  "#ED174C", // Pistons Red
                  "#006BB6", // 76ers Blue
                ],
                borderColor: [
                  "#FDB927",
                  "#007A33",
                  "#1D428A",
                  "#CE1141",
                  "#000000",
                  "#FF6F00",
                  "#ED174C",
                  "#006BB6",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: t[lang].rings,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
