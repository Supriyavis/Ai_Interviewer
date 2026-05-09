import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Timer from "../components/Timer";
import { FaRobot, FaMicrophone, FaStop, FaVolumeUp } from "react-icons/fa";
import { API_BASE_URL } from "../apiConfig";

export default function Interview() {
  const location = useLocation();
  const domain = location.state?.domain || "Frontend Developer";

  const [started, setStarted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false); // ⭐ NEW: Controls when timer begins
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
        // ✅ START TIMER ONCE USER CLICKS SPEAK ANSWER
        if (!timerStarted) {
          setTimerStarted(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const speakQuestion = (text) => {
    if (!text || text.startsWith("⚠️")) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const getQuestion = async () => {
    try {
      setLoading(true);
      setTimerStarted(false); // Reset timer for new question

      const res = await fetch(
        `${API_BASE_URL}/api/question?domain=${encodeURIComponent(domain)}&qNum=${currentQ}`
      );

      const data = await res.json();

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

  const startInterview = () => {
    setStarted(true);
    getQuestion();
  };

  const submitAnswer = async (autoSubmit = false) => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setTimerStarted(false); // 🛑 Stop timer when submitting

    const finalAnswer = (answer + interimResult).trim();

    // ✅ HANDLE EMPTY ANSWER (No fetch needed, score 0)
    if (!finalAnswer) {
      setResult({
        score: 0,
        improvement_areas: "No answer provided",
        feedback: "• You did not provide any answer to this question.\n• Please try to respond within the time limit.\n• Practice articulating your thoughts clearly.\n• Consistent practice will help build confidence.\n• Replay the question if you need more time to think next time."
      });
      setScore(0);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer: finalAnswer }),
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

  const nextQuestion = () => {
    if (currentQ >= 5) {
      alert("Interview Completed 🎉");
      return;
    }

    setCurrentQ((prev) => prev + 1);
    getQuestion();
  };

  return (
    <div className="relative min-h-screen bg-[#050510] text-white px-4 md:px-6 py-24 overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500 blur-[100px] md:blur-[150px] opacity-20 md:opacity-30 rounded-full z-0"></div>
      <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600 blur-[100px] md:blur-[150px] opacity-10 md:opacity-20 rounded-full z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto mt-4 md:mt-10 text-center">

        {/* BEFORE START */}
        {!started && (
          <div className="glass p-8 md:p-16 rounded-3xl border border-gray-800 bg-white/5 backdrop-blur-md shadow-2xl">

            <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-tight">
              Start Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {domain} Interview
              </span>
            </h2>

            <button
              onClick={startInterview}
              className="px-10 py-4 rounded-xl text-lg font-bold
                         bg-gradient-to-r from-purple-500 to-pink-500 
                         hover:scale-105 transition shadow-lg shadow-pink-500/20 active:scale-95"
            >
              Start Interview 🚀
            </button>

          </div>
        )}

        {/* AFTER START */}
        {started && (
          <div className="space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <h2 className="text-xl font-bold text-pink-400">
                {domain}
              </h2>

              {/* ✅ TIMER ONLY STARTS WHEN USER CLICKS SPEAK ANSWER */}
              {!result && timerStarted && (
                <Timer key={currentQ} duration={40} onExpire={() => submitAnswer(true)} />
              )}
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden border border-gray-700 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ease-out"
                style={{ width: `${(currentQ / 5) * 100}%` }}
              ></div>
            </div>

            {/* QUESTION WITH ROBOT */}
            <div className="glass p-6 md:p-10 rounded-3xl border border-gray-800 bg-white/5 backdrop-blur-md relative shadow-xl">
              <p className="text-xs font-bold text-gray-500 absolute top-4 left-6 uppercase tracking-widest">
                Question {currentQ} of 5
              </p>
              
              <button 
                onClick={() => speakQuestion(question)}
                className="absolute top-4 right-6 text-gray-400 hover:text-pink-400 transition transform hover:scale-110 active:scale-90"
                title="Replay Audio"
              >
                <FaVolumeUp size={20} />
              </button>

              <div className={`w-20 md:w-24 h-20 md:h-24 mx-auto rounded-full flex items-center justify-center bg-gray-900 mb-6 transition-all duration-500 ${isSpeaking ? 'shadow-[0_0_40px_rgba(236,72,153,0.5)] border-2 border-pink-500 scale-110' : 'border border-gray-800'}`}>
                <FaRobot size={36} className={isSpeaking ? "text-pink-400 animate-pulse" : "text-gray-600"} />
              </div>

              <h3 className="text-lg md:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed text-gray-100">
                {loading ? (
                   <span className="flex items-center justify-center gap-2">
                     <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                     <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                   </span>
                ) : question}
              </h3>
            </div>

            {/* ANSWER */}
            <div className="glass p-6 rounded-3xl border border-gray-800 bg-white/5 backdrop-blur-md shadow-xl">
              <textarea
                value={answer + interimResult}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer or use voice command..."
                className="w-full h-32 md:h-44 bg-gray-900/40 border border-gray-700 p-4 rounded-2xl 
                           focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition
                           placeholder:text-gray-600"
              />

              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <button
                  onClick={toggleRecording}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-bold transition shadow-md ${
                    isRecording 
                      ? "border-red-500 text-red-400 bg-red-500/10 animate-pulse" 
                      : "border-gray-700 text-gray-400 hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/5"
                  }`}
                >
                  {isRecording ? <><FaStop /> Stop Recording</> : <><FaMicrophone /> Speak Answer</>}
                </button>

                <button
                  onClick={() => submitAnswer()}
                  className="w-full sm:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition font-bold shadow-lg shadow-pink-500/20 active:scale-95"
                >
                  Submit Answer 🚀
                </button>
              </div>
            </div>

            {/* RESULT */}
            {result && (
              <div className="glass mt-8 p-6 md:p-10 rounded-3xl border border-gray-700 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-700 animate-in fade-in slide-in-from-bottom-10">
                <div className={`absolute top-0 left-0 w-full h-1.5 ${score >= 50 ? 'bg-green-500 shadow-[0_0_20px_#22c55e]' : 'bg-red-500 shadow-[0_0_20px_#ef4444]'}`}></div>

                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className={`text-5xl md:text-6xl font-black transition-all duration-1000 ${score >= 50 ? 'text-green-400 scale-110' : 'text-red-400'}`}>
                    {score}%
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest">
                    {score >= 50 ? "Excellent!" : "Needs Practice"}
                  </h3>
                </div>

                <div className="text-gray-300 mb-8 text-left text-base md:text-lg leading-relaxed bg-gray-900/60 p-6 rounded-2xl border border-gray-800/50 whitespace-pre-wrap shadow-inner">
                  {result.feedback}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                   {result.improvement_areas && (
                    <div className="text-left bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
                      <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Key Improvement Area</h4>
                      <p className="text-pink-400 font-bold leading-snug">{result.improvement_areas}</p>
                    </div>
                  )}
                  <div className="text-left bg-gray-800/40 p-5 rounded-2xl border border-gray-700/30">
                      <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Interview Insight</h4>
                      <p className="text-blue-400 font-bold leading-snug">Focus on clarity and domain specifics.</p>
                  </div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full py-4 rounded-2xl font-black text-white text-lg tracking-widest
                             bg-gradient-to-r from-purple-600 to-pink-600 
                             hover:from-purple-500 hover:to-pink-500 hover:scale-[1.01] 
                             transition-all shadow-[0_10px_30px_rgba(236,72,153,0.3)] active:scale-95"
                >
                  NEXT QUESTION →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}