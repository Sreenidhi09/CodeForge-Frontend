function TopicCard({ icon, title, description }) {
    return (
      <div className="group bg-zinc-800 hover:bg-zinc-800/80 rounded-xl p-6 border border-zinc-700/50 hover:border-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/10 cursor-pointer">
        <div className="text-2xl mb-3">{icon}</div>
        <h3 className="font-bold mb-2 group-hover:text-violet-400 transition-colors">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    );
  }
  
  export default TopicCard;