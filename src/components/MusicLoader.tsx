export function MusicLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Винил проигрыватель */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-gray-600 animate-spin-slow relative">
          {/* Центр диска */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          {/* Канавки */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-gray-500 opacity-30"></div>
        </div>
      </div>

      {/* Эквалайзер */}
      <div className="flex items-end space-x-1 mb-6">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
            style={{
              height: `${Math.random() * 30 + 15}px`,
              animationDelay: `${i * 150}ms`,
            }}
          ></div>
        ))}
      </div>

      {/* Текст */}
      <p className="text-black text-lg font-medium animate-pulse">
        Loading musics...
      </p>
    </div>
  );
}
