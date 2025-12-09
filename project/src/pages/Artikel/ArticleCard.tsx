import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

interface ArticleCardProps {
  title: string;
  subtitle: string;
  image: string;
  excerpt: string;
  articleId: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  subtitle,
  image,
  excerpt,
  articleId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!articleId) return;
    navigate(`/article/${articleId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        group relative w-full h-72 rounded-[2rem] overflow-hidden cursor-pointer
        bg-white shadow-lg shadow-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/20
        transition-all duration-500 hover:-translate-y-2 border border-gray-100
      "
    >
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-700 group-hover:scale-110
          "
          loading="lazy"
        />
        {/* Overlay Gradient: Lebih halus tapi terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
      </div>

      {/* --- FLOATING BADGE (Subtitle) --- */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full shadow-sm">
          <Calendar size={12} className="text-blue-200" />
          <span className="text-xs font-bold text-white tracking-wide">
            {subtitle}
          </span>
        </div>
      </div>

      {/* --- CONTENT BOTTOM --- */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start z-20">
        
        {/* Title */}
        <h3 className="text-xl font-extrabold text-white leading-tight mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors">
          {title}
        </h3>

        {/* Excerpt (Deskripsi Pendek) */}
        <p className="text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed font-medium opacity-90">
          {excerpt}
        </p>

        {/* --- ACTION BUTTON (Membesar saat hover parent) --- */}
        <div className="w-full flex justify-end">
           <div className="
             w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 
             flex items-center justify-center text-white
             transition-all duration-300 
             group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:rotate-[-45deg]
           ">
              <ArrowRight size={18} />
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default ArticleCard;