export default function Result() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="glass p-10 rounded-2xl text-center w-[400px]">

        <h1 className="text-3xl gradient-text mb-4">
          Your Result 🎯
        </h1>

        <div className="space-y-3">
          <div className="glass p-3 rounded">Questions Attempted: 5</div>
          <div className="glass p-3 rounded">Score: 98%</div>
          <div className="glass p-3 rounded">
            Improvement: Communication, Depth
          </div>
        </div>

      </div>

    </div>
  );
}