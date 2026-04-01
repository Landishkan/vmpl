import React, { useState } from "react";
import "./styles.css";

// 1. ВЫНОСИМ СЦЕНУ КОМНАТЫ НАРУЖУ
const RoomScene = ({ setScene }) => (
  <div
    className="scene room"
    style={{ backgroundImage: "url('/mainwindow.jpg')" }}
  >
    <div className="overlay-text">Вымпел: за гранью v0.1</div>

    <div
      className="monitor-trigger"
      onClick={() => setScene("desktop")}
      style={{
        top: "55%", // Расстояние от верхнего края (меняй это)
        left: "30%", // Расстояние от левого края (меняй это)
        width: "20%", // Ширина зоны (подгони под экран монитора)
        height: "19%", // Высота зоны
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="glow-effect"></div>
      <p style={{ margin: 0, fontSize: "25px", fontFamily: "bold" }}>ВХОД</p>
    </div>
  </div>
);

// 2. ВЫНОСИМ РАБОЧИЙ СТОЛ НАРУЖУ
const DesktopScene = ({
  user,
  setUser,
  activeWindow,
  setActiveWindow,
  setScene,
  currentQuestion,
  setCurrentQuestion,
  achievements,
}) => {
  return (
    <div
      className="scene desktop"
      style={{ backgroundImage: "url('/window2.png')" }}
    >
      {/* ИКОНКИ (Зоны клика) */}
      <div
        className="icon-zone"
        style={{ top: "2%", left: "2%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("profile")}
      ></div>
      <div
        className="icon-zone"
        style={{ top: "2%", left: "10%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("register")}
      ></div>

      <div
        className="icon-zone"
        style={{ top: "15%", left: "10%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("achievements")}
      ></div>
      <div
        className="icon-zone"
        style={{ top: "28%", left: "2%", width: "8%", height: "12%" }}
        onClick={() => setActiveWindow("video")}
      ></div>
      <div
        className="icon-zone"
        style={{ bottom: "2%", left: "2%", width: "8%", height: "10%" }}
        onClick={() => setScene("room")}
      ></div>

      {/* ОКНО РЕГИСТРАЦИИ (Теперь не будет терять фокус!) */}
      {activeWindow === "register" && (
        <div className="window" style={{ width: "300px" }}>
          <div className="window-header">
            <span>New_User_Wizard.exe</span>
            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>
          <div className="window-content">
            <p>Введите ваш позывной:</p>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Username..."
              autoFocus
              style={{
                width: "100%",
                marginBottom: "10px",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={() => setActiveWindow("profile")}
              style={{ width: "100%" }}
            >
              СОЗДАТЬ ПРОФИЛЬ
            </button>
          </div>
        </div>
      )}

      {/* ОКНО ПРОФИЛЯ */}
      {activeWindow === "profile" && (
        <div className="window" style={{ width: "350px" }}>
          <div className="window-header">
            <span>User_Profile.sys</span>
            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>
          <div
            className="window-content"
            style={{ display: "flex", gap: "15px" }}
          >
            <div
              style={{
                fontSize: "50px",
                border: "2px solid #808080",
                padding: "10px",
              }}
            >
              👤
            </div>
            <div>
              <h3>{user.name || "Гость"}</h3>
              <p>Уровень: {user.level}</p>
              <div
                style={{
                  width: "150px",
                  height: "10px",
                  border: "1px solid #000",
                  background: "#eee",
                }}
              >
                <div
                  style={{
                    width: `${user.xp}%`,
                    height: "100%",
                    background: "#00ff00",
                  }}
                ></div>
              </div>
              <p style={{ fontSize: "12px" }}>XP: {user.xp}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* ОКНО ДОСТИЖЕНИЙ */}
      {activeWindow === "achievements" && (
        <div className="window" style={{ width: "400px" }}>
          <div className="window-header">
            <span>Wall_of_Fame.exe</span>
            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>
          <div
            className="window-content"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {achievements.map((ach) => (
              <div
                key={ach.id}
                style={{
                  border: "1px inset #fff",
                  padding: "5px",
                  background: ach.done ? "#c0c0c0" : "#808080",
                  filter: ach.done ? "none" : "grayscale(1)",
                }}
              >
                <div style={{ fontSize: "24px" }}>{ach.icon}</div>
                <b style={{ fontSize: "14px" }}>{ach.title}</b>
                <p style={{ fontSize: "10px", margin: "2px 0" }}>{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ОКНО ВИДЕОУРОКОВ (тот самый "видеохостинг") */}

      {activeWindow === "video" && (
        <div
          className="window video-browser"
          style={{ width: "90%", maxWidth: "800px" }}
        >
          <div className="window-header">
            <span>Education_v0.1</span>

            <button onClick={() => setActiveWindow(null)}>X</button>
          </div>

          <div
            className="window-content"
            style={{
              display: "grid",

              gridTemplateColumns: "1fr 2fr",

              gap: "15px",
            }}
          >
            {/* ЛЕВАЯ КОЛОНКА: Сетка видео */}

            <div
              className="video-grid"
              style={{ overflowY: "auto", maxHeight: "400px" }}
            >
              <div
                className="video-card active"
                style={{
                  border: "2px solid #00ff00",

                  padding: "5px",

                  marginBottom: "10px",
                }}
              >
                <div
                  className="video-preview"
                  style={{ background: "#000", height: "60px" }}
                >
                  ▶
                </div>

                <p>1 урок</p>
              </div>

              {/* Заглушки для будущих видео */}

              {[2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="video-card locked"
                  style={{
                    opacity: 0.5,

                    padding: "5px",

                    border: "1px solid #808080",

                    marginBottom: "10px",
                  }}
                >
                  <div
                    className="video-preview"
                    style={{ background: "#333", height: "60px" }}
                  >
                    🔒
                  </div>

                  <p>{num}. Урок в разработке</p>
                </div>
              ))}
            </div>

            {/* ПРАВАЯ КОЛОНКА: Плеер */}

            <div className="player-section">
              <video
                width="100%"
                controls
                style={{ background: "#000", boxShadow: "0 0 10px #00ff00" }}
              >
                <source
                  src="https://dl.dropboxusercontent.com/scl/fi/xiexsozwvfk2dwzar1pir/video1.mp4?rlkey=wgfl2c4fp51vuhyuwkczt5czf&st=61qbgx02&dl=0"
                  type="video/mp4"
                />
              </video>

              <div style={{ marginTop: "10px" }}>
                <button
                  className="test-start-btn"
                  onClick={() => setActiveWindow("quiz")}
                  style={{
                    width: "100%",

                    padding: "12px",

                    background: "#00ff00",

                    color: "#000",

                    cursor: "pointer",

                    fontWeight: "bold",
                  }}
                >
                  ПЕРЕЙТИ К ТЕСТУ (4 ВОПРОСА)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeWindow === "quiz" && (
        <div className="window quiz-window" style={{ width: "400px" }}>
          <div className="window-header">
            <span>Knowledge_Check_Module</span>

            <button
              onClick={() => {
                setActiveWindow("video");

                setCurrentQuestion(0);
              }}
            >
              Назад
            </button>
          </div>

          <div className="window-content">
            {currentQuestion < 4 ? (
              <div className="question-step">
                <p style={{ color: "#000080", fontWeight: "bold" }}>
                  Вопрос {currentQuestion + 1} из 4
                </p>

                {/* Сюда впишешь свои вопросы */}

                <h3 style={{ minHeight: "60px" }}>
                  {currentQuestion === 0 && "Тут будет твой первый вопрос?"}

                  {currentQuestion === 1 && "Тут будет твой второй вопрос?"}

                  {currentQuestion === 2 && "Тут будет твой третий вопрос?"}

                  {currentQuestion === 3 && "Тут будет финальный вопрос?"}
                </h3>

                <div
                  className="options"
                  style={{
                    display: "flex",

                    flexDirection: "column",

                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  >
                    Вариант А (Правильный)
                  </button>

                  <button onClick={() => alert("Почти! Попробуй еще раз")}>
                    Вариант Б
                  </button>

                  <button onClick={() => alert("Не совсем так...")}>
                    Вариант В
                  </button>
                </div>
              </div>
            ) : (
              <div className="quiz-result" style={{ textAlign: "center" }}>
                <h2 style={{ color: "#00aa00" }}>ТЕСТ ПРОЙДЕН!</h2>

                <p>Коллега, вы настоящий эксперт!</p>

                <button
                  onClick={() => {
                    setActiveWindow("video");

                    setCurrentQuestion(0);
                  }}
                >
                  ВЕРНУТЬСЯ К УРОКАМ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ОСНОВНОЙ КОМПОНЕНТ
export default function App() {
  const [scene, setScene] = useState("room");
  const [activeWindow, setActiveWindow] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [user, setUser] = useState({ name: "", level: 1, xp: 0 });
  const [achievements] = useState([
    {
      id: 1,
      title: "Первые шаги",
      desc: "Включил компьютер",
      icon: "🔌",
      done: true,
    },
    {
      id: 2,
      title: "Кибер-зритель",
      desc: "Посмотрел выпуск",
      icon: "📺",
      done: false,
    },
    { id: 3, title: "Эксперт", desc: "Прошел тест", icon: "🏆", done: false },
  ]);
  const OrientationLock = () => (
    <div className="orientation-lock">
      <div className="lock-content">
        <div className="phone-icon">📱🔄</div>
        <h2>Пожалуйста, переверните устройство</h2>
        <p>Для погружения необходим горизонатльный(альбомный) режим</p>
      </div>
    </div>
  );
  return (
    <div className="App">
      <OrientationLock /> {/* Этот блок будет управляться через CSS */}
      {scene === "room" ? (
        <RoomScene setScene={setScene} />
      ) : (
        <DesktopScene
          user={user}
          setUser={setUser}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
          setScene={setScene}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          achievements={achievements}
        />
      )}
    </div>
  );
}
