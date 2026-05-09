import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import { FaRobot, FaMicrophone, FaStop, FaVolumeUp } from "react-icons/fa";
import { API_BASE_URL } from "../apiConfig";

export default function Interview() {
  const location = useLocation();
  const domain = location.state?.domain || "Frontend Developer";

  const [started, setStarted] = useState(false); // ⭐ NEW
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(1);
  const [loading, setLoading] = useState(false);

  // Voice State
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimResult, setInterimResult] = useState("");
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setAnswer((prev) => prev + finalTranscript);
        }
        setInterimResult(interim);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimResult("");
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Microphone is not supported in your browser. Try Chrome or Edge.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const speakQuestion = (text) => {
    if (!text || text.startsWith("⚠️")) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Speak slower for better understanding
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // 🔥 FETCH QUESTION
  const getQuestion = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE_URL}/api/question?domain=${encodeURIComponent(domain)}&qNum=${currentQ}`
      );

      const data = await res.json();

      console.log("Question API:", data);

      if (data.error) {
        setQuestion(`⚠️ Error: ${data.error}`);
      } else {
        const q = data.question || "No question received";
        setQuestion(q);
        speakQuestion(q);
      }
      setAnswer("");
      setResult(null);

    } catch (err) {
      console.error(err);
      setQuestion("⚠️ Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 START INTERVIEW
  const startInterview = () => {
    setStarted(true);
    getQuestion();
  };

  // 🔥 SUBMIT ANSWER
  const submitAnswer = async (autoSubmit = false) => {
    // Stop recording and speaking when submitting
    recognitionRef.current?.stop();
    setIsRecording(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (!autoSubmit && !answer.trim()) {
      alert("Write answer first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setResult(data);
      setScore(data.score || 0);

    } catch (err) {
      console.error(err);
      alert("Error evaluating answer");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 NEXT QUESTION
  const nextQuestion = () => {
    if (currentQ >= 5) {
      alert("Interview Completed 🎉");
      return;
    }

    setCurrentQ((prev) => prev + 1);
    getQuestion();
  };

  return (
    <div className="relative min-h-screen bg-[#050510] text-white px-6 py-20">

      {/* BACKGROUND */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500 blur-[150px] opacity-30 rounded-full"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>

      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 text-center">

        {/* BEFORE START */}
        {!started && (
          <div className="glass p-10 rounded-2xl border border-gray-800">

            <h2 className="text-3xl mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {domain} Interview
              </span>
            </h2>

            <button
              onClick={startInterview}
              className="px-10 py-4 rounded-xl text-lg 
                         bg-gradient-to-r from-purple-500 to-pink-500 
                         hover:scale-105 transition">
              Start Interview 🚀
            </button>

          </div>
        )}

        {/* AFTER START */}
        {started && (
          <div>

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-pink-400">
                {domain} Interview
              </h2>

              {!result && <Timer key={currentQ} duration={40} onExpire={() => submitAnswer(true)} />}
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full bg-gray-800 h-2 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${(currentQ / 5) * 100}%` }}
              ></div>
            </div>

            {/* QUESTION WITH ROBOT */}
            <div className="glass p-8 rounded-xl border border-gray-800 flex flex-col items-center relative">
              <p className="text-sm text-gray-400 absolute top-4 left-4">
                Question {currentQ} / 5
              </p>
              
              <button 
                onClick={() => speakQuestion(question)}
                className="absolute top-4 right-4 text-gray-400 hover:text-pink-400 transition"
                title="Replay Audio"
              >
                <FaVolumeUp size={20} />
              </button>

              <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gray-900 mb-6 transition-all duration-300 ${isSpeaking ? 'shadow-[0_0_30px_rgba(236,72,153,0.6)] border-2 border-pink-500 scale-110' : 'border border-gray-700'}`}>
                <FaRobot size={40} className={isSpeaking ? "text-pink-400" : "text-gray-500"} />
              </div>

              <h3 className="text-xl font-medium max-w-2xl text-center leading-relaxed">
                {loading ? "Thinking..." : question}
              </h3>
            </div>

            {/* ANSWER */}
            <div className="glass p-6 rounded-xl mt-6 border border-gray-800">
              <textarea
                value={answer + interimResult}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer or click Speak Answer..."
                className="w-full h-40 bg-transparent border border-gray-700 p-4 rounded 
                           focus:ring-2 focus:ring-pink-500"
              />

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl border transition ${
                    isRecording 
                      ? "border-red-500 text-red-400 bg-red-500/10 animate-pulse" 
                      : "border-gray-700 text-gray-400 hover:border-pink-500 hover:text-pink-400"
                  }`}
                >
                  {isRecording ? <><FaStop /> Stop Recording</> : <><FaMicrophone /> Speak Answer</>}
                </button>

                <button
                  onClick={() => submitAnswer()}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition font-medium"
                >
                  Submit Answer 🚀
                </button>
              </div>
            </div>

            {/* RESULT */}
            {result && (
              <div className="glass mt-10 p-8 rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden transition-all duration-500 animate-[fadeIn_0.5s_ease-out]">
                <div className={`absolute top-0 left-0 w-full h-1 ${score >= 50 ? 'bg-green-500 shadow-[0_0_20px_#22c55e]' : 'bg-red-500 shadow-[0_0_20px_#ef4444]'}`}></div>

                <h3 className="mb-6 text-3xl font-bold text-center flex flex-col items-center gap-2">
                  {score >= 50 ? (
                    <span className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse">✅ Correct Answer!</span>
                  ) : (
                    <span className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]">❌ Needs Work</span>
                  )}
                </h3>

                <div className="text-gray-200 mb-8 text-left text-lg leading-relaxed bg-gray-900/50 p-6 rounded-xl border border-gray-800 whitespace-pre-wrap">
                  {result.feedback}
                </div>

                <div className="flex flex-wrap items-center gap-8 justify-center mb-8">
                  <div className={`w-32 h-32 flex flex-col items-center justify-center rounded-full border-4 text-4xl font-black shadow-lg transition-all duration-700
                                  ${score >= 50 ? 'border-green-500 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'border-red-500 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}`}>
                    <span>{score}</span>
                    <span className="text-xs font-normal text-gray-400 uppercase tracking-widest mt-1">Score</span>
                  </div>

                  {result.improvement_areas && (
                    <div className="flex flex-col gap-3 text-left bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 min-w-[200px] max-w-sm">
                      <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Key Improvement Area</h4>
                      <p className="text-pink-400 font-medium">{result.improvement_areas}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                >
                  Next Question →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}