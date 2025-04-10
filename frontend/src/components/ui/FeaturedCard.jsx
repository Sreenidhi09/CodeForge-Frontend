function FeaturedCard({ icon, title, color }) {
    return (
      <div className={`relative group overflow-hidden rounded-xl bg-zinc-800 border border-zinc-700/50 hover:border-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/10 cursor-pointer`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
        <div className="p-6">
          <div className="text-3xl mb-3">{icon}</div>
          <h3 className="font-bold group-hover:text-violet-400 transition-colors">{title}</h3>
        </div>
      </div>
    );
  }
  
  export default FeaturedCard;