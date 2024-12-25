import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    const apiKey = "AIzaSyDTBpN6GF2yCrwMs6DfVPcY7R6YpOEN6Vg"; // Thay bằng API Key của bạn
    const url = `https://translation.googleapis.com/language/translate/v2`;

    try {
      const response = await axios.post(url, {
        q: text,
        target: "vi",
        source: "en",
        key: apiKey,
      });
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Lỗi khi dịch:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dịch Tiếng Anh Sang Tiếng Việt</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Nhập văn bản tiếng Anh..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleTranslate}>Dịch</button>
      <h2>Kết quả:</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default App;
